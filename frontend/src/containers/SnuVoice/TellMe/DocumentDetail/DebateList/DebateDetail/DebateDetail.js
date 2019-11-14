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


    componentDidMount() {
        this.props.onGetDebate(this.props.selectedDocument, this.props.selectedDebate.id);
    }


    render() {
        let debateTitle = '';
        let debateContent = '';

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
            {debateTitle}
            <br/>
            {debateContent}
            <br/>
            <Input 
                type="textarea" 
                id="debate_content_textarea"
                placeholder="Enter debate comment"/>
            <Button>CONFIRM</Button>
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
        onGetDebate: (selectedDocument, debate_id) =>
            dispatch(actionCreators.getDebate(selectedDocument.title, debate_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateDetail));