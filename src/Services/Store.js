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
            addToWatchList: (item) => {
                console.log("%cAddingData to watchlist", "color:red;font-size:18px;");
                const oldData = get().watchlist;
                if (oldData.includes(item)) return false;
                set(state => ({
                    ...state,
                    watchlist: [item, ...state.watchlist]
                }));
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
                console.log("%cAddingData to persons", "color:yellow;font-size:16px;");
                const oldData = get().persons;
                if (oldData.includes(person)) return false;
                set(state => ({
                    ...state,
                    persons: [person, ...state.persons]
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