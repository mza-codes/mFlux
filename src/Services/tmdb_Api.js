import create from 'zustand';
import { API_KEY } from '../Constants/Constants';
import { tmdbApi } from '../Utils/tmdb';

export let controller;
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
    populateMovieData: (newData) => {
        if (!newData) return false;

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
        return true;
    },
    handleError: (error) => {
        if (!error) return false;

        set(state => ({
            ...state,
            error: error,
            failed: true
        }));
        return true;
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
        const handleError = get().handleError;
        const populate = get().populateMovieData;

        console.log("fetching TVShow", id);
        const data = await fetchData(`/tv/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        if (data?.code) {
            const newData = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
            if (newData?.code) { return handleError(newData) };
            populate(newData);
            return newData;
        };
        populate(data);
        return data;
    },
    getMovie: async ({ id }) => {
        const handleError = get().handleError;
        const populate = get().populateMovieData;

        console.log("fetching movie", id);
        const data = await fetchData(`/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
        if (data?.code) {
            const newData = await fetchData(`/tv/${id}?append_to_response=videos,credits&api_key=${API_KEY}`);
            if (newData?.code) { return handleError(newData) };
            populate(newData);
            return newData;
        };
        populate(data);
        return data;
    },
    getMoreSuggestions: async ({ genreId = 28, page = 1, type }) => {
        const setLoading = get().setLoading;
        setLoading(true);
        console.log("FETCHING WITH GENRE ID", genreId + "page nomber", page);

        const data = await fetchData(`/discover/${type || "movie"}?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
        console.log("FDetched sauggestions", data);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true, isFetching: false }));
        set(state => ({
            ...state,
            suggestions: [...state.suggestions, ...data?.results],
            isFetching: false
        }));
        return data;
    },
    getSuggestions: async ({ genreId = 28, page = 1, type }) => {
        console.log("FETCHING WITH GENRE ID", genreId + "page nomber", page);
        let data = await fetchData(`/discover/${type || "movie"}?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
        console.log("FETCHED DATA", data);
        if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        if (data?.results?.length < 1) {
            data = await fetchData(`/discover/tv?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`);
            if (data?.code) return set(state => ({ ...state, error: data, failed: true }));
        };
        set(state => ({
            ...state,
            suggestions: data?.results,
            totalSuggestions: data?.total_pages ?? 0
        }));
        return data;
    },
    // Get ActorDetails
    getActor: async ({ id }) => {
        const handleError = get().handleError;
        console.log("fetching ACTOR", id);
        const data = await fetchData(`/person/${id}?api_key=${API_KEY}`);
        // Default Error handling
        if (data?.code) return handleError(data);
        set((state) => ({
            ...state,
            actor: data,
            error: {},
            failed: false
        }));
        return data;
    },
    // Get Movies by Actor
    getMoviesByActorId: async ({ id, page = 1, type }) => {
        if (!id) return false;
        const handleError = get().handleError;
        console.log("fetching movies by Actorid", id, page);
        const data = await fetchData(`/discover/${(type && page > 1) ? type : "movie"}?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
        // let newData = [];
        // if (page === 1) {
        //     console.log("result found less than 20");
        //     let values = await fetchData(`/discover/tv?with_cast=${id}&page=${page}&api_key=${API_KEY}`);
        //     newData = values?.results ?? [];
        // };
        // console.log(data, newData);
        if (data?.code) return handleError(data);
        const newArray = data?.results;
        // data?.results?.concat(newData);
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