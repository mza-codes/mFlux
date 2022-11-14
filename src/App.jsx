import './app.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';

const App = () => {
    
    return (
        <>
            <Navbar />
            {/* <div className='p-8'/>  */}
            <Banner />
            <Home />
        </>
    )
};

export default App;