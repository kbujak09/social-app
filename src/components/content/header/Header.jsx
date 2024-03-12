import styles from './header.module.scss';
import menu from '../../../assets/menu.webp';
import Avatar from '../../../components/avatar/Avatar';

import { useNavigate } from 'react-router-dom';

const Header = ({isMenuOpen, setIsMenuOpen}) => {

  const navigate = useNavigate();

  const toggleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true);
  }

  return (
    <div className={styles.container}>
      <div onClick={() => navigate('/profile')} className={styles.avatar}>
        <Avatar id={localStorage.avatar}/>
      </div>
      <div className={styles.menu}>
        <img onClick={toggleMenu} src={menu} alt="menu" />
      </div>
    </div>
  )
}

export default Header;