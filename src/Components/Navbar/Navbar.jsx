import './Navbar.scss';
import mFlux from './mFlux.png';
import Avatar from './userAvatar.png'

const Navbar = () => {
  return (
    <div className='navBar'>
      <div className="navWrapper">
        <div className="logo">
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