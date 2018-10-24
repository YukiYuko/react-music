import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom'

import Home from './views/Home/Home'
import Person from './views/Person/Person'
import Video from './views/Video/Video'
import Friend from './views/Friend/Friend'
import Setting from './views/Setting/Setting'
import SongList from './views/SongList/SongList'
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
        </Switch>
      </div>
    );
  }
}

export default App;
