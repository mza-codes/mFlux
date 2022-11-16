import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const route = useNavigate();
  const reExSymbols = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;

  const handleSearch = (e) => {
    console.log("QUERY++", e.target.value);
    const key = e.target.value;
    const isValid = reExSymbols.test(key);
    console.log(isValid);
    if (isValid) {
      console.log("SET");
      e.target.style.borderBottom = "3px solid #68fc54";
      // FetchData
    } else {
      console.log(e.target);
      e.target.style.borderBottom = "3px solid red";
      return;
    };
  };

  return (<>
    <div className='navBar'>
      <div className="navWrapper">
        <div className="logo" onClick={e => route('/')}>
          <img src={mFlux} alt="_logo_mFlux" />
        </div>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <div className={`inputArea font-poppins text-sm ${isOpen ? "visible" : "invisible"}`}>
            <input type="text" placeholder='Search titles...' maxLength={50} onChange={handleSearch} />
          </div>
          <div className='searchBtn'>
            <button className='bg-white opacity-30 hover:opacity-100 px-1 rounded-xl' onClick={e => setIsOpen((curr) => (!curr))}>
              <i className="ri-find-replace-fill text-2xl"></i></button>
          </div>
          <div className='Avatar'>
            <img src={Avatar} alt="_avatar" />
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Navbar