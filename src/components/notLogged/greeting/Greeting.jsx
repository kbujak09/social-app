import styles from './greeting.module.scss';
import { useNavigate } from 'react-router-dom';

const Greeting = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <strong>Welcome</strong>, where're we going?
      </div>
      <div className={styles.buttons}>
        <div onClick={() => navigate('/login')} className={styles.login}>Log in</div>
        <div className={styles.or}>or</div>
        <div onClick={() => navigate('/signup')} className={styles.register}>Sign up</div>
      </div>
    </div>
  )
}

export default Greeting;