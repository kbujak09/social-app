import styles from './content.module.scss';
import Header from './header/Header';

const Content = () => {

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className={styles.container}>
      <Header />
      <div onClick={logOut}>log out</div>
    </div>
  )
}

export default Content;