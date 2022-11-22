import './styles.scss';
import './index.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';

if (process.env.NODE_ENV === 'production') {
    console.log = () => { return true; }
    console.error = () => { return true; }
    console.debug = () => { return true; }
}

const App = () => {

    return (
        <>
            <Navbar />
            <Banner />
            <Home />
            <Footer />
            {/* <ErrorBar err='Everything is Fine !'/> */}
        </>
    )
};

export default App;