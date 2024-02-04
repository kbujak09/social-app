import { useState } from 'react';

import styles from './content.module.scss';
import Header from './header/Header';
import Menu from './menu/Menu';
import Nav from './nav/Nav';

const Content = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [chosen, setChosen] = useState('home');

  return (
    <div className={styles.container}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      {isMenuOpen ? <Menu setIsMenuOpen={setIsMenuOpen}/> : null}

      <Nav chosen={chosen} setChosen={setChosen}/>
    </div>
  )
}

export default Content;