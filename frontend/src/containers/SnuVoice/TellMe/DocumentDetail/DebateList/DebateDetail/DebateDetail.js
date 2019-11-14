import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../../../store/actions/index';

import { Button, Input } from 'reactstrap';

import DebateComments from '../../../../../../components/Debate/debateComments'

import Upperbar from '../../../../UpperBar/UpperBar';

class DebateDetail extends Component {
    state = {
        comment: '',
    }

    componentDidMount = async () => {
        await this.props.onGetDocument(this.props.match.params.document_title);
        this.props.onGetDebate(this.props.selectedDocument, this.props.match.params.debate_id);
    }

    onClickCommentConfirmButton = () => {
        //TODO
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

        return (
            <div>
                <Upperbar/>
                <div className="TopOfPage">

        <div className="DebateDetail">
            <div>
                <h1>DebateDetail</h1>
            </div>
                <h3>
                {documentTitle}
                </h3>
            <br/>
            <h4 id="debate_title_text">
            {debateTitle}

            </h4>
            <br/>
            {debateContent}
            <br/>
            <Input 
                type="textarea" 
                id="debate_new_comment_textarea"
                placeholder="Enter debate comment"/>
            <Button
                id="debate_comment_confirm_button">CONFIRM</Button>
                </div>
                </div>
        </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        selectedDebate: state.tm.selectedDebate,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
   
        onGetDebate: (selectedDocument, debate_id) =>
            dispatch(actionCreators.getDebate(selectedDocument.title, debate_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateDetail));