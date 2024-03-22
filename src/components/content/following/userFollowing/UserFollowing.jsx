import styles from './userfollowing.module.scss';
import Avatar from '../../../avatar/Avatar';

const UserFollowing = ({user, data, setData}) => {

  const unfollow = async () => {
    const req = await fetch(`http://192.168.0.16:5000/api/users/${localStorage.userId}/unfollow?followedId=${user._id}`, {
      method: 'POST'
    });
    setData(data.filter(item => item._id !== user._id));
  }

  return (
    <div className={styles.person}>
      <div className={styles.data}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={styles.username}>{user.username}</div>
      </div>
      <div onClick={unfollow} className={styles.button}>unfollow</div>
    </div>
  )
}

export default UserFollowing;