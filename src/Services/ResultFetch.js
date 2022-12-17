import create from 'zustand';
import { API_KEY } from '../Constants/Constants';
import { tmdbApi } from '../Utils/tmdb';

// https://api.themoviedb.org/3/search/multi?api_key=<key>&query=luther&page=1&include_adult=false
// /search/movie?api_key=${API_KEY}&query=${query}&page=${page}`

const useSearchResults = create((set) => ({
    gotResult: false,
    result: [],
    query: "",
    error: "",
    oldResult: [],
    isClosed: false,
    response: {},
    getResults: async (query, page) => {
        console.log("data got to zustandstore", query, page);
        // let pageNum = parseInt(page) + 1;
        console.log(`Fetching PAGE ${page}`);
        try {
            const { data } = await tmdbApi.get(`/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`);
            console.log("RESULT Fetched", data);
            if (data?.results?.length >= 0) {
                set((state) => ({
                    ...state,
                    gotResult: true,
                    query: query,
                    result: data?.results,
                    oldResult: [...state.result],
                    response: data,
                    isClosed: false
                }));
            } else {
                set(state => ({
                    ...state,
                    gotResult: false,
                    query: query,
                    result: [],
                    error: `No titles found regarding query "${query}"`,
                    isClosed: false
                }));
            };
        } catch (err) {
            console.log("Error Fetching", err);
            set(state => ({
                ...state,
                gotResult: false,
                error: "Failed to connect with server !"
            }));
        };
    },
    toggleClose: () => {
        set(state => ({
            ...state,
            isClosed: !state.isClosed
        }))
    },
    getPage: async (page) => {
        console.log("Page MAIN DATA: ", page);
        // const { data } = await tmdbApi.get(`/search/movie?query=${"g"}&page=${page}&api_key=${API_KEY}`);
        // parseInt(page) + 1
        set(state => ({
            ...state,
            response: { ...state.response, page: page }
        }));
    },

}));

export default useSearchResults;