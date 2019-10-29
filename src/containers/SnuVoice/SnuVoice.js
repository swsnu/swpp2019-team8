import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Row, Col, Button, Image } from 'react-bootstrap';

import UpperBar from './UpperBar/UpperBar'

import TellMeButton from "../../img/tell_me.png";
import HearUsButton from "../../img/hear_us.png";

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
                <Row>
                    <Col>
                        <Button type="button" id="tell_me_button" onClick={this.onClickTellMeButton}>
                            <Image src={TellMeButton} alt="Go to Tell Me"rounded/>
                        </Button>
                    </Col>
                    <Col>
                        <Button type="button" id="hear_us_button" onClick={this.onClickHearUsButton}>
                            <Image src={HearUsButton} alt="Go to Hear Us" rounded/>
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(SnuVoice));