import { useState } from 'react';

import styles from './homepage.module.scss';
import Header from '../header/Header';
import Menu from '../menu/Menu';
import Creator from '../creator/Creator';
import Posts from '../posts/Posts';
import MayKnowNavigate from '../mayknow/navigate/MayKnowNavigate';

const Homepage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <Creator 
        placeholder={"What's on your mind?"}
        submitText={"POST"}
        isComment={false}
        maxLength={120}
      />
      <MayKnowNavigate /> 
      <Posts />
      {isMenuOpen ? <Menu setIsMenuOpen={setIsMenuOpen}/> : null}
    </div>
  )
}

export default Homepage;