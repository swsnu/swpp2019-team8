import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class TellMe extends Component {
    render() {
        return (
            <div className="TellMe">
                <h1>TellMe</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(TellMe));