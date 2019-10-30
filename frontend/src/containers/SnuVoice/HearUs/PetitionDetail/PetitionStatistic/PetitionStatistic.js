import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionStatistic extends Component {
    render() {
        return (
            <div className="PetitionStatistic">
                <h1>PetitionStatistic</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionStatistic));