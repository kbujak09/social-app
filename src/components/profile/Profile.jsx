import styles from './profile.module.scss';
import SwipeBack from '../swipeback/SwipeBack';
import User from './user/User';
import Followbutton from '../followbutton/FollowButton';

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
      <div className={styles.loadingOuter}>
        <SwipeBack/>
        <div className={styles.loadingInner}>
          <ReactLoading width='48px' type='spin'/>
        </div>
      </div>
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
          <Followbutton userId={user._id} size={'large'}/>
        </div>
        <hr/>
      </> : null}
    </div>
  )
};

export default Profile;