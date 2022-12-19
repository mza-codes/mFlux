import { Link, useNavigate } from "react-router-dom";
import ActorCard from "../../Components/ActorCard";
import Navbar from "../../Components/Navbar/Navbar";
import { useFavouritesStore } from "../../Services/Store";

const ViewActors = () => {
    const route = useNavigate();
    const actors = useFavouritesStore(s => s.persons);
    // const clearFavourites = useFavouritesStore(s => s.clearFavourites);

    const fetchPerson = (person) => {
        route(`/actor-details/${person?.id}`, { state: person?.media_type });
        return true;
    };

    console.log("actors print",actors);
    // clearFavourites();

    return (
        <>
            <Navbar />
            <section className="text-white watvhlist pt-20">
                <div className="flex flex-col gap-2 items-center">
                    <h2 className="font-kanit text-4xl">Favourite Actors</h2>
                    {actors?.length <= 0 ?
                        <>
                            <span className="text-xl">There's nothing in your Favourite Actors !</span>
                            <Link to="/">
                                <button className="bg-emerald-800 bg-opacity-60 hover:bg-opacity-100  p-2 rounded-lg">Browse</button>
                            </Link>
                        </>
                        : <span className="text-xl">Seems like you have some favourite actors !</span>
                    }
                </div>
                <main className="flex flex-row flex-wrap justify-center mt-4">
                    {actors?.map((movie, i) => (
                        <ActorCard actor={movie} key={movie?.id || i} hide={1} onClick={e => fetchPerson(movie)} />
                    ))}
                </main>
            </section>
        </>
    );
};

export default ViewActors;