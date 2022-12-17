import { API_KEY, TMDB_URL } from "../Constants/Constants";

export const romance = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
export const popular = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=free`
export const tvPopular = `${TMDB_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
export const documentaries = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`
export const horror = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
export const trending = `${TMDB_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
export const comedy = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
export const action = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
export const topRated = `${TMDB_URL}/movie/top_rated?api_key=${API_KEY}&with_genres=10751&page=1`
export const upcoming = `${TMDB_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
export const trending2 = `${TMDB_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`
export const action2 = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`
export const originals = `${TMDB_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`
export const comedy2 = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`
export const horror2 = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`
export const romance2 = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`
export const family = `${TMDB_URL}/discover/movie?api_key=${API_KEY}&with_genres=10751`

export const newUrl = {"genres":[{"id":10759,"name":"Action & Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":10762,"name":"Kids"},{"id":9648,"name":"Mystery"},{"id":10763,"name":"News"},{"id":10764,"name":"Reality"},{"id":10765,"name":"Sci-Fi & Fantasy"},{"id":10766,"name":"Soap"},{"id":10767,"name":"Talk"},{"id":10768,"name":"War & Politics"},{"id":37,"name":"Western"}]};
// get above list details as json url:-
// `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;

// get list with id = `https://api.themoviedb.org/3/list/${listId ?? "10759"}?api_key=${API_KEY}&language=en-US`;