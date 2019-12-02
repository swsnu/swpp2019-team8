import React, { Component } from 'react';

import * as actionCreators from '../../../../../store/actions/index';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import Debate from '../../../../../components/Debate/debateList';
import Upperbar from '../../../UpperBar/UpperBar';

export class DebateList extends Component {
    componentDidMount() {
        this.props.onGetDocument(this.props.match.params.document_title);
        this.props.onGetDebates(this.props.match.params.document_title);
    }

    onClickDebateTitleButton = (event) => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/" + event.target.value);
    }

    onClickNewDebateButton = async () => {
        await this.props.onCheckSignIn();
        if (this.props.signIn) {
            this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/create");
        } else {
            alert("You must be logged in to create a new debate")
        }
    }


    render() {
        let documentTitle = '';
        if (this.props.selectedDocument) {
            documentTitle = this.props.selectedDocument.title;
        }

        let debateList;

        debateList = (
            this.props.debates.map(debate => {
                return <Debate
                key = {debate.id}
                id = {debate.id}
                author = {debate.author}
                title = {debate.title}
                onClick = {this.onClickDebateTitleButton}
                />
            })
        );

        return (
            <div>
            <Upperbar />
            <div className="TopOfPage">

                <div className="DebateList">
                    <h1>Debate List</h1>
                    <h3 id="document_title_text">{documentTitle}</h3>
                    {debateList}
                </div>
                <Button 
                    onClick={this.onClickNewDebateButton}
                    id="new_debate_button">NEW</Button>
            </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        debates: state.tm.debates,
        signIn: state.usr.signIn,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: (document_title) =>
            dispatch(actionCreators.getDocument(document_title)),
   
        onGetDebates: (document_title) =>
            dispatch(actionCreators.getDebates(document_title)),

        onCheckSignIn: () =>
            dispatch(actionCreators.checkSignIn())  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateList));