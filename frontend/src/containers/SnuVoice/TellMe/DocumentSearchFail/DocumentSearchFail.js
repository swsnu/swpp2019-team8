import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';
import SearchBar from '../SearchBar/SearchBar';

import {
    Button
} from 'reactstrap';

export class DocumentSearchFail extends Component {
    state = {

    };

    onClickDetailButton = (event) => {
        this.props.history.push('/tell_me/documents/' + event.target.value)
    }

    componentDidMount = async () => {
        await this.props.getDocument(this.props.match.params.document_title)
        if (this.props.selectedDocument !== null) this.props.history.push('/tell_me/documents/' + this.props.selectedDocument.title)

    }

    render() {

        let titleList = this.props.titleDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Button
                        key={document.id}
                        id="title_list_button"
                        value={document.title}
                        onClick={this.onClickDetailButton}
                    >{document.title}
                    </Button>
                    <br />
                </div>
            )
        })

        let contentList = this.props.contentDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Button
                        key={document.id}
                        id="content_list_button"
                        value={document.title}
                        onClick={this.onClickDetailButton}
                    >{document.title}
                    </Button>
                    <br />
                </div>
            )
        })

        return (
            <div className="DocumentSearchFail">
                <UpperBar />
                <SearchBar />
                <h2>{this.props.match.params.document_title}가 포함된 document 제목</h2>
                {titleList}
                <br />
                <h2>{this.props.match.params.document_title}가 포함된 document 내용</h2>
                {contentList}
            </div>
        )
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getDocument: (document_title) =>
            dispatch(actionCreator.getDocument(document_title))
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        titleDocuments: state.tm.titleDocuments,
        contentDocuments: state.tm.contentDocuments
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DocumentSearchFail));