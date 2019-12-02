import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../../store/actions/index';

import { Button } from 'reactstrap';

import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';

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
        let markdownHtml = '';



        if (this.props.selectedDocument) {
            title = this.props.selectedDocument.title;
            content = this.props.selectedDocument.content;
            var md = new Remarkable('full', {
                html: true,
                typographer: true,
                highlight: function (str, lang) {
                    return highlightCode(str, lang);
                }
            });
            markdownHtml = md.render(content);
        }
        return (
            <div>
                <Upperbar />
                <div className="DocumentDetail">
                    <br />
                    <br />
                    <h4 className="document">Document:</h4>
                    <div className="content">
                        <br />
                        {/* <h3>TITLE</h3> */}
                        <h1 className="title">{title}</h1>
                        {/* <h3>CONTENT</h3> */}
                        <hr />
                        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
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

export function highlightCode(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (err) { console.log(err) }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (err) { console.log(err) }

    return ''; // use external default escaping
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentDetail));