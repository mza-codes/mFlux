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
    suggestions: [],
    trailers: []
};

const useTmdbApi = create((set) => ({
    ...initialState,

    getMovies: async (genreIdOrCategoryName, page, searchQuery) => {
        console.log("fetching movies by GETMovies", genreIdOrCategoryName, page, searchQuery);
        // Get Movies by Search
        if (searchQuery) {
            const data = await fetchData(`/search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}`);
            return data;
        };
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === String) {
            const data = await fetchData(`/movie/${genreIdOrCategoryName}?page=${page}&api_key=${API_KEY}`);
            return data;
        };
        // Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === Number) {
            const data = await fetchData(`/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_KEY}`);
            if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
            set(state => ({
                ...state,
                suggestions: data?.results
            }));
            console.log("FETCHED DATA", data);
            return;
        };
    },
    // Get MovieDetails
    getMovie: async ({ id }) => {
        console.log("fetching movie", id);
        const data = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set((state) => ({
            ...state,
            movieData: data,
            cast: data?.credits?.cast,
            genres: data?.genres,
            isFetching: false,
            error: {},
            failed: false,
            trailers: data?.videos?.results || []
        }));
        return data;
    },
    getSuggestions: async ({ genreId = 28, page = 1 }) => {
        console.log("FETCHING WITH GENRE ID", genreId + "page nomber", page);
        const data = await fetchData(`/discover/movie?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set(state => ({
            ...state,
            suggestions: data?.results
        }));
        return;
    },
    // Get Recommendations
    getRecommendations: async ({ movie_id, list }) => {
        console.log("fetching recommendations", movie_id, list);
        const data = await fetchData(`/movie/${movie_id}/${list}?api_key=${API_KEY}`);
        // Default Error handling
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        return;
    },
    // Get ActorDetails
    getActor: async ({ id }) => {
        console.log("fetching ACTOR", id);
        const data = await fetchData(`/person/${id}?api_key=${API_KEY}`);
        // Default Error handling
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set((state) => ({
            ...state,
            actor: data,
            error: {},
            failed: false
        }));
        return data;
    },
    // Get Movies by Actor
    getMoviesByActorId: async ({ id, page = 1 }) => {
        console.log("fetching movies by Actorid", id, page);
        const data = await fetchData(`/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
        // Default Error handling
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set((state) => ({
            ...state,
            actorMovies: data?.results,
            actorResult: data,
            error: {},
            failed: false
        }));
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
        set((state) => ({ ...initialState, newState }))
    },
    fetchTrailer: async (url) => {
        const data = await fetchData(url);
        if (data?.code) {
            set(state => ({ ...state, error: data, failed: true }));
            return data;
        };
        return data;
    }
}));

export default useTmdbApi;