import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Label, Form } from 'reactstrap';


class DocumentCreate extends Component {
    state = {
        documentTitle: '',
        documentContent: '',
        documentState: 'write',
    }

    mdToText = (md) => {
        //Markdown Handling
        return md;
    }

    onClickDocumentConfirmButton = () => {
        //confirm
    }

    onClickDocumentCancelButton = () => {
        //제안: alert("변경 사항은 저장되지 않습니다..이런거")
        this.props.history.push('/tell_me');
    }

    onClickPhotoButton = () => {
        this.props.history.push('/tell_me/photo')
    }

    onClickTabButton = (event) => {
        this.setState({ documentState: event })
    }

    render() {
        let createStateTabbuttons = (
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.documentState === 'write' })}
                        id="write_tab_button" onClick={() => this.onClickTabButton('write')}>
                        Write
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.petitionState === 'preview' })}
                        id="preview_tab_button" onClick={() => this.onClickTabButton('preview')}>
                        Preview
                        </NavLink>
                </NavItem>
            </Nav>
        )
        return (
            <div className="DocumentCreate">
                <h1>Document Create</h1>
                <Button type="button" id="photo_button"
                    onClick={this.onClickPhotoButton}>Upload Photo</Button>
                {createStateTabbuttons}
                <TabContent activeTab={this.state.documentState}>
                    <TabPane tabId='write'>
                        <Form>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" id="document_title_input" placeholder="title"
                                    onChange={(event) => this.setState({ documentTitle: event.target.value })}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Content</Label>
                                <Input type="textarea" id="document_content_textarea" placeholder="content"
                                    onChange={(event) => this.setState({ documentContent: event.target.value })}></Input>
                            </FormGroup>
                        </Form>
                    </TabPane>
                    <TabPane tabId='preview'>
                        <Label>Title</Label>
                        <h1>{this.state.documentTitle}</h1>
                        <Label>Content</Label>
                        <h1>{this.mdToText(this.state.documentContent)}</h1>
                    </TabPane>
                </TabContent>
                <ButtonGroup>
                    <Button type="button" id="document_confirm_button"
                        onClick={this.onClickDocumentConfirmButton}>Confirm</Button>
                    <Button type="button" id="document_cancel_button"
                        onClick={this.onClickDocumentCancelButton}>Cancel</Button>
                </ButtonGroup>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(DocumentCreate));