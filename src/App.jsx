import './styles.scss';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import HomeV2 from './Pages/HomeV2';

const App = () => {

    return (
        <>
            <Navbar />
            <main className='hidden lg:block'>
                <Banner />
            </main>
            <HomeV2 />
            <Footer />
        </>
    )
};

export default App;