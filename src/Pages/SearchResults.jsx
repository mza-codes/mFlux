import Navbar from "../Components/Navbar/Navbar";
import useSearchResults from "../Services/ResultFetch";
import PaginatedItems from "../Components/ReactPagination";
import useRecents from "../Contexts/useRecents";
import { useNavigate } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const SearchResults = () => {

    const { query, result, response } = useSearchResults();
    const { recents, addItem } = useRecents();
    const route = useNavigate();

    const handleStore = (movie) => {
        const newArray = recents?.filter((item) => item?.id !== movie?.id);
        newArray.push(movie);
        newArray.reverse();
        addItem(newArray);
        route('/recents');
        return;
    };

    return (
        <>
            <Navbar />
            <div className="text-white page pt-20">
                <h2 className="font-kanit text-2xl text-center"> Displaying {result?.length} Results for "{query}" </h2>
                <div className="resultContainer">
                    <div className="flex flex-row flex-wrap justify-center mt-4">
                        {result?.map((movie) => (
                            <MovieCard key={movie?.id} movie={movie} handleStore={handleStore} />
                        ))}
                    </div>
                </div>
            </div>
            {response?.total_pages > 1 && <div className=' w-full flex flex-row justify-center items-center bottom-0 z-50 fixed mb-2'>
                <div className="bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-800 rounded-md">
                    <PaginatedItems data={response} />
                </div>
            </div>}
        </>)
}

export default SearchResults;