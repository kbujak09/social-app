import styles from './auth.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { LoginContext } from '../../../contexts/context';


const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const { setUser } = useContext(LoginContext);

  const logIn = async (e) => {
    e.preventDefault();
    try {
      let req = await fetch('http://192.168.0.26:5000/api/login', {
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

  const turnOffShake = () => {
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
      <div className={styles.title}>Log in</div>
      <form onSubmit={(e) => {logIn(e); setIsShaking(true); turnOffShake()}} id='login' className={styles.form}>
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
      <div className={styles.question}>
        Don't have an account? <strong onClick={() => navigate('/signup')}>Sign up</strong>
      </div>
      <div className={`${styles.message} ${isShaking ? styles.shake : null}`}>{message}</div>
    </div>
    </div>
  )
};

export default Login;