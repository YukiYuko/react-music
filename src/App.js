import React, { Component } from 'react';
import {Switch, Route, HashRouter as Router,} from 'react-router-dom'

import Home from './views/Home/Home'
import Person from './views/Person/Person'
import Video from './views/Video/Video'
import Friend from './views/Friend/Friend'
import Setting from './views/Setting/Setting'
import SongList from './views/SongList/SongList'
import Play from './views/Play/Play'
import Top from './views/Top/Top'
import Subscribers from './views/Subscribers/Subscribers'
import High from './views/Highquality/Highquality'
import './App.css';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
  render() {
    return (
        <Router>
          <Route render={({ location }) => (
              <div className="App">
                <TransitionGroup>
                  {/* no different than other usage of
                CSSTransition, just make sure to pass
                `location` to `Switch` so it can match
                the old location as it animates out
            */}
                  <CSSTransition
                      key={location.key}
                      classNames="fade"
                      timeout={300}
                  >
                    <Switch location={location}>
                      <Route exact path='/' component={Home}/>
                      <Route exact path='/Video' component={Video}/>
                      <Route exact path='/Person' component={Person}/>
                      <Route exact path='/Friend' component={Friend}/>
                      <Route exact path='/Setting' component={Setting}/>
                      <Route exact path='/SongList/:id' component={SongList}/>
                      <Route exact path='/Play/:id' component={Play}/>
                      <Route exact path='/Top' component={Top}/>
                      <Route exact path='/Subscribers' component={Subscribers}/>
                      <Route exact path='/High' component={High}/>
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </div>
          )}/>
        </Router>
    );
  }
}

export default App;
