
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SnuVoice from './containers/SnuVoice/SnuVoice';
import SignUp from './containers/SnuVoice/SignUp/SignUp';
import TellMe from './containers/SnuVoice/TellMe/TellMe';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/' exact component={SnuVoice} />
          <Route path='/sign_up' exact component={SignUp} />
          <Route path='/tell_me' exact component={TellMe} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;