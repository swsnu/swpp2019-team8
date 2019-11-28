import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../../../../../store/actions/index';

import { Button, Input } from 'reactstrap';

import Upperbar from '../../../../UpperBar/UpperBar';


export class DebateCreate extends Component {
    state={
        debateTitle: '',
        debateContent: '',
    }

    componentDidMount() {
        this.props.onGetDocument(this.props.match.params.document_title);
    }

    onClickDebateConfirmButton = () => {
        this.props.onCreateDebate(
            this.props.selectedDocument,
            this.state.debateTitle,
            this.state.debateContent,
        );
    }

    render() {
        return (
            <div>
                <Upperbar/>
                <div className="TopOfPage">
                    <h1>DebateCreate</h1>
                    <Input 
                        type="text" 
                        id="debate_title_input" 
                        placeholder="Debate Title"
                        onChange = {(event) => this.setState({ debateTitle: event.target.value })}
                        />
                        <br/>
                    <Input
                        type="textarea" 
                        id="debate_content_textarea"
                        placeholder="Debate Content" 
                        onChange={(event) => this.setState({ debateContent: event.target.value })}
                        />
                <br />
                <Button 
                    id="debate_confirm_button"
                    onClick={this.onClickDebateConfirmButton}>CONFIRM</Button>
                
                <Button
                    id="onClickDebateCancelButton">Cancel</Button>
                    </div>
            </div>
        )
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
        onCreateDebate: (selectedDocument, debateTitle, debateContent) =>
            dispatch(actionCreators.postDebate(selectedDocument,{ title: debateTitle, content: debateContent})),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateCreate));