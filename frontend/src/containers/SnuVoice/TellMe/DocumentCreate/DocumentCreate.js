import React, { Component } from "react";
import classnames from "classnames";

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
  Label,
  Form
} from "reactstrap";
import { MarkdownPreview } from "react-marked-markdown";

import Upperbar from "../../UpperBar/UpperBar";
import "./DocumentCreate.css";

import * as actionCreators from "../../../../store/actions/index";

class DocumentCreate extends Component {
  state = {
    documentTitle: "",
    documentContent: "",
    documentState: "write"
  };

  onClickDocumentConfirmButton = () => {
    this.props.onStoreDocument(
      this.state.documentTitle,
      this.state.documentContent
    );
  };

  onClickDocumentCancelButton = () => {
    // 제안: alert("변경 사항은 저장되지 않습니다..이런거")
    this.props.history.push("/tell_me");
  };

  onClickPhotoButton = () => {
    this.props.history.push("/tell_me/photo");
  };

  onClickTabButton = event => {
    this.setState({ documentState: event });
  };

  render() {
    let createStateTabbuttons = (
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
        <div className="DocumentCreate">
          <br />
          <div className="pageTitle">
            <h1>Document Create</h1>
          </div>
          <Button
            type="button"
            id="photo_button"
            className="photoButton"
            onClick={this.onClickPhotoButton}
          >
            Upload Photo
          </Button>
          <br />
          {createStateTabbuttons}
          <br/>
          <TabContent activeTab={this.state.documentState}>
            <TabPane tabId="write" className="inputTab">
              <Form>
                <FormGroup>
                  <h4>Title</h4>
                  <Input
                    type="text"
                    id="document_title_input"
                    placeholder="title"
                    onChange={event =>
                      this.setState({ documentTitle: event.target.value })
                    }
                  ></Input>
                </FormGroup>
                <br/>
                <FormGroup>
                  <h4>Content</h4>
                  <Input
                    type="textarea"
                    rows="20"
                    id="document_content_textarea"
                    placeholder="content"
                    onChange={event =>
                      this.setState({ documentContent: event.target.value })
                    }
                  ></Input>
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId="preview">
              <div className="preview">
                <div className="document">
                  <br />
                  <h6>Title:</h6>

                  <h1>
                    <div className="title">{this.state.documentTitle}</div>
                  </h1>
                  <br />
                  <h6>Content:</h6>
                  <MarkdownPreview value={this.state.documentContent} />
                </div>
<<<<<<< HEAD
                <Button type="button" id="photo_button" className="photoButton"
                    onClick={this.onClickPhotoButton}>Upload Photo</Button>
                    <br/>
                {createStateTabbuttons}
                <TabContent activeTab={this.state.documentState}>
                    <TabPane tabId="write">
                        <Form>
                            <FormGroup>
                                <h4>Title</h4>
                                <Input type="text" id="document_title_input" placeholder="title"
                                    onChange={(event) => this.setState({ documentTitle: event.target.value })}></Input>
                            </FormGroup>
                            <FormGroup>
                                <h4>Content</h4>
                                <Input type="textarea" rows="20" id="document_content_textarea" placeholder="content"
                                    onChange={(event) => this.setState({ documentContent: event.target.value })}></Input>
                            </FormGroup>
                        </Form>
                    </TabPane>
                    <TabPane tabId="preview">
                        <div className="preview">
                        <div className="document">
<br/>
                        <h3>
                            Title:
                            </h3>

                        <h1>
<div className="title">
                        {this.state.documentTitle}
</div>
                        </h1>
                        <br/>
                        <h4>
                            Content:
                            </h4>
                            <div className="content">
                        <MarkdownPreview value={this.state.documentContent} />
                            </div>
                        </div>
                        </div>
                    </TabPane>
                </TabContent>
                <br/>
                <ButtonGroup>
                    <Button type="button" id="document_confirm_button" disabled={!this.state.documentTitle || !this.state.documentContent}
                        onClick={this.onClickDocumentConfirmButton}>Confirm</Button>
                    <Button type="button" id="document_cancel_button"
                        onClick={this.onClickDocumentCancelButton}>Cancel</Button>
                </ButtonGroup>
            </div>
</div>
        );
    }
=======
              </div>
            </TabPane>
          </TabContent>
          <br />
          <ButtonGroup>
            <Button
              type="button"
              id="document_confirm_button"
              disabled={
                !this.state.documentTitle || !this.state.documentContent
              }
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
          </ButtonGroup>
        </div>
      </div>
    );
  }
>>>>>>> fa9c9bdeaa85c596761ef8ee458a71d5a051f2ca
}

export const mapDispatchToProps = dispatch => {
  return {
    onStoreDocument: (title, content) =>
      dispatch(actionCreators.postDocument({ title: title, content: content }))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(DocumentCreate));
