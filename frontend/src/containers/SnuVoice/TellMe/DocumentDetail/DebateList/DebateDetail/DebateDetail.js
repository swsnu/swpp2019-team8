import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../../../store/actions/index';

import { Button, Input } from 'reactstrap';

import DebateComments from '../../../../../../components/Debate/debateComments'

import Upperbar from '../../../../UpperBar/UpperBar';
import './DebateDetail.css';

export class DebateDetail extends Component {
    state = {
        comment: '',
    }

    componentDidMount = async () => {
        await this.props.onGetDocument(this.props.match.params.document_title);
        await this.props.onGetDebateComments(this.props.match.params.debate_id);
        await this.props.onGetDebate(this.props.selectedDocument, this.props.match.params.debate_id);
    }

    onClickCommentConfirmButton = async () => {
        await this.props.onPostDebateComment(
            this.state.comment,
            this.props.match.params.debate_id
        );
        this.setState({ comment: '' })
        await this.props.onGetDebateComments(this.props.match.params.debate_id);
    }

    onClickDebateCancelButton = () => {
        this.props.history.push('/tell_me/documents/' + this.props.selectedDocument.title + '/debates');
    }

    render() {
        let documentTitle = '';
        let debateTitle = '';
        let debateContent = '';

        if (this.props.selectedDocument) {
            documentTitle = this.props.selectedDocument.title;
        }

        if (this.props.selectedDebate) {
            debateTitle = this.props.selectedDebate.title;
            debateContent = this.props.selectedDebate.content;
        }

        let debateCommentList = [];
        debateCommentList = (
            this.props.debateComments.map(comment => {
                if (comment.author === this.props.selectedUser.nickname) {
                    return (
                        <div className="mine">
                            <DebateComments
                                key={comment.id}
                                id={comment.id}
                                comment={comment.comment}
                                author={comment.author}
                                date={comment.date}
                            />
                        </div>

                    )

                } else {
                    return (
                        
                        <div className="others">
                            <DebateComments
                                key={comment.id}
                                id={comment.id}
                                date={comment.date}
                                comment={comment.comment}
                                author={comment.author}
                            />
                        </div>
                    )
                        

                }
            })
        );

        return (
            <div>
                <Upperbar /><br />
                <div className="DebateDetail">
                    <h3 className="documentTitle">
                        {documentTitle} (Debate)
                        </h3>
                    <br />
                    <h4 id="debate_title_text">
                        {debateTitle}

                    </h4>
                    <br />
                    <div className="debateContent">
                        {debateContent}
                    </div>
                    <br /><br />
                    <div className="debateCommentList">

                        {debateCommentList}
                    </div>

                    <Input
                        type="textarea"
                        id="debate_new_comment_textarea"
                        placeholder="Enter debate comment"
                        value={this.state.comment}
                        onChange={(event) => this.setState({ comment: event.target.value })} />
                    <br />
                    <Button
                        id="debate_comment_confirm_button" disabled={this.state.comment === ''}
                        onClick={this.onClickCommentConfirmButton}>CONFIRM</Button>
                    <Button
                        type="button"
                        id="debate_cancel_button"
                        onClick={this.onClickDebateCancelButton}
                    >
                        Back
                        </Button>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        selectedDebate: state.tm.selectedDebate,
        debateComments: state.tm.debateComments,
        selectedUser: state.usr.selectedUser
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),

        onGetDebate: (selectedDocument, debate_id) =>
            dispatch(actionCreators.getDebate(selectedDocument.title, debate_id)),

        onGetDebateComments: (debate_id) =>
            dispatch(actionCreators.getDebateComments(debate_id)),

        onPostDebateComment: (comment, debate_id) =>
            dispatch(actionCreators.postDebateComment({ comment: comment, debate: debate_id }, debate_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateDetail));