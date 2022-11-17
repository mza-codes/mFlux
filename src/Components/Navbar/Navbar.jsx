import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png';
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import useSearchResults from '../../Services/ResultFetch';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef();
  const route = useNavigate();
  const reExSymbols = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
  const fetchresult = useSearchResults((state) => state.getResults);

  const handleSearch = (e) => {
    console.log("QUERY++", inputRef.current.value);
    const key = inputRef.current.value;
    const isValid = reExSymbols.test(key);
    console.log(isValid);
    if (isValid) {
      console.log("SET");
      inputRef.current.style.borderBottom = "3px solid #68fc54";
      // FetchData
      fetchresult(key, 1);
      return;
    } else {
      inputRef.current.style.borderBottom = "3px solid red";
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
          <div className={`relative inputArea font-poppins text-sm ${isOpen ? "visible" : "invisible"}`}>
            <input type="text" ref={inputRef} placeholder='Search titles...' maxLength={50} />
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