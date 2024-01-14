import styles from './auth.module.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.container}>
      <div className={styles.title}>Log in</div>
      <hr />
      <form id='login' className={styles.form}>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="login-username"></label>
          <input className={styles.input} placeholder='Username' name='login-username' type="text"/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="login-password"></label>
          <input className={styles.input} placeholder='Password' name='login-password' type="password"/>
        </div>
      </form>
      <div className={styles.submit}>
        <input type="submit" value='Log in' form='login'/>
      </div>
      <div className={styles.question}>
        Don't have an account? <strong onClick={() => navigate('/signup')}>Sign up</strong>
      </div>
    </div>
    </div>
  )
};

export default Login;