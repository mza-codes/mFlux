import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useSearchResults from '../../Services/ResultFetch';
import { atom, useAtom } from 'jotai';

const viewAtom = atom(false);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useAtom(viewAtom);
  console.log("hide Status", hide);
  const route = useNavigate();
  const reExSymbols = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
  const fetchresult = useSearchResults((state) => state.getResults);
  const query = useSearchResults(state => state?.query);

  const handleSearch = (e) => {
    const inputRef = document.getElementById('inputRef');
    console.log("QUERY++", inputRef.value);
    const key = inputRef.value;

    const isValid = reExSymbols.test(key);
    if (key?.toLowerCase() === query?.toLowerCase()) {
      inputRef.style.borderBottom = "3px solid red";
      return;
    }
    console.log(isValid);
    if (isValid) {
      console.log("SET");
      inputRef.style.borderBottom = "3px solid #68fc54";
      fetchresult(key, 1);
      if (window?.location?.pathname === "/") {
        return true;
      } else {
        route('/search-results');
        return true;
      };
    } else {
      inputRef.style.borderBottom = "3px solid red";
      return;
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    } else return false;
  };

  return (<>
    <div className={`navBar ${hide ? "fixed z-10" : "fixed z-50"}`}>
      <div className="navWrapper">
        <div className={`logo ${hide ? "opacity-0 hover:opacity-70" : "visible"}`} onClick={e => route('/')}>
          <img src={mFlux} className={`${isOpen && "invisible"} min-[440px]:visible sm:m-2 `} alt="_logo_mFlux" />
        </div>
        <div className={`flex flex-row gap-2 items-center justify-center searchSection sm:m-2 
          ${hide ? "opacity-0 hover:opacity-70" : "visible"}`}>
          <div className={`relative inputArea font-poppins text-sm ${isOpen ? "visible" : "invisible"}`}>
            <input type="text" id='inputRef' onKeyPress={handleKeyPress} placeholder='Search titles...' maxLength={50} />
            <button onClick={handleSearch} className='text-white opacity-30 hover:opacity-100 my-1 rounded-xl absolute right-2'>
              <iconify-icon width="24" height="24" icon="ic:round-send" />
            </button>
          </div>
          <div className='searchBtn'>
            <button className='text-white opacity-30 hover:opacity-100 px-1  rounded-xl' onClick={e => setIsOpen((curr) => (!curr))}>
              <iconify-icon width="24" height="24" icon="mingcute:search-3-line" />
            </button>
          </div>
          <input id="toggler" type="checkbox" hidden onChange={e => setHide(e?.target?.checked)} />
          <label htmlFor="toggler">
            <div className='Avatar'>
              <img itemType='label' src={Avatar} alt="_avatar" />
            </div>
          </label>
        </div>
      </div>
    </div>
  </>)
}

export default Navbar