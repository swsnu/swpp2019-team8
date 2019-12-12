import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actionCreators from "../../../../store/actions/index";

import { Button } from "reactstrap";

import { Remarkable } from "remarkable";
import hljs from "highlight.js";

import "highlight.js/styles/atom-one-dark.css";

import Upperbar from "../../UpperBar/UpperBar";
import "./DocumentDetail.css";

class DocumentDetail extends Component {
    state = {
        selectedNumber: 1
    }
    componentDidMount = async () => {
        await this.props.onGetDocument(this.props.match.params.document_title);
        await this.props.onGetPetitionList(
            this.props.match.params.document_title
        );
    };

    onClickDocumentCancelButton = () => {
        this.props.history.push("/tell_me");
    };

    onClickDocumentEditButton = () => {
        this.props.history.push(
            "/tell_me/documents/" +
            this.props.match.params.document_title +
            "/edit"
        );
    };

    onClickDocumentDebateButton = () => {
        this.props.history.push(
            "/tell_me/documents/" +
            this.props.match.params.document_title +
            "/debates"
        );
    };

    render() {
        let title = '';
        let content = '';
        let markdownHtml = '';
        let prev = '<';
        let next = '>';
        let petitonList = this.props.petitionList.map((petition, i) => {
            if (i < this.state.selectedNumber * 10 && i >= (this.state.selectedNumber - 1) * 10) {
                return (
                    <div key={petition.id}>
                        <li key={petition.id}>
                            <a href={'/hear_us/petition/' + petition.url} target="_blank" rel="noopener noreferrer">{petition.title}</a>
                        </li>
                        <br />
                    </div>
                )
            } else return undefined;
        });

        let buttons = (
            <div className="petition_buttons">
                <Button
                    type="button"
                    id="prev_button"
                    disabled={this.state.selectedNumber === 1}
                    onClick={() => {
                        this.setState({
                            selectedNumber: this.state.selectedNumber - 1
                        })
                    }}>{prev}</Button>
                <Button
                    type="button"
                    id="next_button"
                    disabled={this.state.selectedNumber * 10 >= this.props.petitionList.length}
                    onClick={() => {
                        this.setState({
                            selectedNumber: this.state.selectedNumber + 1
                        })
                    }}>{next}</Button>
            </div>
        )

        if (this.props.selectedDocument) {
            title = this.props.selectedDocument.title;
            content = this.props.selectedDocument.content;
            var md = new Remarkable("full", {
                html: true,
                typographer: true,
                highlight: function (str, lang) {
                    return highlightCode(str, lang);
                }
            });
            markdownHtml = md.render(content);
        }

        let editButton = this.props.match.params.document_title === "TELL-ME:기본방침" ||
            this.props.match.params.document_title === "TELL-ME:문법 도움말" ?
            null :
            (
                <Button
                    type="button"
                    id="document_edit_button"
                    onClick={this.onClickDocumentEditButton}>
                    Edit
                </Button>
            );

        let debateButton = this.props.match.params.document_title === "TELL-ME:기본방침" ||
            this.props.match.params.document_title === "TELL-ME:문법 도움말" ?
            null :
            (
                <Button
                    className="debateButton"
                    onClick={this.onClickDocumentDebateButton}>
                    Debate
                </Button>
            );

        let relatedPetition = this.props.match.params.document_title === "TELL-ME:기본방침" ||
            this.props.match.params.document_title === "TELL-ME:문법 도움말" ?
            null :
            (
                <div className="related_petition">
                    {petitonList}
                    <br />
                    {buttons}
                </div>
            );

        return (
            <div>
                <Upperbar />
                <div className="DocumentDetail">
                    <div className="document_detail_upperbar">
                        <Button
                            type="button"
                            id="document_cancel_button"
                            className="back_button"
                            onClick={this.onClickDocumentCancelButton}
                        >
                            Back
                        </Button>
                        <h1 className="document_detail_title">{title}</h1>
                        {editButton}
                        {debateButton}
                    </div>
                    <div className="content">
                        <br />
                        <div
                            dangerouslySetInnerHTML={{ __html: markdownHtml }}
                            className="document_content"
                        />
                        <hr />
                        {relatedPetition}
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
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
        onGetPetitionList: document_title =>
            dispatch(actionCreators.getPetitionByDocument(document_title))
    };
};

export function highlightCode(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
        try {
            return hljs.highlight(lang, str).value;
        } catch (err) {
            console.log(err);
        }
    }

    try {
        return hljs.highlightAuto(str).value;
    } catch (err) {
        console.log(err);
    }


    return ""; // use external default escaping
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DocumentDetail));
