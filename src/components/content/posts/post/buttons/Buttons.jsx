import styles from './buttons.module.scss';
import like from '../../../../../assets/like.svg';
import comment from '../../../../../assets/comment.svg';
import forward from '../../../../../assets/forward.svg';

const Buttons = ({data}) => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <img className={styles.icon} src={like} alt="like" />
        <div className={styles.count}>{data.likes}</div>
      </div>
      <div className={styles.button}>
        <img className={styles.icon} src={comment} alt="comment" />
        <div className={styles.count}>{data.comments}</div>
      </div>
      <div className={styles.button}>
        <img className={styles.icon} src={forward} alt="forward" />
        <div className={styles.count}>{data.forwards}</div>
      </div>
    </div>
  );
}

export default Buttons;