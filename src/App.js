import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Users from './component/users/Users';
import User from './component/users/User';
import Search from './component/users/Search';
import Alert from './component/layout/Alert';
import About from './component/pages/About';
import axios from 'axios';
import './App.css';

class App extends Component{

  REACT_APP_GITHUB_CLIENT_ID = '1117c4a501bf440490ee';
  REACT_APP_GITHUB_CLIENT_SECRET = 'ae04cf382f8116e47061fbca81ce416a5c33e4bf';
  
  state={
    users : [],
    user: {},
    loading: false,
    alert: null,
    repos:[]
  }
 
  searchUser = async (text) => {
    this.setState({loading:true});

    const request = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${this.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${this.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({users:request.data.items, loading:false});
  }

  setAlert = (msg, type) => {
        this.setState({alert:{ msg, type}});
        setTimeout(() => this.setState({alert:null }), 3000); 
  }
   
  //Get single GitHub User
  getUser = async (username) => {
    this.setState({loading:true});

    const request = await axios.get(`https://api.github.com/users/${username}?client_id=${this.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${this.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({user:request.data, loading:false});
  }

  // Get users repos 
  getUserRepos = async (username) => {
    this.setState({loading:true});

    const request = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${this.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${this.REACT_APP_GITHUB_CLIENT_SECRET}`);
    
    this.setState({repos:request.data, loading:false});
  }

  //Clear Users from State
  clearUsers = () => this.setState({users:[]});

  render() {
    const { loading, users,alert,user,repos } = this.state
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Alert alert={alert}/>
                    <Switch>
                        <Route exact path='/' render={props=>(
                            <Fragment>
                                <Search 
                                    searchUser={this.searchUser} 
                                    clearUsers={this.clearUsers} 
                                    showClear={users.length > 0 ? true : false} 
                                    setAlert={this.setAlert}
                                />
                                <Users loading={loading} users={users}/>  
                            </Fragment>
                        )}/>
                        <Route exact path='/about' component={About} />
                        <Route exact path='/user/:login' render={props =>(
                            <User 
                                {...props} 
                                getUser={this.getUser} 
                                getUserRepos={this.getUserRepos} 
                                user={user} 
                                repos={repos}
                                loading={loading} />
                        )}/>
                    </Switch>
                </div>
            </div>
      </Router>
    )  
  }
}

export default App;