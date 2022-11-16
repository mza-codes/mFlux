import axios from 'axios';
import create from 'zustand';
import { API_KEY, TMDB_URL } from '../Constants/Constants';

const useSearchResults = create((set) => ({
    gotResult: false,
    result: [],
    query: "",
    error: "",
    getResults: async (query) => {
        console.log("data got to zustandstore", query);
        const { data } = await axios.get(`${TMDB_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`);
        console.log("RESULT Fetched", data);
        if (data?.results?.length) {
            set((state) => ({
                gotResult: true,
                query: query,
                result: data?.results,
            }))
        } else {
            set(state => ({
                gotResult: false,
                query: query,
                result: [],
                error: `No titles found regarding query "${query}"`
            }))
        }
    }
}));

export default useSearchResults;