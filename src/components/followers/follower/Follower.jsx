import styles from './follower.module.scss';
import Avatar from '../../avatar/Avatar';

const Follower = ({user, setUsers, users, isLocalUser}) => {
  
  const remove = async () => {
    try {
      const req = await fetch(`http://localhost:5000/api/users/${localStorage.userId}/remove?followerId=${user._id}`, {
        method: 'POST'
      });

      console.log(req)

      if (req.ok) {
        setUsers(users.filter(item => item._id !== user._id));
      }
    }
    catch (err) {
      console.log(err.meesage);
    }
  }

  return (
    <div className={styles.person}>
      <div className={styles.data}>
        <div className={styles.avatar}><Avatar id={user.avatar}/></div>
        <div className={styles.username}>{user.username}</div>
      </div>
      { isLocalUser() ? 
        <div onClick={remove} className={styles.button}>remove</div> 
        :
        null
      }
    </div>
  )
}

export default Follower;