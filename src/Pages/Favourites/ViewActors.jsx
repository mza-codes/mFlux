import { Link, useNavigate } from "react-router-dom";
import ActorCard from "../../Components/ActorCard";
import Navbar from "../../Components/Navbar/Navbar";
import { useFavouritesStore } from "../../Services/Store";

const ViewActors = () => {
    const route = useNavigate();
    const actors = useFavouritesStore(s => s.persons);
    const removePerson = useFavouritesStore(s => s.removePerson);
    // const clearFavourites = useFavouritesStore(s => s.clearFavourites);

    const fetchPerson = (person) => {
        route(`/actor-details/${person?.id}`, { state: person?.media_type });
        return true;
    };

    console.log("actors print", actors);
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
                        : <span className="text-xl">Seems like you have saved some of your favourite persons !</span>
                    }
                </div>
                <main className="flex flex-row flex-wrap justify-center mt-4">
                    {actors?.map((person, i) => (
                        <div className="relative" key={person?.id || i}>
                            <ActorCard actor={person} hide={1} onClick={e => fetchPerson(person)} key={person?.id || i}/>
                            <div title="Delete Person" className="absolute left-4 top-4 z-[105] opacity-0 hover:opacity-90
                                 hover:text-red-400 cursor-pointer" onClick={() => removePerson(person)}>
                                <iconify-icon icon="material-symbols:bookmark-remove-rounded" height={36} width={36} />
                            </div>
                        </div>
                    ))}
                </main>
            </section>
        </>
    );
};

export default ViewActors;