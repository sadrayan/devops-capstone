import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

// Import Components 
import Search from './components/Search';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

class App extends Component { 

  render() {
    return (
      <div className="container">
          <Search {...this.props}/>
          <Nav />
          <Switch>
            <Route exact path="/" component={PhotoContainer} />
            <Route path="/search/:query" component={PhotoContainer} />
            <Route component={PageNotFound} />
          </Switch>
      </div>
    )
  }
}

export default withRouter(App);
