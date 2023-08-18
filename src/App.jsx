import './App.css';
import React, {useState} from "react";
import jwt_decode from "jwt-decode";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Create from './components/Create';
import Post from './components/Post';
import PostPage from './components/PostPage';
import PostEdit from './components/PostEdit';
import CommentEdit from './components/CommentEdit';



function App() {

  const [userDetails, setUserDetails] = useState([]);
  const [postId, setPostId] = useState('');

  function CheckUserId () {
    let jtoken = localStorage.getItem('jwt')
    if (jtoken) {
      let jwtdecoded = jwt_decode(jtoken);
      console.log(jwtdecoded);
      let userid = jwtdecoded.user._id;
      return userid;
    } else {
      let userid = [];
      return userid
    }
  }

  function Loginset (username) {
    setUserDetails(username);
    return;
  }

  function postset (postid) {
    setPostId(postid);
    return;
  }

  function LogOutset () {
    localStorage.removeItem('jwt');
    setUserDetails([]);
    return;
  }

    return (
      <HashRouter basename='/'>
        <div className='App'>
          <Navbar onLogOut={LogOutset}/>
          <Routes>
            <Route path="/" element={<Home data={userDetails} />} />
            <Route path="/login" element={<Login data={userDetails} onLogIn={Loginset}/>} />
            <Route path="/signup" element={<Signup data={userDetails}/>} />
            <Route path="/user" element={<User data={userDetails} onLoad={CheckUserId}/>} />
            <Route path="/create" element={<Create onLoad={CheckUserId}/>} />
            <Route path="/post" element={<Post />}>
              <Route path=":postid" element={<PostPage data={userDetails} onComment={CheckUserId} onCommUpd={postset}/>}/>
            </Route>
            <Route path="edit/:postid" element={<PostEdit onLoad={CheckUserId}/>} />
            <Route path="/comment/:commentid" element={<CommentEdit data={postId} onLoad={CheckUserId}/>} />
          </Routes>
        </div>
      </HashRouter>
    )

 
}

export default App;
