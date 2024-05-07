import styles from './auth.module.scss';
import { Context } from '../../../contexts/context';

import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
const { uniqueNamesGenerator, adjectives, colors, animals, starWars, names } = require('unique-names-generator');

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const { setUser, ip } = useContext(Context);

  const logIn = async (e, username, password) => {
    e.preventDefault();
    try {
      let req = await fetch(`${ip}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
      });
      const json = await req.json();
      if (req.status === 200) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('username', json.user.username);
        localStorage.setItem('avatar', json.user.avatar);
        localStorage.setItem('userId', json.user._id);
        setUser(json.token);
        setUsername('');
        setPassword('');
        navigate('/');
      }
      else {
        setMessage(json.message);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const signUpAnonymously = async (e, username, password) => {
    e.preventDefault();
    try {
      await fetch(`${ip}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams({
          username: username,
          password: password,
          confirm: password
        })
      });
    }
    catch (err) {
      console.error(err);
    }
  }

  async function createAnonymousUser(e) {
    let randomName = uniqueNamesGenerator({ dictionaries: [colors, animals, starWars, names], length: 1 });
    let defaultPassword = '12341234';
    await signUpAnonymously(e, randomName, defaultPassword);
    await logIn(e, randomName, defaultPassword);
  }

  const turnOffShake = () => {
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
      <div className={styles.title}>Log in</div>
      <form onSubmit={(e) => {logIn(e, username, password); setIsShaking(true); turnOffShake()}} id='login' className={styles.form}>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="login-username"></label>
          <input onChange={(e) => setUsername(e.target.value)} className={styles.input} placeholder='Username' name='login-username' type="text" required/>
        </div>
        <div className={styles.formCell}>
          <label className={styles.label} htmlFor="login-password"></label>
          <input onChange={(e) => setPassword(e.target.value)} className={styles.input} placeholder='Password' name='login-password' type="password" required/>
        </div>
      </form>
      <div className={styles.submit}>
        <input type="submit" value='Log in' form='login'/>
      </div>
      <div className={`${styles.submit} ${styles.anonymous}`}>
        <div onClick={(e) => {createAnonymousUser(e); turnOffShake()}}>Generate Random Account</div>
      </div>
      <div className={styles.question}>
        Don't have an account? <strong onClick={() => navigate('/signup')}>Sign up</strong>
      </div>
      <div className={`${styles.message} ${isShaking ? styles.shake : null}`}>{message}</div>
    </div>
    </div>
  )
};

export default Login;