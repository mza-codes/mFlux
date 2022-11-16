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
    getResults: async (query) => {
        console.log("data got to zustandstore", query);
        const { data } = await tmdbApi.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
        console.log("RESULT Fetched", data);
        if (data?.results?.length) {
            set((state) => ({
                gotResult: true,
                query: query,
                result: data?.results,
                isClosed: false
            }))
        } else {
            set(state => ({
                gotResult: false,
                query: query,
                result: [],
                error: `No titles found regarding query "${query}"`,
                isClosed: false
            }))
        }
    },
    toggleClose: () => {
        set(state => ({
            ...state,
            isClosed: !state.isClosed
        }))
    },


}));

export default useSearchResults;