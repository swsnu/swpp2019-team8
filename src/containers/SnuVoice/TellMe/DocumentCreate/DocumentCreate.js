import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DocumentCreate extends Component {
    render() {
        return (
            <div className="DocumentCreate">
                
                <h1>DocumentCreate</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DocumentCreate));