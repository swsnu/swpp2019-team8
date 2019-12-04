import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as actionCreator from "../../../../store/actions/index";

import { Button } from "reactstrap";

import UpperBar from "../../UpperBar/UpperBar";
import "./DocumentSearchFail.css";

export class DocumentSearchFail extends Component {
    componentDidMount = async () => {
        await this.props.getDocument(this.props.match.params.document_title);
        if (this.props.selectedDocument !== null)
            this.props.history.push(
                "/tell_me/documents/" + this.props.selectedDocument.title
            );
    };

    onClickCreateButton = () => {
        this.props.history.push("/tell_me/create");
    };

    onClickPhotoButton = () => {
        this.props.history.push("/tell_me/photo");
    };

    render() {
        let titleList = this.props.titleDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Link exact to={"/tell_me/documents/" + document.title}>
                        {document.title}
                    </Link>
                    <br />
                </div>
            );
        });

        let contentList = this.props.contentDocuments.map(document => {
            return (
                <div key={document.id}>
                    <Link exact to={"/tell_me/documents/" + document.title}>
                        {" "}
                        {document.title}
                    </Link>
                    <br />
                </div>
            );
        });

        return (
            <div className="DocumentSearchFail">
                <UpperBar />
                <div className="DocumentSearchFail_content_border">
                    <div className="DocumentSearchFail_content">
                        <h3>
                            "{this.props.match.params.document_title}"가(이)
                            포함된 document 제목:
                        </h3>
                        {titleList}
                        <br />
                        <h3>
                            "{this.props.match.params.document_title}"가(이)
                            포함된 document 내용:
                        </h3>
                        {contentList}
                        <br />
                        Can't find the document you're looking for? Create a new
                        document here!
                        <br />
                        <Button
                            className="CreateButton_sf"
                            type="button"
                            id="create_button"
                            onClick={this.onClickCreateButton}
                        >
                            Create
                        </Button>
                        <br />
                        <br />
                        Can't find the photo you're looking for? Upload a photo
                        here!
                        <br />
                        <Button
                            type="button"
                            id="photo_button"
                            className="photoButton_sf"
                            onClick={this.onClickPhotoButton}
                        >
                            Upload Photo
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getDocument: document_title =>
            dispatch(actionCreator.getDocument(document_title))
    };
};

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        titleDocuments: state.tm.titleDocuments,
        contentDocuments: state.tm.contentDocuments
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(DocumentSearchFail));
