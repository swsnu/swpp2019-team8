import React, { Component } from 'react';

import * as actionCreators from '../../../../../store/actions/index';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

import Debate from '../../../../../components/Debate/debate';
import Upperbar from '../../../UpperBar/UpperBar';

class DebateList extends Component {
    state = {
        storedDebates : [],
    }

    componentDidMount() {
        this.props.onGetDebates(this.props.match.params.document_title);
    }

    onClickDetailButton = (event) => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/" + this.props.match.params.debate.id);
    }

    onClickCreateButton = (event) => {
        this.props.history.push("/tell_me/documents/" + this.props.match.params.document_title + "/debates/create");
    }


    render() {
        let documentTitle = '';
        if (this.props.selectedDocument) {
            documentTitle = this.props.selectedDocument.title;
        }

        // let debateList;

        // debateList = (
        //     this.props.storedDebates.map(debate => {
        //         return <Debate
        //         key = {debate.id}
        //         id = {debate.id}
        //         debate = {debate}
        //         document = {debate.document}
        //         author = {debate.author}
        //         title = {debate.title}
        //         content = {debate.content}
        //         />
        //     })
        // );

        return (
            <div>
            <Upperbar />
            <div className="TopOfPage">

                <div className="DebateList">
                    <h1>Debate List</h1>
                    <h3>{documentTitle}</h3>
                    {/* {debateList} */}
                </div>
                <Button onClick={this.onClickCreateButton}>NEW</Button>
            </div>
            </div>
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        storedDebates: state.tm.storedDebates,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetDebates: (document_title) =>
            dispatch(actionCreators.getDebates(document_title)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DebateList));