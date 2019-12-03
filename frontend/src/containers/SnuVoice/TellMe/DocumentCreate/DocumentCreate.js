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
  Form,
  FormText,
} from "reactstrap";
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';

import Upperbar from "../../UpperBar/UpperBar";
import "./DocumentCreate.css";

import * as actionCreators from "../../../../store/actions/index";

class DocumentCreate extends Component {
  state = {
    documentTitle: "",
    documentContent: "",
    documentState: "write",
    formFeedbackMessage: {
      title: "",
    }
  };

  onClickDocumentConfirmButton = async () => {
    let message = this.state.formFeedbackMessage;
    let title = this.state.documentTitle;
    let input = this.state.documentTitle;
    for (var i = title.length - 1; i >= 0; i--) {
      if (title[i] !== ' ') break;
      else input = title.slice(0, i)
    }
    await this.props.onStoreDocument(
      input,
      this.state.documentContent
    );
    if (this.props.documentDuplicate) {
      message.title = "Title already exist.";
    } else {
      message.title = "";
    }

    this.setState({ formFeedbackMessage: message })
  };

  onChangeDocumentTitle = (event) => {
    let message = this.state.formFeedbackMessage;
    if (/[#%?]/.exec(event.target.value)) {
      message.title = "# ? % 는 허용되지 않습니다."
    } else if (/.jpg$/.exec(event.target.value) || /.jpeg$/.exec(event.target.value) || /.bmp$/.exec(event.target.value) || /.png$/.exec(event.target.value)) {
      message.title = "document 제목은 .jpg/.jpeg/.png/.bmp로 끝낼 수 없습니다."
    } else {
      message.title = "";
    }
    this.setState({
      documentTitle: event.target.value,
      formFeedbackMessage: message
    })


  }

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
    let markdownHtml;

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

    if (this.state.documentState === 'preview') {
      var md = new Remarkable('full', {
        html: true,
        typographer: true,
        highlight: function (str, lang) {
          return highlightCode(str, lang);
        }
      });
      markdownHtml = md.render(this.state.documentContent);
    }

    return (
      <div>
        <Upperbar />
        <div className="DocumentCreate">
          <br />

          <h1 className="document_create_title">Create New Document</h1>

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
          <br />
          <TabContent className="document_create_tab" activeTab={this.state.documentState}>
            <TabPane tabId="write" className="inputTab">
              <Form>
                <FormGroup>
                  <h4>Title</h4>
                  <Input
                    type="text"
                    id="document_title_input"
                    placeholder="title"
                    onChange={this.onChangeDocumentTitle}
                  ></Input>
                  <FormText color="danger">
                    {this.state.formFeedbackMessage.title}
                  </FormText>
                </FormGroup>
                <br />
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
                  <h1>
                    <div >{this.state.documentTitle}</div>
                  </h1>
                  <hr />
                  <br />
                  <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
                </div>
              </div>
            </TabPane>
          </TabContent>
          <br />
          <ButtonGroup>
            <Button
              type="button"
              id="document_confirm_button"
              disabled={
                !this.state.documentTitle || !this.state.documentContent || this.state.formFeedbackMessage.title !== ""
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
}

export const mapStateToProps = state => {
  return {
    documentDuplicate: state.tm.documentDuplicate,
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onStoreDocument: (title, content) =>
      dispatch(actionCreators.postDocument({ title: title, content: content }))
  };
};

export function highlightCode(str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (err) { console.log(err) }
  }

  try {
    return hljs.highlightAuto(str).value;
  } catch (err) { console.log(err) }

  return ''; // use external default escaping
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DocumentCreate));
