import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionDetail extends Component {
    render() {
        return (
            <div className="PetitionDetail">
                <h1>PetitionDetail</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionDetail));