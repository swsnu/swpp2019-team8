
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DocumentSearchFail extends Component {
    render() {
        return (
            <div className="DocumentSearchFail">
                <h1>DocumentSearchFail</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DocumentSearchFail));