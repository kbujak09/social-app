import styles from './profile.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import User from './user/User';
import FollowButton from '../followbutton/FollowButton';
import ProfilePosts from './posts/ProfilePosts';
import Loader from '../loader/Loader';

import ReactLoading from 'react-loading';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {

  let { userId } = useParams();

  const [user, setUser] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (!userId) {
        userId = localStorage.userId;
      }
      const res = await fetch(`http://localhost:5000/api/users/${userId}`);
      const user = await res.json();
      setUser(user);
      setIsLoading(false);
    }
    catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    )
  }

  return (
    <div className={styles.outerContainer}>
      <SwipeBack path={'/'}/>
      <hr />
      <div className={styles.innerContainer}>
        {user && <User user={user}/>}
      </div>
      <hr />                                    
      {user._id !== localStorage.userId ? 
      <>
        <div className={styles.button}>
          <FollowButton userId={user._id} size={'large'}/>
        </div>
        <hr/>
      </> : null}
      <ProfilePosts userId={userId ? userId : localStorage.userId}/>
    </div>
  )
};

export default Profile;