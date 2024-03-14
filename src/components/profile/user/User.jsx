import styles from './user.module.scss';
import Avatar from '../../avatar/Avatar';

const User = ({user}) => {
  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        <Avatar id={user.avatar}/>
        <span className={styles.username}>{user.username}</span>
      </div>
      <div className={styles.socialCounters}>
        <div className={styles.followers}>Followers: {user.followers.length}</div>
        <div className={styles.following}>Following: {user.followings.length}</div>
      </div>
    </div>
  )
};

export default User;