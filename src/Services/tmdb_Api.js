import create from 'zustand';
import { API_KEY } from '../Constants/Constants';
import { tmdbApi } from '../Utils/tmdb';

let controller;
const fetchData = async (url) => {
    controller = new AbortController();
    try {
        const { data } = await tmdbApi.get(url, { signal: controller.signal });
        return data;
    } catch (err) {
        console.log("Error Fetching Data", err);
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
    trailers: [],
    totalSuggestions: 0
};

const useTmdbApi = create((set, get) => ({
    ...initialState,

    setLoading: (status = true) => {
        set((state) => ({
            ...state,
            isFetching: status
        }));
        return;
    },

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
    getTv: async ({ id }) => {
        console.log("fetching TVShow", id);
        const data = await fetchData(`/tv/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        if (data?.code) {
            // Fetch from tv if error
            const newData = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
            if (newData?.code) { return set(state => ({ ...state, error: data, failed: true })) };
            set((state) => ({
                ...state,
                movieData: newData,
                cast: newData?.credits?.cast,
                genres: newData?.genres,
                isFetching: false,
                error: {},
                failed: false,
                trailers: newData?.videos?.results || []
            }));
            return newData;
        };
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
    getMovie: async ({ id }) => {
        console.log("fetching movie", id);
        const data = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        if (data?.code) {
            // Fetch from tv if error
            const newData = await fetchData(`/tv/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
            if (newData?.code) { return set(state => ({ ...state, error: data, failed: true })) };
            set((state) => ({
                ...state,
                movieData: newData,
                cast: newData?.credits?.cast,
                genres: newData?.genres,
                isFetching: false,
                error: {},
                failed: false,
                trailers: newData?.videos?.results || []
            }));
            return newData;
        };
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
    getMoreSuggestions: async ({ genreId = 28, page = 1, type = "movie" }) => {
        const setLoading = get().setLoading;
        setLoading(true);
        console.log("FETCHING WITH GENRE ID", genreId + "page nomber", page);

        const data = await fetchData(`/discover/${type}?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
        console.log("FDetched sauggestions", data);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true, isFetching: false }));
        set(state => ({
            ...state,
            suggestions: [...state.suggestions, ...data?.results],
            isFetching: false
        }));
        return;
    },
    getSuggestions: async ({ genreId = 28, page = 1, type = "movie" }) => {
        console.log("FETCHING WITH GENRE ID", genreId + "page nomber", page);
        const data = await fetchData(`/discover/${type}?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
        console.log("FETCHED DATA", data);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        set(state => ({
            ...state,
            suggestions: data?.results,
            totalSuggestions: data?.total_pages ?? 0
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
        let data = await fetchData(`/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
        let newData = [];
        if (data?.results?.length <= 20) {
            console.log("result found less than 20");
            let values = await fetchData(`/discover/tv?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
            newData = values?.results;
        };
        console.log(data, newData);
        // Default Error handling
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        const newArray = data?.results?.concat(newData);
        set((state) => ({
            ...state,
            actorMovies: newArray,
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
        set((state) => ({ ...state, ...newState }));
        return true;
    },
    resetAndUpdate: (newState) => {
        set((state) => ({ ...initialState, ...newState }));
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