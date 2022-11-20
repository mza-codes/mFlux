import create from 'zustand';

const useRecents = create((set) => ({
    recents: [],
    isAvailable: false,
    program: "null",
    testing: "true",
    data: [],
    addItem: (item) => {
        console.log("adding item", item);
        set((state => ({
            ...state,
            recents: [...item]
        })));
    },
    addOne: (data) => {
        console.log("adding data", data);
        set(state => ({
            ...state,
            recents: [data, ...state.recents]
        }));
    }
}));

export default useRecents;