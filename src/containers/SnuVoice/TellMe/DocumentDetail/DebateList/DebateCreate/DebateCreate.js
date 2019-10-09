import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DebateCreate extends Component {
    render() {
        return (
            <div className="DebateCreate">
                <h1>DebateCreate</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateCreate));