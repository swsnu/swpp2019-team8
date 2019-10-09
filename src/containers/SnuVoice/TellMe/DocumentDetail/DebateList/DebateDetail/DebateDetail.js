import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DebateDetail extends Component {
    render() {
        return (
            <div className="DebateDetail">
                <h1>DebateDetail</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateDetail));