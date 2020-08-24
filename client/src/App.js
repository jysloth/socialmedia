import React, {useEffect} from 'react';
import './components/globalError.css'
import NavBar from './components/NavBar'
import Posts from './components/Posts'
import Feed from './components/Feed'
import Wall from './components/Wall'
import Chat from './components/Chat'
import UserInfo from './components/UserInfo'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Login from './pages/Auth/Login'
import Profile from './pages/Auth/Profile'
import Register from './pages/Auth/Register'
import { connect } from 'react-redux';
import { loadUser, noUser } from './flux/actions/authActions';
import store from './flux/store'
import axios from 'axios';






function App({auth,loadUser,noUser}) {
  
  useEffect(() => {
  if(auth.token){
    axios.defaults.headers.common['Authorization'] = auth.token;
    loadUser()
  }
  else
    noUser()
  }, []);

  // console.log(!auth.isAuthenticated)

  return (
    <div className="App">
    <NavBar/>
    <Switch>
    {auth.isAuthenticated?
    <>
      <Route exact path="/"  render={props => (<Feed/>)}/>
      <Route exact path="/user/:id"  render={props => (<UserInfo {...props}/>)}/>
      <Route exact path="/wall"  render={props => (<Wall/>)}/>
      <Route exact path="/chat"  render={props => (<Chat/>)}/>
      </>
        :
        <>
      <Route exact path="/"  render={props => (<Posts/>)}/>
      <Route exact path="/login"  render={props => (<Login/>)}/>
      <Route exact path="/register"  render={props => (<Register/>)}/>
      </>
    }
    </Switch>
  
    </div>
  );  
}

const mapStateToProps = (state) =>({
  auth: state.auth

})

export default connect(mapStateToProps,{loadUser,noUser})(App);
