import { useEffect, useRef, useState } from "react";
import useRow from "../Services/Row";
import Loading from "../Pages/Loading";
import App from "../App";

export default function AppWrapper() {
    const fillRows = useRow((s) => s.populateLocal);
    // const isLoading = useRow((s) => s.loading);
    const [loading, setLoading] = useState(true);
    const ran = useRef(false);

    // console.log(`useRow() loading status => `, isLoading);

    useEffect(() => {
        if (!ran.current) {
            (async () => {
                setLoading(true);
                const response = await fillRows();
                setLoading(false);
            })();
        }
        return () => (ran.current = true);
    }, []);

    if (loading) return <Loading />;

    return <App />;
}
