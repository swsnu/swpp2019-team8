
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class SnuVoice extends Component {
    render() {
        return (
            <div className="SnuVoice">
                <h1>SnuVoice</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(SnuVoice));