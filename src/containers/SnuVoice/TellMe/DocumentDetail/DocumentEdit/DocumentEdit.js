import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DocumentEdit extends Component {
    render() {
        return (
            <div className="DocumentEdit">
                <h1>DocumentEdit</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DocumentEdit));