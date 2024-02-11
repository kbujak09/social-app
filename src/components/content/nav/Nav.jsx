import styles from './nav.module.scss';
import home from '../../../assets/home.svg'
import followers from '../../../assets/followers.svg';

const Nav = ({chosen, setChosen}) => {
  return (
    <div className={styles.container}>
      <div id='home' className={styles.button}>
        {chosen !== 'home' ?
          <div className={styles.icon} onClick={() => setChosen('home')}><img src={home} alt='home'/></div>
        :
        <div className={styles.iconChosen}><img src={home} alt='home'/></div>}
      </div>
      <div id='followers' className={styles.button}>
        {chosen !== 'followers' ?
          <div className={styles.icon} onClick={() => setChosen('followers')}><img src={followers} alt='followers'/></div>
          :
          <div className={styles.iconChosen}><img src={followers} alt='followers'/></div>}
      </div>
    </div>
  )
};

export default Nav;