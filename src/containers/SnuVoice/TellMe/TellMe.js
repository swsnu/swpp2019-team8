import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import UpperBar from '../UpperBar/UpperBar'

class TellMe extends Component {
    render() {
        return (
            <div className="TellMe">
                <UpperBar />
                <h1>TellMe</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(TellMe));