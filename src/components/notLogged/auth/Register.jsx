import styles from './auth.module.scss';
import { Context } from '../../../contexts/context';

import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const Register = () => {

  const navigate = useNavigate();

  const { ip } = useContext(Context);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    try {
      let req = await fetch(`${ip}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          confirm: confirm
        })
      });

      const json = await req.json();

      if (req.status === 200) {
        setUsername('');
        setPassword('');
        setConfirm('');
        alert('Successfully signed up!');
        navigate('/login');
      }
      else {
        console.log(json)
        setMessage(json.errors[0].msg);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  const turnOffShake = () => {
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Sign up</div>
      <form onSubmit={(e) => {signUp(e); setIsShaking(true); turnOffShake()}} id='register' className={styles.form}>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-username"></label>
          <input onChange={(e) => setUsername(e.target.value)} className={styles.input} placeholder='Username' name='register-username' type="text" required/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-password"></label>
          <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Password' name='register-password' type="password" required/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="register-confirm"></label>
          <input onChange={(e) => setConfirm(e.target.value)} className={styles.input} placeholder='Confirm password' name='register-confirm' type="password" required/>
        </div>
      </form>
      <div className={styles.submit}>
        <input type="submit" value='Create account' form='register'/>
      </div>
      <div className={styles.question}>
        Already have an account? <strong onClick={() => navigate('/login')}>Log in</strong>
      </div>
      <div className={`${styles.message} ${isShaking ? styles.shake : null}`}>{message}</div>
    </div>
  )
};

export default Register;