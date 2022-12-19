import create from 'zustand';
import { persist } from 'zustand/middleware';
// persist method

const initialState = {
    watchlist: [],
};

const useWatchlist = create(
    persist(
        (set, get) => ({
            ...initialState,
            populate: () => {
                console.log("Populating Data");
                // case
            },
            removeFromWatchlist: (data) => {
                set((s) => ({
                    ...s,
                    watchlist: s.watchlist.filter((item) => {
                        return data.id !== item.id
                    })
                }));
                return true;
            },
            addToWatchList: (item) => {
                const newArray = get().watchlist.filter((data) => {
                    return data.id !== item.id;
                });
                // newArray.push(item);
                set(state => ({
                    ...state,
                    watchlist: [item,...newArray]
                }));
                return true;
            },
            clearWatchlist: () => {
                set(() => ({ ...initialState }));
                return true;
            },
        }),
        {
            name: 'mflux-watchlist', // name of item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
        }
    )
);

export default useWatchlist;

const dataModel = {
    persons: [],
};

const useFavouritesStore = create(
    persist(
        (set, get) => ({
            ...dataModel,
            populate: () => {
                console.log("Populating Data");
                // case
            },
            addPerson: (person) => {
                const newArray = get().persons.filter((data) => {
                    return data.id !== person.id;
                });
                // newArray.push(person);
                set(state => ({
                    ...state,
                    persons: [person,...newArray]
                }));
                return true;
            },
            removePerson: (data) => {
                set((s) => ({
                    ...s,
                    persons: s.persons.filter((item) => {
                        return data.id !== item.id
                    })
                }));
                return true;
            },
            clearFavourites: () => {
                set((state) => ({ ...dataModel }));
                return true;
            },
        }),
        {
            name: 'mflux-favourites', // name of item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
        }
    )
);

export { useFavouritesStore };