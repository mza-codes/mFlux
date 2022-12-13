import HorizRow from '../../Components/HorizontalRow/HorizRow';
import './Home.scss';
import {
    action, action2, comedy, comedy2,
    documentaries, family, horror, horror2, originals, popular, romance,
    romance2, topRated, trending, trending2, tvPopular, upcoming
} from '../../URLs/URLS';
import ErrorBar from '../../Components/ErrorBar';
import useRow from '../../Services/Row';

export const listCategories = [
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
    { key: "family", value: family }
];

const Home = () => {
    const data = useRow(s => s.data);
    const err = useRow(s => s.err);

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