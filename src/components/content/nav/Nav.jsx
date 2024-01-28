import styles from './nav.module.scss';
import home from '../../../assets/home.png';
import homeActive from '../../../assets/home-active.png';
import followers from '../../../assets/followers.png';
import followersActive from '../../../assets/followers-active.png';
import { useState } from 'react';

const Nav = () => {

  const [chosen, isChosen] = useState('home');

  return (
    <div className={styles.container}>
      <div id='home' className={styles.button}>
        <img src={chosen === home ? homeActive : home} alt="home" />
      </div>
      <div id='followers' className={styles.button}>
        <img src={chosen === followers ? followersActive : followers} alt="followers" />
      </div>
    </div>
  )
};

export default Nav;