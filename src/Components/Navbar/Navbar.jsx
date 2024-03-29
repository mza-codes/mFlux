import './Navbar.scss';
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import useSearchResults from '../../Services/ResultFetch';
import { Avatar, mFluxLogo } from '../../Assets';
import { scrollToTop } from '../../Utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const route = useNavigate();
  const reExSymbols = /^[a-zA-Z0-9][a-zA-Z0-9 ]*$/;
  const fetchresult = useSearchResults((state) => state.getResults);
  const query = useSearchResults(state => state?.query);
  const inputRef = useRef();

  const handleSearch = () => {
    const key = inputRef.current.value;
    const isValid = reExSymbols.test(key);

    // Preventing fetching result from same query
    if (key?.toLowerCase() === query?.toLowerCase()) {
      inputRef.current.style.borderBottom = "3px solid red";
      return;
    };

    if (isValid) {
      inputRef.current.style.borderBottom = "3px solid #68fc54";
      fetchresult(key, 1);

      if (window?.location?.hash !== "#/") {
        // added #/ to identify page using hashrouter,if using browser router use native /
        route('/search-results');
        return true;
      };
    } else {
      inputRef.current.style.borderBottom = "3px solid red";
      return;
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
      return true;
    } else return false;
  };

  const handleLogoClick = () => {
    if (window?.location?.hash !== "#/") return route('/');
    else return scrollToTop();
  };

  const toggleTheme = () => {
    // document.body.classList.toggle('lightMode');
    return;
  };

  return (
    <header className={`navBar ${hide ? "fixed z-10" : "fixed z-50"}`}>
      <main className="navWrapper">

        <div className={`logo ${hide ? "opacity-0 hover:opacity-70" : "block"} w-[80px] m-1
          xl:w-[120px] lg:w-[120px] md:w-[95px] sm:w-[85px] lg:m-0 `} onClick={handleLogoClick}>
          <img src={mFluxLogo} className={`${isOpen && "hidden"} min-[440px]:block sm:m-2 `} alt="_logo_mFlux" />
        </div>

        <section className={`flex flex-row gap-2 items-center justify-center searchSection sm:m-2 
          ${hide ? "opacity-0 hover:opacity-70" : "block"}`}>
          <div className={`relative inputArea font-poppins text-sm ${isOpen ? "block" : "hidden"}`}>
            <input type="text" ref={inputRef} onKeyPress={handleKeyPress} placeholder='Search titles...' maxLength={50} />
            <button onClick={handleSearch} className='text-white opacity-30 hover:opacity-100 my-1 rounded-xl absolute right-2'>
              <iconify-icon width="24" height="24" icon="ic:round-send" />
            </button>
          </div>

          <button className='text-white opacity-30 hover:opacity-100 px-1  rounded-xl'
            onClick={e => setIsOpen((curr) => (!curr))}>
            <iconify-icon width="24" height="24" icon="mingcute:search-3-line" />
          </button>
          {!isOpen && <>
            <Link to="/watchlist" title='View Wachlist'
              className='text-white opacity-30 hover:opacity-100 px-1 rounded-xl'>
              <iconify-icon width="24" height="24" icon="ic:round-collections-bookmark" />
            </Link>
            <Link to="/favourites/actors" title='View Favourited Persons'
              className='text-white opacity-30 hover:opacity-100 px-1 rounded-xl'>
              <iconify-icon width="24" height="24" icon="mdi:account-star" />
            </Link>
            <Link to="/mflux-v1" title='Change to Desktop View'
              className='text-white opacity-30 hover:opacity-100 px-1 rounded-xl'>
              <iconify-icon width="24" height="24" icon="iconoir:modern-tv-4k" />
            </Link>
          </>}
          {/* 
          <button className='text-white opacity-30 hover:opacity-100 px-1  rounded-xl' type='button' onClick={toggleTheme}>
            <iconify-icon width="24" height="24" icon="line-md:sunny-filled-loop-to-moon-filled-loop-transition" />
          </button>

          <button className='text-white opacity-30 hover:opacity-100 px-1  rounded-xl' type='button' onClick={toggleTheme}>
            <iconify-icon width="24" height="24" icon="material-symbols:settings-suggest" />
          </button> */}

          <input id="toggler" type="checkbox" hidden onChange={e => setHide(e?.target?.checked)} />
          <label htmlFor="toggler">
            <div className='Avatar w-[30px] xl:w-[40px] lg:w-[40px] md:w-[40px] sm:w-[30px] '>
              <img itemType='label' src={Avatar} alt="_avatar" />
            </div>
          </label>

        </section>

      </main>
    </header>
  );
};

export default Navbar;