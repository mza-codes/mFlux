import axios from 'axios';
import create from 'zustand';
import { API_KEY, TMDB_URL } from '../Constants/Constants';

const tmdbApi = axios.create({
    baseURL: TMDB_URL,
    timeout: 5000
});

const useSearchResults = create((set) => ({
    gotResult: false,
    result: [],
    query: "",
    error: "",
    isClosed: false,
    response: {},
    getResults: async (query, page) => {
        console.log("data got to zustandstore", query, page);
        try {
            const { data } = await tmdbApi.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
            console.log("RESULT Fetched", data);
            if (data?.results?.length) {
                set((state) => ({
                    ...state,
                    gotResult: true,
                    query: query,
                    result: [...data?.results, ...state.result.slice(0,6)],
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
    getPage: async (page, data) => {
        console.log("Page ", page, "MAIN DATA:", data);
        // const { data } = await tmdbApi.get(`/search/movie?query=${"g"}&page=${page}&api_key=${API_KEY}`);
        set(state => ({
            ...state,
            response: { ...state.response, page: page }
        }))
    }


}));

export default useSearchResults;