import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Profile from './components/profile/Profile';
import DeckBuilder from './components/builder/DeckBuilder';
import Manager from './components/manager/Manager';
import RegisterForm from './components/register/RegisterForm';
import ChangeForm from './components/profile/change/ChangeForm';
import LoginForm from './components/login/LoginForm';
import Copyright from './components/copyright/Copyright';
import Home from './components/home/Home';
import NotFound from './components/NotFound';
import Logout from './components/Logout';

import auth from './services/auth';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Establishes application routes
 * Branching container for components
 */
class App extends Component {
  state = { 
    user: undefined
  }
  
  componentDidMount(){
    this.updateAuthStatus();
  }

  /**
   * Callback to trigger re-rendering on login request
   */
  updateAuthStatus = () => {
    const user = auth.getCurrentUser();
    if(user) this.setState({ user });
  }

  /**
   * Callback to trigger re-rendering on logout request
   */
  resetAuthStatus = () => {
    this.setState({ user: undefined });
  }
  
  render() {
    const { user } = this.state;

    return (
      <div className = "app app-background">
        <ToastContainer autoClose = {2000} />
        <Navbar user = {user}/>

        <Switch>
            <Route exact path = "/" component = {Home} />
            <Route 
              path = "/builder" 
              render = {(props) => <DeckBuilder {...props} user = {user} />}
            />
            <Route path = "/manager" 
              render = {(props) => <Manager {...props} user = {user} />}
            />
            <Route 
              path = "/register" 
              render={(props) => <RegisterForm {...props} updateAuth = {this.updateAuthStatus} />}
            />
            <Route path = "/profile" 
              render = {(props) => <Profile {...props} user = {user} />}
            />
            <Route path = "/change-password" 
              render = {(props) => <ChangeForm {...props} user = {user} />}
            />
            <Route 
              path = "/login" 
              render={(props) => <LoginForm {...props} updateAuth = {this.updateAuthStatus} />}
            />
            <Route 
              path = "/logout" 
              render={(props) => <Logout {...props} resetAuth = {this.resetAuthStatus} />}
            />
            <Route path = "/copyright" component = {Copyright} />
            <Route path = "/notfound" component = {NotFound} />
            <Redirect from = "/home" exact to = "/" />
            <Redirect to = "/notfound" />
          </Switch>
      </div>
    );
  }
}
 
export default App;
