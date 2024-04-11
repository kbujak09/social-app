import styles from './buttons.module.scss';
import Status from './status/Status';
import Message from './message/Message';

const Buttons = ({userId}) => {
  return (
    <div className={styles.container}>
      <Status userId={userId}/>
      <Message userId={userId}/>
    </div>
  )
}

export default Buttons;