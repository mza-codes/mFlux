import 'https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js';
import './styles.scss';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';

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