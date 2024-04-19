import { Context } from './contexts/context';
import Profile from './components/profile/Profile';
import NotLogged from './components/notLogged/NotLogged'
import Homepage from './components/homepage/Homepage';
import Following from './components/following/Following';
import Followers from './components/followers/Followers';
import MayKnow from './components/mayknow/MayKnow';
import PostPage from './components/postpage/PostPage';
import Loader from './components/loader/Loader';
import './App.scss';                  

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';

const App = () => {

  const [user, setUser] = useState('');
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  
  const fetchPosts = async (userId, cb) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts?userId=${userId}`);
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching posts failed: ', err);
    }
  }
  
  const fetchFollowing = async (userId, cb) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/following`);
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching followed users failed: ', err);
    }
  }
  
  const fetchFollowers = async (userId, cb) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}/followers`);
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching followers failed: ', err);
    }
  }

  const fetchUserPosts = async (userId, cb) => {
    try {
      let res = await fetch(`http://localhost:5000/api/posts/${userId}`);
      const data = await res.json();
      cb(data);
    } catch (err) {
      console.error('Fetching local user posts failed: ', err);
    }
  }
  
  const fetchData = async () => {
    if (localStorage.token) {
      try {
        await Promise.all([
          fetchPosts(localStorage.userId, setPosts),
          fetchFollowing(localStorage.userId, setFollowing),
          fetchFollowers(localStorage.userId, setFollowers),
          fetchUserPosts(localStorage.userId, setUserPosts)
        ]);
        setUser(localStorage.token);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Loader sb={false}/>
    )
  }

  return (
    <Context.Provider value={{
                            setUser, 
                            posts, 
                            following, 
                            setFollowing, 
                            followers, 
                            setFollowers, 
                            isLoading,
                            fetchFollowing,
                            fetchFollowers,
                            fetchPosts,
                            setPosts,
                            userPosts
                            }}>
      <Routes>
        <Route path={'/login'} element={<NotLogged type={'login'}/>}/>
        <Route path={'/signup'} element={<NotLogged type={'register'}/>}/>
        <Route path={'/profile/followers'} element={<Followers/>}/>
        <Route path={'/profile/following'} element={<Following/>}/>
        <Route path={'/user/:userId/followers'} element={<Followers/>}/>
        <Route path={'/user/:userId/following'} element={<Following/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/mayknow'} element={<MayKnow/>}/>
        <Route path={'/user/:userId'} element={<Profile/>}/>
        <Route path={'/post/:postId'} element={<PostPage/>}/>
        <Route path={'/'} element={!user && !isLoading ? <NotLogged type={'greeting'}/> : <Homepage/>} exact/>
      </Routes>
    </Context.Provider>
  )
}

export default App;