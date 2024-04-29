import styles from './posts.module.scss';
import Post from './post/Post';
import { Context } from '../../contexts/context';
import Forward from '../forward/Forward';

import { useContext, useEffect } from 'react';

const Posts = () => {

  const { posts } = useContext(Context);

  let key = 0;

  return (
    <div className={styles.container}>
      {posts && posts.length > 0 && posts.map(post => {
        if (post.text) {
          return <Post data={post} key={key++}/>
        }
        else {
          return <Forward data={post} key={key++}/>
        }
      })
      }
    </div>
  )
};

export default Posts;