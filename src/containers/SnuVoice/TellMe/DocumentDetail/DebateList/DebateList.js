
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DebateList extends Component {
    render() {
        return (
            <div className="DebateList">
                <h1>DebateList</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DebateList));