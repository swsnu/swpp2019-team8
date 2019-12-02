import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';
import SearchBar from '../SearchBar/SearchBar';

export class DocumentSearchFail extends Component {

    componentDidMount = async () => {
        await this.props.getDocument(this.props.match.params.document_title)
        if (this.props.selectedDocument !== null) this.props.history.push('/tell_me/documents/' + this.props.selectedDocument.title)

    }

    render() {

        let titleList = this.props.titleDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Link
                        exact to={'/tell_me/documents/' + document.title}
                    >{document.title}</Link>
                    <br />
                </div>
            )
        })

        let contentList = this.props.contentDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Link
                        exact to={'/tell_me/documents/' + document.title}
                    > {document.title}</Link>
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