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