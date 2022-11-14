import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const route = useNavigate();
  return (
    <div className='navBar'>
      <div className="navWrapper">
        <div className="logo" onClick={e => route('/', { replace: true })}>
          <img src={mFlux} alt="_logo_mFlux" />
        </div>
        <div className='Avatar'>
          <img src={Avatar} alt="_avatar" />
        </div>
      </div>
    </div>
  )
}

export default Navbar