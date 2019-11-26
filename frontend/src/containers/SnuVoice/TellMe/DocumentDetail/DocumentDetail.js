import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { MarkdownPreview } from 'react-marked-markdown';

import * as actionCreators from '../../../../store/actions/index';

import { Button } from 'reactstrap';

import Upperbar from '../../UpperBar/UpperBar';
import './DocumentDetail.css';

class DocumentDetail extends Component {
    componentDidMount() {
        this.props.onGetDocument(this.props.match.params.document_title);
    }

    onClickDocumentCancelButton = () => {
        this.props.history.push("/tell_me");
    };

    onClickDocumentEditButton = () => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + '/edit');
    }

    onClickDocumentDebateButton = () => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + '/debates');
    }

    render() {
        let title = '';
        let content = '';
        if (this.props.selectedDocument) {
            title = this.props.selectedDocument.title;
            content = this.props.selectedDocument.content;
        }
        return (
            <div>
                <Upperbar />
                <div className="DocumentDetail">
                    <br />
                    <h4 className="document">Document:</h4>
                    <div className="content">
                        <br />
                        {/* <h3>TITLE</h3> */}
                        <h1 className="title">{title}</h1>
                        {/* <h3>CONTENT</h3> */}
                        <hr />
                        <MarkdownPreview className="content" value={content} />
                        <hr />
                        <Button
                            type="button"
                            id="document_cancel_button"
                            onClick={this.onClickDocumentCancelButton}
                        >
                            Back
                        </Button>
                        <Button
                            type="button"
                            id="document_edit_button"
                            onClick={this.onClickDocumentEditButton}
                        >
                            Edit
                        </Button>
                        <Button 
                            className="debateButton"
                            onClick={this.onClickDocumentDebateButton}
                            >Debate</Button>
                    </div>
                </div>
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