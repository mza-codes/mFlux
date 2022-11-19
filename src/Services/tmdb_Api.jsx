import create from 'zustand';
import { API_KEY } from '../Constants/Constants';
import { tmdbApi } from '../Utils/tmdb';

const fetchData = async (url) => {
    try {
        const { data } = await tmdbApi.get(url);
        return data;
    } catch (err) {
        console.log("Error Fetching Data", err);
        return err;
    };
};

const useTmdbApi = create((set) => ({
    movie: {},
    crew: [],
    isFetching: false,
    credits: {},
    getMovies: async (genreIdOrCategoryName, page, searchQuery) => {
        console.log("fetching movies by GETMovies", genreIdOrCategoryName, page, searchQuery);
        // Get Movies by Search
        if (searchQuery) {
            const data = await fetchData(`/search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}`);
            console.log("FETCHED DATA", data);
        }
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === String) {
            const data = await fetchData(`/movie/${genreIdOrCategoryName}?page=${page}&api_key=${API_KEY}`);
            console.log("FETCHED DATA", data);
        }
        // Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === Number) {
            const data = await fetchData(`discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`);
            console.log("FETCHED DATA", data);
        }
        // Get popular movies by default
        const data = await fetchData(`/movie/popular?page=${page}&api_key=${API_KEY}`);
        console.log("FETCHED DATA", data);

    },
    // Get Movie
    getMovie: async (id) => {
        console.log("fetching movie", id);
        let url = `/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`;
    },
    // Get Recommendations
    getRecommendations: async ({ movie_id, list }) => {
        console.log("fetching recommendations", movie_id, list);
        `/movie/${movie_id}/${list}?api_key=${API_KEY}`;
    },
    // Get ActorDetails
    getActor: async (id) => {
        console.log("fetching ACTOR", id);
        `person/${id}?api_key=${API_KEY}`;
    },
    // Get Movies by Actor
    getMoviesByActorId: async ({ id, page }) => {
        console.log("fetching movies by Actorid", id);
        `/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`;
    },
}))

export default useTmdbApi;