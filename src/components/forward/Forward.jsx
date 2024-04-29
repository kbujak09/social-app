import styles from './forward.module.scss';
import Post from '../posts/post/Post';

const Forward = ({data}) => {

  return (
    <div className={styles.container}>
      <div className={styles.user}>Forwarded by 
        <span className={styles.username}> {data.author.username}</span></div>
      <div className={styles.post}>
        <Post isForward={true} data={data.post}/>
      </div>
    </div>
  )
}

export default Forward;