import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DocumentDetail extends Component {
    render() {
        return (
            <div className="DocumentDetail">
                <h1>DocumentDetail</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DocumentDetail));