import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import UpperBar from './UpperBar/UpperBar'

import TellMeButton from "../../img/tell_me.png";
import HearUsButton from "../../img/hear_us.png";

//import './SnuVoice.css';

class SnuVoice extends Component {
    state = {

    }

    onClickTellMeButton = () => {
        this.props.history.push('/tell_me');
    }

    onClickHearUsButton = () => {
        this.props.history.push('/hear_us');
    }

    render() {
        return (
            <div className="SnuVoice">
                <UpperBar />
                <div className="Row">
                    <Button type="button" id="tell_me_button" onClick={this.onClickTellMeButton}>
                        <Image src={TellMeButton} rounded/>
                    </Button>
                    <Button type="button" id="hear_us_button" onClick={this.onClickHearUsButton}>
                        <Image src={HearUsButton} />
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(SnuVoice));