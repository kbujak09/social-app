import styles from './nav.module.scss';
import { useState } from 'react';
import home from '../../../assets/home.png'

const Nav = ({chosen, setChosen}) => {
  return (
    <div className={styles.container}>
      <div id='home' className={styles.button}>
        {chosen !== 'home' ?
          <div onClick={() => setChosen('home')} className="material-symbols-outlined" style={{'font-size': '36px', 'color': '#DEE0E4'}}>home</div>
        :
          <div className="material-symbols-outlined" style={{'font-size': '36px', 'color': '#367de3'}}>home</div>}
      </div>
      <div id='followers' className={styles.button}>
        {chosen !== 'followers' ?
          <div onClick={() => setChosen('followers')} className="material-symbols-outlined" style={{'font-size': '36px', 'color': '#DEE0E4'}}>person</div>
        :
          <div className="material-symbols-outlined" style={{'font-size': '36px', 'color': '#367de3'}}>person</div>}
      </div>
    </div>
  )
};

export default Nav;