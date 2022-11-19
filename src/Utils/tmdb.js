import axios from "axios";
import { TMDB_URL } from "../Constants/Constants";

export const tmdbApi = axios.create({
    baseURL: TMDB_URL,
    timeout: 5000
});