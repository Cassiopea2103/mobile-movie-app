import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useEffect, useState} from "react";

const Search = () => {

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset: resetMovies
    } = useFetch(() => fetchMovies({searchQuery: searchQuery}), false)

    const [searchQuery, setSearchQuery] = useState<string>('');

    // fetch movies dynamically from search input :
    useEffect(() => {
        const timeoutId = setTimeout(
            async () => {
                if (searchQuery.trim()) {
                    await loadMovies();
                }
                resetMovies();
            }, 500
        );

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
    return (
        <View className={'flex-1 bg-primary'}>
            {/*    radiant bg image */}
            <Image
                source={images.bg}
                className={'flex-1 absolute w-full z-0'}
                resizeMode={'cover'}
            />

            {/*    list of movies result : */}
            <FlatList
                data={movies}
                renderItem={
                    ({item}) => <MovieCard {...item} />
                }
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                className={'px-5'}
                columnWrapperStyle={
                    {
                        justifyContent: 'space-between',
                        gap: 16,
                        marginVertical: 16
                    }
                }
                contentContainerStyle={
                    {
                        paddingBottom: 10
                    }
                }
                ListHeaderComponent={
                    <>
                        {/* App logo image & Search bar input */}
                        <View
                            className={'w-full flex-row items-center justify-center mt-20'}
                        >
                            <Image
                                source={icons.logo}
                                className={'w-12 h-10'}
                            />
                        </View>
                        <View className='my-5 '>
                            <SearchBar
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                placeholder={'Search for movies...'}
                            />
                        </View>

                        {
                            moviesLoading &&
                            (
                                <ActivityIndicator
                                    size='large'
                                    color='#0000ff'
                                    className={'my-3 self-center'}
                                />
                            )
                        }
                        {moviesError &&
                            (
                                <Text className={'text-center text-red-500 my-3'}>
                                    Error loading movies : {moviesError.message}
                                </Text>
                            )
                        }
                        {
                            !moviesLoading && !moviesError && movies?.length > 0 && searchQuery.trim() &&
                            (
                                <>
                                    <Text className={'text-xl text-white text-bold'}>
                                        Search results for {searchQuery} </Text>
                                    <Text className={'text-accent'}>{searchQuery}</Text>
                                </>
                            )
                        }
                    </>
                }
            />
        </View>
    )
}

export default Search;