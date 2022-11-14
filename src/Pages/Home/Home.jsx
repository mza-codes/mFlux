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

    const listValues = [
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

    console.log("dataValues prinitn", data);

    const fetchData = async () => {
        console.log("Fetching Data");
        for (let i = 0; i < list.length; i++) {
            const { data } = await axios.get(list[i]);
            setData((current) => ({ ...current, [listValues[i]]: data?.results }));
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {listValues.map((value, i) => (
                <HorizRow key={i} title={value} data={data[value] || []} />
            ))}
        </>
    )
}

export default Home