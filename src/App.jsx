import 'https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js';
import './styles.scss';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';

if (process.env.NODE_ENV === 'production') {
    console.log = () => {return true; }
    console.error = () => {return true; }
    console.debug = () => {return true; }
}

const App = () => {

    return (
        <>
            <Navbar />
            <Banner />
            <Home />
            {/* <ErrorBar err='Everything is Fine !'/> */}
        </>
    )
};

export default App;