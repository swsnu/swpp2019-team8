
import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SnuVoice from './containers/SnuVoice/SnuVoice';
import SignUp from './containers/SnuVoice/SignUp/SignUp';
import TellMe from './containers/SnuVoice/TellMe/TellMe';
import DocumentSearchFail from './containers/SnuVoice/TellMe/DocumentSearchFail/DocumentSearchFail';
import DocumentDetail from './containers/SnuVoice/TellMe/DocumentDetail/DocumentDetail';
import DocumentCreate from './containers/SnuVoice/TellMe/DocumentCreate/DocumentCreate';
import DocumentEdit from './containers/SnuVoice/TellMe/DocumentDetail/DocumentEdit/DocumentEdit';
import PhotoUpload from './containers/SnuVoice/TellMe/PhotoUpload/PhotoUpload';
import DebateList from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateList';
import DebateCreate from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateCreate/DebateCreate';
import DebateDetail from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateDetail/DebateDetail';
import HearUs from './containers/SnuVoice/HearUs/HearUs';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/' exact component={SnuVoice} />
          <Route path='/sign_up' exact component={SignUp} />
          <Route path='/tell_me' exact component={TellMe} />
          <Route path='/tell_me/search_fail' exact component={DocumentSearchFail} />
          <Route path='/tell_me/documents/:document_title' exact component={DocumentDetail} />
          <Route path='/tell_me/create' exact component={DocumentCreate} />
          <Route path='/tell_me/documents/:document_title/edit' exact component={DocumentEdit} />
          <Route path='/tell_me/photo' exact component={PhotoUpload} />
          <Route path='/tell_me/documents/:document_title/debates' exact component={DebateList} />
          <Route path='/tell_me/documents/:document_title/debates/create' exact component={DebateCreate} />
          <Route path='/tell_me/documents/:document_title/debates/:debate_id' exact component={DebateDetail} />
          <Route path='/hear_us' exact component={HearUs} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;