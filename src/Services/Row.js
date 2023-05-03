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
            setLoading(boolean) {
                set((s) => ({
                    ...s,
                    loading: boolean,
                }));
            },
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
            populate: async () => {
                return new Promise(async (res, rej) => {
                    listCategories.forEach(async (item, i) => {
                        const data = await fetchCategory(item);
                        if (data?.code) {
                            set((state) => ({
                                ...state,
                                err: data?.message ?? "Error Occured While Fetching Data !",
                            }));
                            return false;
                        }
                        get().setData({ [item.key]: data?.results ?? [] });

                        if (i === listCategories.length - 1) res(true);
                    });
                });
            },
            populateLocal: async () => {
                return new Promise(async (res, rej) => {
                    console.count("fillrows func called ");
                    const populate = get().populate;

                    let value = localStorage.getItem(mfluxCache);
                    if (!value) {
                        const status = await populate();
                        res(status);
                    }

                    value = JSON.parse(value);
                    const data = value?.state?.data;

                    const result = listCategories.every((item) => {
                        // used every instead of forEach due to error in returns and breaking
                        const hasValue = data[item.key]?.length >= 1;
                        if (!hasValue) return false;
                        return true;
                    });
                    console.log("inside promise", result);

                    if (!result) {
                        const status = await populate();
                        res(status);
                    }
                    res(true);
                }).then(() => {
                    get().setLoading(false);
                });
            },
        }),
        {
            name: mfluxCache,
            getStorage: () => localStorage,
        }
    )
);

export default useRow;
