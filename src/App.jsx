import { useState, useEffect } from 'react';
import { LoginContext } from './contexts/context';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/profile/Profile';
import NotLogged from './components/notLogged/NotLogged'
import Content from './components/content/Content';
import Following from './components/content/following/Following';
import Followers from './components/content/followers/Followers';
import './App.scss';                                    

const App = () => {

  const [user, setUser] = useState('');

  useEffect(() => {
    if (localStorage.token) {
      setUser(localStorage.token)
    }
  }, [])


  return (
    <LoginContext.Provider value={{setUser}}>
      <Routes>
        <Route path={'/login'} element={<NotLogged type={'login'}/>}/>
        <Route path={'/signup'} element={<NotLogged type={'register'}/>}/>
        <Route path={'/profile/followers'} element={<Followers/>}/>
        <Route path={'/profile/following'} element={<Following/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/'} element={!user ? <NotLogged type={'greeting'}/> : <Content/>} exact/>
      </Routes>
    </LoginContext.Provider>
  )
}

export default App;