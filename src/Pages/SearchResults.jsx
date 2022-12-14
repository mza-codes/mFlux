import Navbar from "../Components/Navbar/Navbar";
import useSearchResults from "../Services/ResultFetch";
import PaginatedItems from "../Components/ReactPagination";
import ActorPost from "../Components/ActorPost";
import { PostModelN } from "../Components/PostModel";
import { hook } from "../Utils";

const SearchResults = () => {
    const query = hook("query", useSearchResults);
    const result = hook("result", useSearchResults);
    const response = hook("response", useSearchResults);
    const oldResult = hook("oldResult", useSearchResults);

    return (
        <>
            <Navbar />
            <div className="text-white page pt-20">
                <h2 className="font-kanit text-2xl text-center"> Displaying {result?.length} Results for "{query}" </h2>
                <div className="resultContainer">
                    <div className="flex flex-row flex-wrap justify-center items-center mt-4">
                        {result?.map((movie, i) => {
                            if (movie?.gender) {
                                return <ActorPost actor={movie} key={movie?.id || i} />
                            } else {
                                return <PostModelN key={movie?.id} movie={movie} />
                            };
                        })}
                    </div>
                    <hr className="p-3" />
                    {oldResult?.length >= 1 && <> <h1 className="text-3xl font-kanit text-center">Previous Search Results</h1>
                        <div className="flex flex-row flex-wrap justify-center items-center mt-4">
                            {oldResult?.map((movie, i) => {
                                if (movie?.gender) {
                                    return <ActorPost actor={movie} key={movie?.id || i} />
                                } else {
                                    return <PostModelN key={movie?.id} movie={movie} />
                                };
                            })}
                        </div>
                    </>}
                </div>
            </div>
            {response?.total_pages > 1 && result?.length > 0 &&
                <div className=' w-full flex flex-row justify-center items-center bottom-0 z-50 fixed mb-2'>
                    <div className="bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-800 rounded-md ">
                        <PaginatedItems data={response} />
                    </div>
                </div>
            }
        </>
    );
};

export default SearchResults;