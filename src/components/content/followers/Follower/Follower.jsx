import styles from './follower.module.scss';
import Avatar from '../../../avatar/Avatar';

const Follower = ({user}) => {

  const remove = async () => {
    const req = await fetch('');
  }

  return (
    <div className={styles.person}>
      <div className={styles.data}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={styles.username}>{user.username}</div>
      </div>
      <div onClick={remove} className={styles.button}>remove</div>
    </div>
  )
}

export default Follower;