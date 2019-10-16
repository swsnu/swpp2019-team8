import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import UpperBar from '../UpperBar/UpperBar'

class HearUs extends Component {
    render() {
        return (
            <div className="HearUs">
                <UpperBar />
                <h1>HearUs</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(HearUs));