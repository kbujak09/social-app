import styles from './header.module.scss';
import menu from '../../../assets/menu.webp';
import Avatar from '../../../components/avatar/Avatar';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar id={localStorage.avatar}/>
      </div>
      <div className={styles.menu}>
        <img src={menu} alt="menu" />
      </div>
    </div>
  )
}

export default Header;