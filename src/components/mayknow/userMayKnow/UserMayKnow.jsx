import styles from './usermayknow.module.scss';
import Avatar from '../../avatar/Avatar';

const UserMayKnow = ({user, setData, data}) => {

  console.log(data)

  const follow = async () => {
    const req = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/follow?followedId=${user._id}`, {
      method: 'POST'
    });
    console.log(data)
    await setData(data.filter(item => item._id !== user._id));
  }

  return (
    <div className={styles.person}>
      <div className={styles.data}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={styles.username}>{user.username}</div>
      </div>
      <div onClick={follow} className={styles.button}>follow</div>
    </div>
  )
}

export default UserMayKnow;