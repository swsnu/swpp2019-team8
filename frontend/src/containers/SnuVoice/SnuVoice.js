import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Row, Col, Button, Image } from 'react-bootstrap';

import UpperBar from './UpperBar/UpperBar'

import TellMeButton from "../../img/tell_me.png";
import HearUsButton from "../../img/hear_us.png";

import './SnuVoice.css';

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
            <div>
                <UpperBar />
            <div className="SnuVoice">
                
                <br/>
                <Row>
                    <Col>
                        <br/>
                        <h1><b>SNU VOICE</b></h1>
                        <h4>
                            <i><b>COLLECTING THE STUDENTS' VOICE</b></i>
                        </h4>
                        <br/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Button variant="warning" id="tell_me_button" onClick={this.onClickTellMeButton}>
                            <Image src={TellMeButton} alt="Go to Tell Me" style={{width: 350, height: 350}} rounded/>
                        </Button>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="warning" id="hear_us_button" onClick={this.onClickHearUsButton}>
                            <Image src={HearUsButton} alt="Go to Hear Us" style={{width:350}} rounded/>
                        </Button>
                    </Col>
                </Row>
            </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(SnuVoice));