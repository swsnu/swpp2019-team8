import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class MyPetition extends Component {
    render() {
        return (
            <div className="MyPetition">
                <h1>MyPetition</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(MyPetition));