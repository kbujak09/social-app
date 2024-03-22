import { useState } from 'react';

import styles from './content.module.scss';
import Header from './header/Header';
import Menu from './menu/Menu';
import PostCreator from './postcreator/PostCreator';
import Posts from './posts/Posts';

const Content = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
      <PostCreator />
      <Posts />
      {isMenuOpen ? <Menu setIsMenuOpen={setIsMenuOpen}/> : null}
    </div>
  )
}

export default Content;