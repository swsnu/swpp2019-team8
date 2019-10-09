import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionList extends Component {
    render() {
        return (
            <div className="PetitionList">
                <h1>PetitionList</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionList));