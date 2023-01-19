import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Loading.scss';
import '../styles.scss';
import { mFluxLogo } from '../Assets';

const Loading = ({ err, msg, timeout = 10000 }) => {

    useEffect(() => {
        const element = document.getElementById('title');
        const messager = document.getElementById('msg');
        const svg = document.querySelector('.logoContainer');

        const displayer = setTimeout(() => {
            element && (element.innerText = err || "Loading Content");
            messager && (messager.innerText = msg || "Taking too long to load ? Try reloading ! ");
        }, timeout);

        const newTime = setTimeout(() => {
            svg.style.color = "#ffc000";
            svg.innerHTML = `<div><iconify-icon icon="bx:error" width="180" height="180" /></div>`;
            element.innerText = `It seems like the site is not responding, Please try again later!`;
            messager.innerText = `We sincerely apologize for this issue, Visit again!`;
            document.getElementById('loader').style.display = "none";
        }, 38 * 1000);

        return () => {
            clearTimeout(displayer);
            clearTimeout(newTime);
        };
    }, [err, msg]);

    return (
        <section className='loadPage '>
            <div className='logoContainer '>
                <img src={mFluxLogo} alt="_logo_mFlux" />
            </div>

            <div id='loader' className="lds-ellipsis">
                <div /> <div /> <div /> <div />
            </div>

            <h1 id='title' className='text-white text-2xl font-kanit w-full text-center'>Loading Content</h1>
            <p id='msg' className='text-white font-poppins my-2 font-normal max-w-[90%]'>
                This website is best viewed in larger screens!
            </p>

            <p>CopyRights © {(new Date().getFullYear())} <br />
                <a href="https://mza-codes.github.io/" rel='noreferrer' target="_blank" className='mza-link'>mza-codes</a>
            </p>

            {err && <Link to="/" className='text-2xl text-zinc-300 cursor-pointer text-center py-3 font-kanit 
                font-[300] flex justify-center hover:text-gray-200'>
                Go to HomePage
            </Link>}
        </section>
    );
};