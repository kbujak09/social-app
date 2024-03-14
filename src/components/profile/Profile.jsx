import styles from './profile.module.scss';
import SwipeBack from './swipeback/SwipeBack';
import User from './user/User';
import ReactLoading from 'react-loading';

import { useState, useEffect } from 'react';

const Profile = () => {

  const [user, setUser] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch(`http://192.168.0.19:5000/api/users/${localStorage.userId}`);
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
        <SwipeBack />
        <div className={styles.loadingInner}>
          <ReactLoading width='48px' type='spin'/>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.outerContainer}>
      <SwipeBack />
      <hr />
      <div className={styles.innerContainer}>
        {user && <User user={user}/>}
      </div>
      <hr />
    </div>
  )
};

export default Profile;