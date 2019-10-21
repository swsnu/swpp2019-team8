import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import UpperBar from './UpperBar/UpperBar'

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
                    <Button type="button" id="tell_me_button"
                        onClick={this.onClickTellMeButton}>TELL-ME</Button>
                    <Button type="button" id="hear_us_button"
                        onClick={this.onClickHearUsButton}>HEAR-US</Button>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(SnuVoice));