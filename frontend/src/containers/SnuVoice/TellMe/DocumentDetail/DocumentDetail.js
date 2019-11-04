import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { MarkdownPreview } from 'react-marked-markdown';

import * as actionCreators from '../../../../store/actions/index';

class DocumentDetail extends Component {
    componentDidMount() {
        this.props.onGetDocument(this.props.match.params.document_title);
    }

    render() {
        let title = '';
        let content = '';
        if (this.props.selectedDocument) {
            title = this.props.selectedDocument.title;
            content = this.props.selectedDocument.content;
        }
        return (
            <div className="DocumentDetail">
                <h1>DocumentDetail</h1>
                <h3>TITLE</h3>
                <p className="title">{title}</p>
                <h3>CONTENT</h3>
                <MarkdownPreview className="content" value={content} />
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentDetail));