import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionCreate extends Component {
    render() {
        return (
            <div className="PetitionCreate">
                <h1>PetitionCreate</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionCreate));