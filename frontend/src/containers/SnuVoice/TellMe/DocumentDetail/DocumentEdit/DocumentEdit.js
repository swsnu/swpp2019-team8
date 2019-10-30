import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, FormGroup, Label, Form } from 'reactstrap';
import { MarkdownPreview } from 'react-marked-markdown';

class DocumentEdit extends Component {
    state = {
        documentTitle: '',
        documentContent: '',
        documentState: 'write',
    }


    onClickDocumentConfirmButton = () => {
        //confirm
    }

    onClickDocumentCancelButton = () => {
        //제안: alert("변경 사항은 저장되지 않습니다..이런거")
        this.props.history.push('/tell_me/' + this.props.history.params.id);
    }

    onClickPhotoButton = () => {
        this.props.history.push('/tell_me/photo')
    }

    onClickTabButton = (event) => {
        this.setState({ documentState: event })
    }

    render() {
        let editStateTabbuttons = (
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
            <div className="DocumentEdit">
                <h1>DocumentEdit</h1>
                <Button type="button" id="photo_button"
                    onClick={this.onClickPhotoButton}>Upload Photo</Button>
                {editStateTabbuttons}
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
                        <MarkdownPreview value={ this.state.documentContent}/>
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

export default connect(null, null)(withRouter(DocumentEdit));