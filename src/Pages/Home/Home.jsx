import { useEffect, useState } from 'react';
import HorizRow from '../../Components/HorizontalRow/HorizRow';
import './Home.scss';
import axios from 'axios';
import {
    action, action2, comedy, comedy2,
    documentaries, family, horror, horror2, originals, popular, romance,
    romance2, topRated, trending, trending2, tvPopular, upcoming
} from '../../URLs/URLS';
import ErrorBar from '../../Components/ErrorBar';

const Home = () => {
    const [err, setErr] = useState();
    const listCategories = [
        { key: "trending", value: trending },
        { key: "romance", value: romance },
        { key: "popular", value: popular },
        { key: "tvPopular", value: tvPopular },
        { key: "documentaries", value: documentaries },
        { key: "horror", value: horror },
        { key: "comedy", value: comedy },
        { key: "action", value: action },
        { key: "topRated", value: topRated },
        { key: "upcoming", value: upcoming },
        { key: "trending2", value: trending2 },
        { key: "action2", value: action2 },
        { key: "originals", value: originals },
        { key: "comedy2", value: comedy2 },
        { key: "horror2", value: horror2 },
        { key: "romance2", value: romance2 },
        { key: "family", value: family },
    ];

    const [data, setData] = useState({
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
    });

    const fetchCategory = async ({ key, value }) => {
        console.log("Fetching", key);
        const controller = new AbortController();
        try {
            const { data } = await axios.get(value, { signal: controller.signal });
            setData((curr) => ({ ...curr, [key]: data?.results }));
            localStorage.setItem(key, JSON.stringify(data?.results));
            controller.abort();
            console.log("Fetch Success for", key);
            return true;
        } catch (err) {
            controller.abort();
            console.log("Error fetching", key);
            setErr("Error Fetching Data from Server");
            console.log(err);
            return false;
        };
    };

    const fetchTitles = () => {
        listCategories.forEach((item) => {
            const local = localStorage.getItem(item.key);
            if (!local) fetchCategory(item);
            else {
                console.log("Session Found for: ", item.key);
                setData((curr) => ({ ...curr, [item.key]: JSON.parse(local) }));
                return;
            };
        });
    };

    useEffect(() => {
        fetchTitles();
    }, []);

    return (
        <>
            {err && <ErrorBar err={err} />}
            {listCategories.map((value, i) => (
                <HorizRow key={i} title={value.key.replace(/[0-9]/g, '')} data={data[value.key] || []} />
            ))}
        </>
    )
};

export default Home;