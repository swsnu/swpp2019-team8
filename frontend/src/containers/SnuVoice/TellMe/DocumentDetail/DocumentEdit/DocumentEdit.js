import React, { Component } from "react";
import classnames from "classnames";

import DiffMatchPatch, { Diff } from "diff-match-patch";
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
    Row,
    Card,
} from "reactstrap";


import { Remarkable } from 'remarkable';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.css';


import Upperbar from "../../../UpperBar/UpperBar";
import "./DocumentEdit.css";

import * as actionCreators from "../../../../../store/actions/index";

class DocumentEdit extends Component {
    //If prevDoc and newDoc is different, there is conflict
    state = {
        prevDocumentContent: "", //document content currently on database
        newDocumentContent: "", //document content user is editing
        documentState: "write"
    };

    componentDidMount = async () => {
        await this.props.onGetDocument(this.props.match.params.document_title);
        // if(this.props.documentConflict) {
          this.setState({
              newDocumentContent: this.props.selectedDocument.content,
              prevDocumentContent: this.props.selectedDocument.content,
          });
      //     });
      //   } else {
      //   this.setState({
      //       newDocumentContent: this.props.selectedDocument.content,
      //       prevDocumentContent: this.props.selectedDocument.content
      //   });
      // }
    };

    onClickDocumentConfirmButton = async () => {
        await this.props.onEditDocument(
            this.props.match.params.document_title,
            this.state.newDocumentContent,
            this.props.selectedDocument.version
        );

        if (this.props.documentConflict) {
            alert("The document has been edited by someone else");
            await this.props.onGetDocument(this.props.match.params.document_title);
            await this.setState({ prevDocumentContent: this.props.selectedDocument.content });
            // this.props.history.push(window.location.reload(false));
        } else {
            this.props.history.push(
                "/tell_me/documents/" + this.props.selectedDocument.title
            );
        }
        console.log(this.props.documentConflict);
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

    onCompareTexts = (a, b) => {
        const dmp = new DiffMatchPatch();
        const diff = dmp.diff_main(a, b);
        dmp.diff_cleanupSemantic(diff);
        var ds = dmp.diff_prettyHtml(diff);
        return ds;
      };

    render() {
        let current ="";
        let content = '';
        let markdownHtml = '';
        if (this.props.selectedDocument) {
            content = this.state.newDocumentContent;
            current = this.onCompareTexts(this.props.selectedDocument.content, content)
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


        if (this.state.documentState === 'preview') {
            var md = new Remarkable('full', {
                html: true,
                typographer: true,
                highlight: function (str, lang) {
                    return highlightCode(str, lang);
                }
            });
            markdownHtml = md.render(content);
        }

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
                                            <h4>Current</h4>
                                        <Card>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: current
                                                }}
                                            />
                                        </Card>
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
                                                    this.setState({
                                                        newDocumentContent:
                                                            event.target.value
                                                    })
                                                }
                                            ></Input>
                                        </FormGroup>
                                    </Col>
                                    {/* <Col>
                                        <FormGroup>
                                            <h4>Changed</h4>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: this.state
                                                        .compareDocumentContent
                                                }}
                                            />
                                             { ReactHtmlParser(this.state.compareDocumentContent) } 
                                        </FormGroup>
                                    </Col> */}
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
                                            {
                                                this.props.match.params
                                                    .document_title
                                            }
                                        </div>
                                    </h1>
                                    <br />
                                    <h6>Content:</h6>
                                    <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
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
                    </ButtonGroup>
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onEditDocument: (target, content, version) =>
            dispatch(
                actionCreators.putDocument({
                    target: target,
                    content: content,
                    version: version
                })
            ),
        onGetDocument: document_title =>
            dispatch(actionCreators.getDocument(document_title))
    };
};

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        documentConflict: state.tm.documentConflict
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DocumentEdit));
