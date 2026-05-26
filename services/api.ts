export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
    }
}

export const fetchMovies = async ({searchQuery}: { searchQuery: string }) => {
    const endpoint = searchQuery
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(searchQuery)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(
        endpoint,
        {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        }
    );

    // check if response is successful :
    if (!response.ok) {
        throw new Error(`Failed to fetch movies -  status :  ${response.status}  , message : ${response.statusText}`) ;
    }

    // parse the response as JSON and return the results data :
    const data = await response.json();
    return data.results;
};