import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../../../store/actions/index';

import { Button, Input } from 'reactstrap';

import Upperbar from '../../../../UpperBar/UpperBar';


export class DebateCreate extends Component {
    state = {
        debateTitle: '',
        debateContent: '',
        signIn: ''
    }

    onClickDebateConfirmButton = () => {
        this.props.onCreateDebate(
            this.props.selectedDocument,
            this.state.debateTitle,
            this.state.debateContent,
        );
    }

    onClickDebateCancelButton = () => {
        this.props.history.goBack();
    }

    ngOnInIt = async () => {
        if (this.state.signIn === '') {
            await this.props.onCheckSignIn();
            if (this.props.signIn) {
                this.setState({
                    signIn: true
                })
            } else {
                alert("You must be logged in to create a new debate")
                this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + '/debates');
            }
        } else if (!this.props.signIn) {
            alert("You must be logged in to create a new debate")
            this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + '/debates');
        }
    }

    render() {
        this.ngOnInIt();

        return (
            <div>
                <Upperbar />
                <div className="TopOfPage">
                    <h1>DebateCreate</h1>
                    <Input
                        type="text"
                        id="debate_title_input"
                        placeholder="Debate Title"
                        onChange={(event) => this.setState({ debateTitle: event.target.value })}
                    />
                    <br />
                    <Input
                        type="textarea"
                        id="debate_content_textarea"
                        placeholder="Debate Content"
                        onChange={(event) => this.setState({ debateContent: event.target.value })}
                    />
                    <br />
                    <Button
                        id="debate_confirm_button" disabled={this.state.debateContent === '' || this.state.debateTitle === ''}
                        onClick={this.onClickDebateConfirmButton}>CONFIRM</Button>

                    <Button
                        id="debate_cancel_button"
                        onClick={this.onClickDebateCancelButton}>Cancel</Button>
                </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        signIn: state.usr.signIn
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title)),
        onCreateDebate: (selectedDocument, debateTitle, debateContent) =>
            dispatch(actionCreators.postDebate(selectedDocument, { title: debateTitle, content: debateContent })),
        onCheckSignIn: () =>
            dispatch(actionCreators.checkSignIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateCreate));