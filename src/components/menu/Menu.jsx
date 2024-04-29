import styles from './menu.module.scss';
import logo from '../../assets/logo-hor.webp';

import { useNavigate } from 'react-router-dom';

const Menu = ({setIsMenuOpen}) => {

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const closeMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  }

  return (
    <>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.button} onClick={() => navigate('/profile')}>PROFILE</div>
        <div onClick={logOut} id={styles.logOut} className={styles.button}>LOG OUT</div>
      </div>
    <div onClick={closeMenu} className={styles.bg}>
    </div>
    </>
  )
}

export default Menu;