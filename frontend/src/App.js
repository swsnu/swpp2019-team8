import React from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SnuVoice from './containers/SnuVoice/SnuVoice';
import SignUp from './containers/SnuVoice/SignUp/SignUp';
import TellMe from './containers/SnuVoice/TellMe/TellMe';
import PhotoUpload from './containers/SnuVoice/TellMe/PhotoUpload/PhotoUpload';
import DocumentSearchFail from './containers/SnuVoice/TellMe/DocumentSearchFail/DocumentSearchFail';
import DocumentCreate from './containers/SnuVoice/TellMe/DocumentCreate/DocumentCreate';
import DocumentDetail from './containers/SnuVoice/TellMe/DocumentDetail/DocumentDetail';
import DocumentEdit from './containers/SnuVoice/TellMe/DocumentDetail/DocumentEdit/DocumentEdit';
import DebateList from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateList';
import DebateCreate from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateCreate/DebateCreate';
import DebateDetail from './containers/SnuVoice/TellMe/DocumentDetail/DebateList/DebateDetail/DebateDetail';
import HearUs from './containers/SnuVoice/HearUs/HearUs';
import MyPetition from './containers/SnuVoice/HearUs/MyPetition/MyPetition';
import PetitionList from './containers/SnuVoice/HearUs/PetitionList/PetitionList';
import PetitionCreate from './containers/SnuVoice/HearUs/PetitionCreate/PetitionCreate';
import PetitionDetail from './containers/SnuVoice/HearUs/PetitionDetail/PetitionDetail';
import PetitionStatistic from './containers/SnuVoice/HearUs/PetitionDetail/PetitionStatistic/PetitionStatistic';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App" >
        <Switch>
          <Route path='/' exact component={SnuVoice} />
          <Route path='/sign_up' exact component={SignUp} />
          <Route path='/tell_me' exact component={TellMe} />
          <Route path='/tell_me/photo' exact component={PhotoUpload} />
          <Route path='/tell_me/search_fail' exact component={DocumentSearchFail} />
          <Route path='/tell_me/create' exact component={DocumentCreate} />
          <Route path='/tell_me/documents/:document_title' exact component={DocumentDetail} />
          <Route path='/tell_me/documents/:document_title/edit' exact component={DocumentEdit} />
          <Route path='/tell_me/documents/:document_title/debates' exact component={DebateList} />
          <Route path='/tell_me/documents/:document_title/debates/create' exact component={DebateCreate} />
          <Route path='/tell_me/documents/:document_title/debates/:debate_id' exact component={DebateDetail} />
          <Route path='/hear_us' exact component={HearUs} />
          <Route path='/hear_us/my_petition/:user_id' exact component={MyPetition} />
          <Route path='/hear_us/petitions' exact component={PetitionList} />
          <Route path='/hear_us/search' exact component={PetitionList} />
          <Route path='/hear_us/create' exact component={PetitionCreate} />
          <Route path='/hear_us/:petition_id' exact component={PetitionDetail} />
          <Route path='/hear_us/:petition_id/statistics' exact component={PetitionStatistic} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div >
    </ConnectedRouter>
  );
}

export default App;