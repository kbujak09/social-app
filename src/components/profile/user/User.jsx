import styles from './user.module.scss';
import Avatar from '../../avatar/Avatar';

import { useNavigate } from 'react-router-dom';

const User = ({user}) => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <Avatar id={user.avatar}/>
        <span className={styles.username}>{user.username}</span>
      </div>
      <div className={styles.socialCounters}>
        <div className={styles.followers} onClick={() => navigate('/profile/followers')}>Followers: {user.followers.length}</div>
        <div className={styles.following} onClick={() => navigate('/profile/following')}>Following: {user.followings.length}</div>
      </div>
    </div>
  )
};

export default User;