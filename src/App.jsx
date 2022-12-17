import './styles.scss';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './Components/Footer/Footer';

if (process.env.NODE_ENV === 'production') {
    console.log = () => { return; }
    console.error = () => { return; }
    console.debug = () => { return; }
};

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