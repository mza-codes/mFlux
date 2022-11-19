import 'https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js';
import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {

    return (
        <>
            <Navbar />
            <ToastContainer />
            <Banner />
            <Home />
            {/* <ErrorBar err='Everything is Fine !'/> */}
        </>
    )
};

export default App;