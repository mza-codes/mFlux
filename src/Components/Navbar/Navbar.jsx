import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { atom, useAtom } from 'jotai';
import useSearchResults from '../../Services/ResultFetch';

const viewAtom = atom(true);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewLogo, setViewLogo] = useAtom(viewAtom);
  const [isDesktop, setIsDesktop] = useAtom(viewAtom);
  const route = useNavigate();
  const reExSymbols = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
  const fetchresult = useSearchResults((state) => state.getResults);

  // useEffect(() => {
  if (window.innerWidth <= 460) {
    setViewLogo(false);
  } else {
    setViewLogo(true);
  };
  // }, []);

  const handleSearch = (e) => {
    const inputRef = document.getElementById('inputRef');
    console.log("QUERY++", inputRef.value);
    const key = inputRef.value;
    const isValid = reExSymbols.test(key);
    console.log(isValid);
    if (isValid) {
      console.log("SET");
      inputRef.style.borderBottom = "3px solid #68fc54";
      // FetchData
      fetchresult(key, 1);
      return;
    } else {
      inputRef.style.borderBottom = "3px solid red";
      return;
    };
  };

  return (<>
    <div className='navBar'>
      <div className="navWrapper">
        <div className="logo" onClick={e => route('/')}>
          {(isOpen && !isDesktop) || (viewLogo) && (<img src={mFlux} alt="_logo_mFlux" />)}
        </div>
        <div className='flex flex-row gap-2 items-center justify-center'>
          <div className={`relative inputArea font-poppins text-sm ${isOpen ? "visible" : "invisible"}`}>
            <input type="text" id='inputRef' placeholder='Search titles...' maxLength={50} />
            <button onClick={handleSearch} className='text-white opacity-30 hover:opacity-100 my-1 rounded-xl absolute right-2'>
              <iconify-icon width="24" height="24" icon="ic:round-send" />
            </button>
          </div>
          <div className='searchBtn'>
            <button className='text-white opacity-30 hover:opacity-100 px-1  rounded-xl' onClick={e => setIsOpen((curr) => (!curr))}>
              <iconify-icon width="24" height="24" icon="mingcute:search-3-line" />
            </button>
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