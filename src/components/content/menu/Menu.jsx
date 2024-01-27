import styles from './menu.module.scss';

const Menu = ({setIsMenuOpen}) => {

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
        <div className={styles.button}>PROFILE</div>
        <div className={styles.button}>SETTINGS</div>
        <div onClick={logOut} className={styles.button}>LOG OUT</div>
      </div>
    <div onClick={closeMenu} className={styles.bg}>
    </div>
    </>
  )
}

export default Menu;