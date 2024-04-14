import styles from './userfollowing.module.scss';
import Avatar from '../../avatar/Avatar';
import Followbutton from '../../followbutton/Followbutton';

const UserFollowing = ({user, data, setData}) => {
  return (
    <div className={styles.person}>
      <div className={styles.data}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={styles.username}>{user.username}</div>
      </div>
      <Followbutton userId={user._id}/>
    </div>
  )
}

export default UserFollowing;