import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class SignUp extends Component {
    render() {
        return (
            <div className="SignUp">
                <h1>SignUp</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(SignUp));