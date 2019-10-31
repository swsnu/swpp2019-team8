import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class DocumentDetail extends Component {
    componentDidMount() {
        this.props.onGetDocument(this.props.match.params.document_title);
    }

    render() {
        return (
            <div className="DocumentDetail">
                <h1>DocumentDetail</h1>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentDetail));