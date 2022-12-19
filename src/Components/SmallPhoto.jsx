import { useFavouritesStore } from "../Services/Store";
import LazyImage from "./LazyImage";
import { image404 } from '../Assets';

const CrewSmallPhoto = ({ person, ...props }) => {
    const addPerson = useFavouritesStore(s => s.addPerson);

    return (
        <div className='mx-1 p-3 cursor-pointer hover:scale-105 transition-all ease-linear' >
            <div className="relative">
                <LazyImage {...props}
                    url={person?.profile_path ?
                        `https://image.tmdb.org/t/p/w300${person?.profile_path}` : image404}
                    className="rounded-lg min-w-[124px] max-h-[150px] object-cover aspect-square " />
                <div className="icon text-rose-600 hover:text-rose-500 z-[104] 
                                        cursor-pointer absolute right-1 top-1" onClick={() => addPerson(person)} >
                    <iconify-icon icon="mdi:favourite" width={26} height={26} />
                </div>
            </div>
            <span className='text-white text-base max-w-[100%]'>{person?.name || person?.original_name}</span>
            <h4 className='text-gray-400 text-sm max-w-[100%]'>{person?.job || person?.known_for_department
                || person?.department}
            </h4>
        </div>
    );
};

export default CrewSmallPhoto;

export const ActorSmallPhoto = ({ person, ...props }) => {
    const addPerson = useFavouritesStore(s => s.addPerson);

    return (
        <div className='mx-1 p-3 cursor-pointer hover:scale-105 transition-all ease-linear' >
            <div className="relative">
                <LazyImage
                    {...props}
                    url={person?.profile_path ? `https://image.tmdb.org/t/p/w300${person?.profile_path}` : image404}
                    className="rounded-lg min-w-[124px] max-h-[150px] object-cover aspect-square"
                />
                <div className="icon text-rose-600 hover:text-rose-500 z-[104] 
                    cursor-pointer absolute right-1 top-1" onClick={() => addPerson(person)} >
                    <iconify-icon icon="mdi:favourite" width={26} height={26} />
                </div>
            </div>
            <span className='text-white text-base max-w-[100%]'>{person?.name || person?.original_name}</span>
            <h4 className='text-gray-400 text-sm max-w-[100%]'>{person?.character}</h4>
        </div>
    );
};