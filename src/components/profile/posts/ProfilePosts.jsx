import styles from './profileposts.module.scss';
import Post from '../../posts/post/Post';
import { Context } from '../../../contexts/context';

import { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const ProfilePosts = () => {

  const [isLoading, setIsLoading] = useState(true);

  const { userPosts } = useContext(Context);

  useEffect(() => {
    if (userPosts) {
      setIsLoading(false);
    }
  }, []);

  let key = 0;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <ReactLoading width='48px' type='spin'/>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {userPosts.length > 0 && userPosts.reverse().map(post => {
      return <Post data={post} key={key++}/>})
      }
    </div>
  )
};

export default ProfilePosts;