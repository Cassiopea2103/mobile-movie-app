import {Image, View, ScrollView} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";

const HomePage = () => {

    const router = useRouter();

    return (
        <View className={"flex-1 bg-primary"}>
            {/* radiant background image */}
            <Image
                source={images.bg}
                className={'absolute w-full z-0'}
            />

            {/* scrollable content */}
            <ScrollView
                className={'flex-1 px-5'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: '100%',
                    paddingBottom: 10
                }}
            >
                {/*app logo*/}
                <Image
                    source={icons.logo}
                    className={'w-12 h-10 mt-20 mb-5 mx-auto'}
                />

                {/*    Search bar */}
                <View className={'flex-1 mt-5'}>
                    <SearchBar
                        onPress={() => router.push("/search")}
                        placeholder="Search movies, TV shows, actors..."
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default HomePage;