import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home/Home'
import Person from './views/Person/Person'
import Video from './views/Video/Video'
import Friend from './views/Friend/Friend'
import Setting from './views/Setting/Setting'
import SongList from './views/SongList/SongList'
import Play from './views/Play/Play'
import Top from './views/Top/Top'
import Subscribers from './views/Subscribers/Subscribers'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/Video' component={Video}/>
          <Route exact path='/Person' component={Person}/>
          <Route exact path='/Friend' component={Friend}/>
          <Route exact path='/Setting' component={Setting}/>
          <Route exact path='/SongList/:id' component={SongList}/>
          <Route exact path='/Play/:id' component={Play}/>
          <Route exact path='/Top' component={Top}/>
          <Route exact path='/Subscribers' component={Subscribers}/>
        </Switch>
      </div>
    );
  }
}

export default App;
