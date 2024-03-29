import { useRef, useState } from "react";
import { useCallback } from "react";
import ErrorBar from "../Components/ErrorBar";
import { PostModelN, PostModelNWRef } from "../Components/PostModel";
import useRow from "../Services/Row";
import { listCategories } from "./Home/Home";
import Loading from "./Loading";

const HomeV2 = () => {
    const data = useRow((s) => s.data);
    const err = useRow((s) => s.err);
    const random = Math.floor(Math.random() * listCategories.length - 1) + 1;
    const [items, setItems] = useState(data[listCategories?.[random]?.key] ?? []);
    const v = useRef(1);
    const observer = useRef();
    console.log("DATA ROW: ", data);

    const finalObj = useCallback((node) => {
        if (observer.current) observer.current?.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting) {
                    if (v.current === random) v.current++;
                    if (v.current >= listCategories.length - 1) {
                        console.log("limited", v.current, "<><>", listCategories.length);
                        return false; // v.current = 0;
                    }
                    const newData = data[listCategories?.[v.current]?.key] ?? [];
                    v.current++;
                    setItems((curr) => [...curr, ...newData]);
                    return true;
                }
            },
            { rootMargin: "400px" }
        );
        if (node) observer.current?.observe(node);
    }, []);

    return (
        <main className="flex flex-row justify-center items-center gap-3 flex-wrap p-3 pt-10 lg:pt-0">
            {items?.length <= 0 && <ErrorBar err={err} />}

            {items.map((movie, i) => {
                if (items?.length === i + 1) {
                    return <PostModelNWRef key={movie?.id} movie={movie} ref={finalObj} />;
                } else return <PostModelN key={movie?.id} movie={movie} />;
            })}

            <center className="w-full text-3xl font-normal text-gray-50 p-3">
                Displaying total of {items?.length} Items
            </center>
        </main>
    );
};

export default HomeV2;
