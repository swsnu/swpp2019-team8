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
    componentDidMount = async () => {
        await this.props.onGetDocument(this.props.match.params.document_title);
        await this.props.onGetPetitionList(this.props.match.params.document_title);
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
        let petitonList = this.props.petitionList.map(petition => {
            return (
                <div key={petition.id}>
                    <li key={petition.id}>
                        <a href={'www.snuvoice.site/hear_us/petition/' + petition.url} target="_blank" rel="noopener noreferrer">{petition.title}</a>
                    </li>
                    <br />
                </div>

            )

        });




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
                <br /><br />
                <div className="Document_detail_upperbar">
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
                    <h1 className="document_detail_title">{title}</h1>  
                    </div>         
                    <br />
                    <div className="content">
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
                        <hr />
                        {petitonList}
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        petitionList: state.hu.petition_list_by_document
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
        onGetPetitionList: document_title =>
            dispatch(actionCreators.getPetitionByDocument(document_title))
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