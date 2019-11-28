import React, { Component } from "react";
import classnames from "classnames";

import DiffMatchPatch, { Diff } from 'diff-match-patch';
// import ReactHtmlParser from 'react-html-parser';

import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Button,
  ButtonGroup,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Form,
  Col,
  Row
} from "reactstrap";
import { MarkdownPreview } from "react-marked-markdown";

import Upperbar from "../../../UpperBar/UpperBar";
import "./DocumentEdit.css";

import * as actionCreators from "../../../../../store/actions/index";

class DocumentEdit extends Component {
    //If prevDoc and newDoc is different, there is conflict
  state = {
    prevDocumentContent: "", //document content when user pressed edit button
    newDocumentContent: "", //document content when user presses edit confirm button
    currDocumentContent: "", //document content that user has edited
    compareDocumentContent: "",
    documentState: "write"
  };

  componentDidMount = async () => {
    await this.props.onGetDocument(this.props.match.params.document_title);
    this.setState({
      newDocumentContent: this.props.selectedDocument.content,
      prevDocumentContent: this.props.selectedDocument.content
    });
  };

  onClickDocumentConfirmButton = async () => {
    await this.setState({
        currDocumentContent: this.props.selectedDocument.content
    });

    if (this.state.prevDocumentContent === this.state.currDocumentContent) {
        this.props.onEditDocument(
        this.props.match.params.document_title,
        this.state.newDocumentContent
        );
    } else {
        alert("Document has been edited already")
    }
  };

  onClickDocumentCancelButton = () => {
    //제안: alert("변경 사항은 저장되지 않습니다..이런거")
    this.props.history.goBack();
  };

  onClickPhotoButton = () => {
    this.props.history.push("/tell_me/photo");
  };

  onClickTabButton = event => {
    this.setState({ documentState: event });
  };

  onClickCompareButton = () => {
      const dmp = new DiffMatchPatch();
      const diff = dmp.diff_main(this.state.prevDocumentContent, this.state.newDocumentContent);
      dmp.diff_cleanupSemantic(diff);
      var ds = dmp.diff_prettyHtml(diff);
      this.setState({ compareDocumentContent: ds});
  }

  render() {
    let content = "";
    if (this.props.selectedDocument) {
      content = this.state.newDocumentContent;
    }

    let editStateTabbuttons = (
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.documentState === "write"
            })}
            id="write_tab_button"
            onClick={() => this.onClickTabButton("write")}
          >
            Write
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: this.state.documentState === "preview"
            })}
            id="preview_tab_button"
            onClick={() => this.onClickTabButton("preview")}
          >
            Preview
          </NavLink>
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Upperbar />
        <div className="DocumentEdit">
          <br />
          <h1 className="pageTitle">Document Edit</h1>
          <Button
            type="button"
            id="photo_button"
            className="photoButton"
            onClick={this.onClickPhotoButton}
          >
            Upload Photo
          </Button>
          <br />
          {editStateTabbuttons}
          <br />
          <TabContent activeTab={this.state.documentState}>
            <TabPane tabId="write" className="inputTab">
              <br />
              <h6>Title:</h6>
              <h1>
                <div className="title">
                  {this.props.match.params.document_title}
                </div>
              </h1>
              <br />
                  <Form>
              <Row>
                <Col>
                    <FormGroup>
                <h4>Current</h4>
                      <Input readOnly
                        type="textarea"
                        rows="20"
                        id="prev_document_content_textarea"
                        placeholder="content"
                        defaultValue={this.state.prevDocumentContent}
                      />
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                      <h4>Edit</h4>
                      <Input
                        type="textarea"
                        rows="20"
                        id="document_content_textarea"
                        placeholder="content"
                        defaultValue={content}
                        onChange={event =>
                          this.setState({ newDocumentContent: event.target.value })
                        }
                      ></Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                <h4>Changed</h4>
                    <div dangerouslySetInnerHTML={{__html: this.state.compareDocumentContent}} />
                     {/* { ReactHtmlParser(this.state.compareDocumentContent) } */}
                    </FormGroup>
                </Col>
              </Row>
                  </Form>
            </TabPane>
            <TabPane tabId="preview">
              <div className="preview">
                <div className="document">
                  <br />
                  <h6>Title:</h6>

                  <h1>
                    <div className="title">
                      {this.props.match.params.document_title}
                    </div>
                  </h1>
                  <br />
                  <h6>Content:</h6>
                  <MarkdownPreview value={this.state.newDocumentContent} />
                </div>
              </div>
            </TabPane>
          </TabContent>
          <ButtonGroup>
            <Button
              type="button"
              id="document_confirm_button"
              disabled={!this.state.newDocumentContent}
              onClick={this.onClickDocumentConfirmButton}
            >
              Confirm
            </Button>
            <Button
              type="button"
              id="document_cancel_button"
              onClick={this.onClickDocumentCancelButton}
            >
              Cancel
            </Button>
            <Button
                onClick={this.onClickCompareButton}
                >
                Compare
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onEditDocument: (target, content) =>
      dispatch(
        actionCreators.putDocument({ target: target, content: content })
      ),
    onGetDocument: document_title =>
      dispatch(actionCreators.getDocument(document_title))
  };
};

export const mapStateToProps = state => {
  return {
    selectedDocument: state.tm.selectedDocument
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DocumentEdit));
