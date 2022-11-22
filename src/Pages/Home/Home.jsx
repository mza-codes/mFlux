import { useEffect, useState } from 'react';
import HorizRow from '../../Components/HorizontalRow/HorizRow';
import './Home.scss';
import axios from 'axios';
import {
    action, action2, comedy, comedy2,
    documentaries, family, horror, horror2, originals, popular, romance,
    romance2, topRated, trending, trending2, tvPopular, upcoming
} from '../../URLs/URLS';

const Home = () => {
    const v = Math.floor(Math.random() * 100);
    const listCategories = [
        "trending",
        "romance",
        "popular",
        "tvPopular",
        "documentaries",
        "horror",
        "comedy",
        "action",
        "topRated",
        "upcoming",
        "trending2",
        "action2",
        "originals",
        "comedy2",
        "horror2",
        "romance2",
        "family",
    ];

    const list = [
        trending,
        romance,
        popular,
        tvPopular,
        documentaries,
        horror,
        comedy,
        action,
        topRated,
        upcoming,
        trending2,
        action2,
        originals,
        comedy2,
        horror2,
        romance2,
        family,
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

    const fetchAll = () => {
        for (let i = 0; i < listCategories.length; i++) {
            const data = localStorage.getItem(listCategories[i]);
            if (data) {
                console.log("got data");
                let value = JSON.parse(data);
                if (v <= 50) {
                    value.reverse();
                    setData((current) => ({ ...current, [listCategories[i]]: value }));
                    // return;
                } else {
                    setData((current) => ({ ...current, [listCategories[i]]: value }));
                    // return;
                };
            } else {
                console.log("no data found");
                fetchData();
                break;
            };
        };
    };

    const fetchData = async () => {
        console.log("Fetching Data");
        for (let i = 0; i < list.length; i++) {
            const { data } = await axios.get(list[i]);
            setData((current) => ({ ...current, [listCategories[i]]: data?.results }));
            localStorage.setItem(listCategories[i], JSON.stringify(data?.results));
        };
    };

    useEffect(() => {
        // fetchData();
        fetchAll()
    }, []);

    return (
        <>
            {listCategories.map((value, i) => (
                <HorizRow key={i} title={value.replace(/[0-9]/g, '')} data={data[value] || []} />
            ))}
        </>
    )
};

export default Home;