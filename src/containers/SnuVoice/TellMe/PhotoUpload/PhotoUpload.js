
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PhotoUpload extends Component {
    render() {
        return (
            <div className="PhotoUpload">
                <h1>PhotoUpload</h1>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PhotoUpload));