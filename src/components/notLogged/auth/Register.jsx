import styles from './auth.module.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sign up</div>
      <hr />
      <form id='register' className={styles.form}>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-username"></label>
          <input className={styles.input} placeholder='Username' name='register-username' type="text"/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-password"></label>
          <input className={styles.input} placeholder='Password' name='register-password' type="password"/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-confirm"></label>
          <input className={styles.input} placeholder='Confirm password' name='register-confirm' type="password"/>
        </div>
      </form>
      <div className={styles.submit}>
        <input type="submit" value='Create account' form='register'/>
      </div>
      <div className={styles.question}>
        Already have an account? <strong onClick={() => navigate('/login')}>Log in</strong>
      </div>
    </div>
  )
};

export default Register;