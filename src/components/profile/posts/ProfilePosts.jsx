import styles from './profileposts.module.scss';
import Post from '../../posts/post/Post';
import { Context } from '../../../contexts/context';
import Forward from '../../forward/Forward';

import { useContext, useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useParams } from 'react-router-dom';

const ProfilePosts = () => {

  let { userId } = useParams();

  const { bearer, ip } = useContext(Context)

  const [isLoading, setIsLoading] = useState(true);

  const [posts, setPosts] = useState();

  const isLocal = userId ? false : true;

  let key = 0;

  const fetchProfilePosts = async () => {
    try {
      const req = await fetch(`${ip}/api/posts/${userId ? userId : localStorage.userId}`, {
        headers: {
          Authorization: bearer,
        }
      });

      const data = await req.json()

      setPosts(data);
      setIsLoading(false);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchProfilePosts();
  }, [])

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <ReactLoading width='48px' type='spin'/>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      { posts && posts.length === 0 && isLocal &&
        <div className={styles.empty}>
          Post your thoughts and bring this profile to life!
        </div>
      }
      { posts && posts.length === 0 && !isLocal &&
        <div className={styles.empty}>
          Seems like this profile is empty :(
        </div>
      }
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

export default ProfilePosts;