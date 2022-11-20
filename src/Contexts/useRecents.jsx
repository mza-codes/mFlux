import create from 'zustand';

const useRecents = create((set) => ({
    recents: [],
    currentMovie: {},
    addItem: (item) => {
        console.log("adding item", item);
        set((state => ({
            ...state,
            recents: [...item],
            currentMovie: state?.recents[0]
        })));
    },
    addOne: (data) => {
        console.log("adding data", data);
        set(state => ({
            ...state,
            recents: [data, ...state.recents],
            currentMovie: state?.recents[0]
        }));
    }
}));

export default useRecents;