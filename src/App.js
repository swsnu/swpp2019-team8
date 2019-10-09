
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SnuVoice from './containers/SnuVoice/SnuVoice';
import SignUp from './containers/SnuVoice/SignUp/SignUp';
import TellMe from './containers/SnuVoice/TellMe/TellMe';
import DocumentSearchFail from './containers/SnuVoice/TellMe/DocumentSearchFail/DocumentSearchFail';
import DocumentDetail from './containers/SnuVoice/TellMe/DocumentDetail/DocumentDetail';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/' exact component={SnuVoice} />
          <Route path='/sign_up' exact component={SignUp} />
          <Route path='/tell_me' exact component={TellMe} />
          <Route path='/tell_me/search_fail' exact component={DocumentSearchFail} />
          <Route path='/tell_me/:document_title' exact component={DocumentDetail} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;