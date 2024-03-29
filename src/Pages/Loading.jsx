import { useEffect } from 'react';
import './Loading.scss';
import '../styles.scss';

const Loading = ({ err, msg, timeout = 15000 }) => {

    useEffect(() => {
        const element = document.getElementById('title');
        const messager = document.getElementById('msg');
        const svg = document.querySelector('.logoContainer');

        const displayer = setTimeout(() => {
            element && (element.innerText = err || "Loading Content");
            messager && (messager.innerText = msg || "Taking too long to load ? Try reloading ! ");
        }, timeout);

        const newTime = setTimeout(() => {
            svg.style.color = "#ffbf00";
            svg.innerHTML = `<div><iconify-icon icon="bx:error" width="180" height="180" /></div>`;
            element.innerText = `It seems like the site is not responding, Please try again later!`;
            messager.innerText = `We sincerely apologize for this issue, Visit again!`;
            document.getElementById('loader').style.display = "none";
        }, 40 * 1000);

        return () => {
            clearTimeout(displayer);
            clearTimeout(newTime);
        };
    }, [err, msg]);

    return (
        <div className={"loaderParentPage"}>
            <h2 className='logoContainer movieLog font-black font-righteous text-7xl lg:text-9xl'>mFlux</h2>
            <div id='loader' className="loaderContainer py-4">
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
                <div className="wave" />
            </div>
            <h4 id='title' className='gradient-text text-2xl'>Loading Content</h4>
            <p id='msg' className='gradient-text0 text-zinc-200 font-poppins my-2 font-normal max-w-[90%]'>
                This website is best viewed in larger screens!
            </p>
            <span className='gradient-text text-xl pt-6'> © <br /> {new Date().getFullYear()} <br /> mza-codes</span>
        </div>
    );
};

export default Loading;
