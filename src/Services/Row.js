import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import { listCategories } from "../Pages/Home/Home";

export const mfluxCache = "mflux-cache";

const initialState = {
    data: {
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
    bannerList: [],
    loading: false,
};

const fetchCategory = async ({ key, value }) => {
    console.log("Fetching", key);
    try {
        const { data } = await axios.get(value);
        console.log("Fetch Success for: ", key);
        return data;
    } catch (err) {
        console.log("Error fetching: ", key);
        console.log(err);
        return err;
    }
};

const useRow = create(
    persist(
        (set, get) => ({
            ...initialState,

            setData: (payload) => {
                console.log("SetData called with: ", payload);
                set((s) => ({
                    ...s,
                    data: {
                        ...s.data,
                        ...payload,
                    },
                }));
                return true;
            },
            populate: () => {
                get().loading = true;
                console.log(":Called populate");
                const setData = get().setData;
                listCategories.forEach(async (item) => {
                    const data = await fetchCategory(item);
                    if (data?.code) {
                        return set((state) => ({
                            ...state,
                            err: data?.message ?? "Error Occured While Fetching Data !",
                        }));
                    }
                    setData({ [item.key]: data?.results ?? [] });
                });
                // setData(payload);
                get().loading = false;
            },
            populateLocal: () => {
                get().loading = true;
                console.count("fillrows func called ");
                const populate = get().populate;
                let value = localStorage.getItem(mfluxCache);
                if (!value) {
                    populate();
                    return false;
                }

                value = JSON.parse(value);
                const data = value?.state?.data;

                listCategories.every((item) => {
                    // used every instead of forEach due to error in returns and breaking
                    const hasValue = data[item.key]?.length >= 1;
                    if (!hasValue) {
                        populate();
                        return false;
                    }
                    return true;
                });
                get().loading = false;
            },
        }),
        {
            name: mfluxCache,
            getStorage: () => localStorage,
        }
    )
);

export default useRow;
