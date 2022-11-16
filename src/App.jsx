import 'https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js';
import './app.css';
import Banner from './Components/Banner/Banner';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
{/* <script src="https://code.iconify.design/iconify-icon/1.0.1/iconify-icon.min.js"></script> */}


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