import styles from './user.module.scss';
import Avatar from '../../avatar/Avatar';

import { useNavigate } from 'react-router-dom';

const User = ({user}) => {

  const navigate = useNavigate();

  const navigateFollowers = () => {
    user._id === localStorage.userId ?
      navigate('/profile/followers') 
      :
      navigate('followers');
  }

  const navigateFollowing = () => {
    user._id === localStorage.userId ?
      navigate('/profile/following') 
      :
      navigate('following');
  }

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <Avatar id={user.avatar}/>
        <span className={styles.username}>{user.username}</span>
      </div>
      <div className={styles.socialCounters}>
        <div className={styles.followers} onClick={user.followers.length > 0 ? navigateFollowers : null}>Followers: {user.followers.length}</div>
        <div className={styles.following} onClick={user.following.length > 0 ? navigateFollowing : null}>Following: {user.following.length}</div>
      </div>
    </div>
  )
};

export default User;