import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionSearch extends Component {
    render() {
        return (
            <div className="PetitionSearch">
                <h1>PetitionSearch</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionSearch));