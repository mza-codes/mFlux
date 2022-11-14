import './app.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';

const App = () => {
    
    return (
        <>
            <Navbar />
            <div className='p-8'/> 
            <Home />
        </>
    )
};

export default App;