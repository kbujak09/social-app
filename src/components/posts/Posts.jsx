import styles from './posts.module.scss';
import Post from './post/Post';
import { Context } from '../../contexts/context';

import { useContext } from 'react';

const Posts = () => {

  const { posts } = useContext(Context);

  let key = 0;

  return (
    <div className={styles.container}>
      {posts && posts.length > 0 && posts.reverse().map(post => {
      return <Post data={post} key={key++}/>})
      }
    </div>
  )
};

export default Posts;