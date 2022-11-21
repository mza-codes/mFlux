import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Components/Navbar/mFlux.png';
import './Loading.scss';
import '../styles.scss';

const Loading = ({ err, msg }) => {

    const navigate = useNavigate();
    useEffect(() => {
        const element = document.getElementById('title');
        const messager = document.getElementById('msg');
        setTimeout(() => {
            element && (element.innerText = err || "Loading Content");
            messager && (messager.innerText = msg || "Taking too long to load ? Try reloading ! ");
        }, 7000);
    }, [err, msg]);

    return (
        <div className='loadPage '>
            <div className='logoContainer '>
                <img src={logo} alt="_logo_mFlux" />
            </div>

            <div className="myLoader">
                {/* <div className="lds-facebook"><div /><div /><div /><div /><div /><div /> </div> */}
                {/* <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> */}

                <div className="lds-ripple"><div></div><div></div></div>
                {/* <div class="lds-hourglass"></div> */}
            </div>
            <h1 id='title' className='text-white text-2xl font-kanit w-full text-center'>Loading Content</h1>
            <p id='msg' className='text-white font-poppins my-2 font-normal'>This website is best viewed in large screens & <br />
                best performed in Google Chrome Version 107.0.5304.107  !</p>
            <div className="lds-ellipsis">
                <div /> <div /> <div /> <div />
            </div>
            <p>CopyRights © {(new Date().getFullYear())} <br />
                <a href="https://mza-codes.github.io/" rel='noreferrer' target="_blank" className='mza-link'>mza-codes</a>
            </p>
            {/* {err && <button className='homeBtn my-3' onClick={e => navigate('/', { replace: true })} >HOME</button>} */}
            {err && <h2 onClick={e => navigate('/')} className='text-2xl text-teal-400 cursor-pointer
            text-center py-3 font-kanit font-medium flex justify-center hover:text-amber-400'>Go to HomePage</h2>}
        </div>
    )
}

export default Loading
