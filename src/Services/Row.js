import axios from 'axios';
import create from 'zustand';
import { persist } from "zustand/middleware";
import { listCategories } from '../Pages/Home/Home';

export const mfluxCache = "mflux-cache";

const initialState = {
    data:
    {
        trending: [],
        romance: [],
        popular: [],
        tvPopular: [],
        documentaries: [],
        horror: [],
        comedy: [],
        action: [],
        topRated: [],
        upcoming: [],
        trending2: [],
        action2: [],
        originals: [],
        comedy2: [],
        horror2: [],
        romance2: [],
        family: [],
    },
    err: "",
    error: null,
    bannerList: []
};

const fetchCategory = async ({ key, value }) => {
    console.log("Fetching", key);
    try {
        const { data } = await axios.get(value);
        console.log("Fetch Success for", key);
        return data;
    } catch (err) {
        console.log("Error fetching", key);
        // let errorMsg = "Error Fetching Data from Server";
        console.log(err);
        return err;
    };
};

const useRow = create(
    persist(
        (set, get) => ({
            ...initialState,
            setData: ({ key, array }) => {
                console.log("SetDat valled");
                set((state) => ({
                    ...state,
                    data: {
                        ...state.data,
                        [key]: array
                    }
                }));
                return true;
            },
            populate: () => {
                console.log(":Called populate ");
                const setData = get().setData;
                listCategories.forEach(async (item) => {
                    const data = await fetchCategory(item);
                    if (data?.code) return set((state) => ({ ...state, err: data?.message ?? "Error Occured While Fetching Data !" }));
                    setData({ key: item.key, array: data?.results });
                    return true;
                });
            },
            populateLocal: () => {
                console.count("fillrows func called ");
                const populate = get().populate;
                let value = localStorage.getItem(mfluxCache);
                if (!value) { populate(); return false; };

                value = JSON.parse(value);
                const data = value?.state?.data;

                listCategories.every((item) => {  
                    // used every instead of forEach due to error in returns and breaking
                    const hasValue = data[item.key]?.length >= 1;
                    if (!hasValue) {
                        populate();
                        return false;
                    };
                    return true;
                });
            },

        }), {
        name: mfluxCache,
        getStorage: () => localStorage
    }
    ));

export default useRow;