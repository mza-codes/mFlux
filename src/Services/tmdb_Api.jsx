import create from 'zustand';
import { API_KEY } from '../Constants/Constants';
import { tmdbApi } from '../Utils/tmdb';

const fetchData = async (url) => {
    const controller = new AbortController();
    try {
        const { data } = await tmdbApi.get(url, { signal: controller.signal });
        controller.abort("Data Fetching Success");
        return data;
    } catch (err) {
        console.log("Error Fetching Data", err);
        controller.abort("Error Fetching Data");
        return err;
    };
};

const initialState = {
    movieData: {},
    isFetching: false,
    cast: [],
    production: [],
    genres: [],
    error: {},
    failed: false,
    actor: {},
    actorMovies: [],
    actorResult: {},
};

const useTmdbApi = create((set) => ({
    ...initialState,

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
            const data = await fetchData(`/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`);
            console.log("FETCHED DATA", data);
        }
        // Get popular movies by default
        const data = await fetchData(`/movie/popular?page=${page}&api_key=${API_KEY}`);
        console.log("FETCHED DATA", data);
    },
    // Get Movie
    getMovie: async ({ id }) => {
        console.log("fetching movie", id);
        const data = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        console.log("Fetched Response in setFunction", data);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set((state) => ({
            ...state,
            movieData: data,
            cast: data?.credits?.cast,
            genres: data?.genres,
            isFetching: false,
            error: {},
            failed: false
        }));
        return data;
    },
    // Get Recommendations
    getRecommendations: async ({ movie_id, list }) => {
        console.log("fetching recommendations", movie_id, list);
        const data = await fetchData(`/movie/${movie_id}/${list}?api_key=${API_KEY}`);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        // Default Error handling
        console.log("Fetched Response in setFunction", data);
    },
    // Get ActorDetails
    getActor: async ({ id }) => {
        console.log("fetching ACTOR", id);
        const data = await fetchData(`/person/${id}?api_key=${API_KEY}`);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        // Default Error handling
        set((state) => ({
            ...state,
            actor: data,
            error: {},
            failed: false
        }))
        console.log("Fetched Response in setFunction", data);
    },
    // Get Movies by Actor
    getMoviesByActorId: async ({ id, page = 1 }) => {
        console.log("fetching movies by Actorid", id, page);
        const data = await fetchData(`/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        // Default Error handling
        set((state) => ({
            ...state,
            actorMovies: data?.results,
            actorResult: data,
            error: {},
            failed: false
        }));
        console.log("Fetched Response in setFunction", data);
        return true;
    },
    resetAll: () => {
        set((state) => ({ ...initialState }));
        return true;
    },
    updateState: (newState) => {
        set((state) => ({ ...state, newState }));
        return true;
    },
    resetAndUpdate: (newState) => {
        set((state) => ({ ...initialState ,newState }))
    },
}))

export default useTmdbApi;