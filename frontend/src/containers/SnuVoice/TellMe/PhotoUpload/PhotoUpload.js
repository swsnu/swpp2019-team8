import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, Label, Form, FormGroup } from 'reactstrap';
import { MarkdownPreview } from 'react-marked-markdown';

import Upperbar from '../../UpperBar/UpperBar';

import './PhotoUpload.css';

class PhotoUpload extends Component {
    state = {
        photoTitle: '',
        photoContent: '',
        photoFile: null,
        photoUrl: null,
        photoState: 'photo',
        documentState: 'write'
    }

    onClickPhotoConfirmButton = () => {
        const formData = new FormData();
        formData.append('file', this.state.photoFile, this.state.photoFile.name);
        formData.append('title', this.state.photoTitle);
        formData.append('content', this.state.photoContent);
        axios.post(
            '/api/tellme/photo/',
            formData,
            {
                headers: { 'content-type': 'multipart/form-data' }
            })
            .then(() => {
                console.log("hurray");
            })
            .catch(e => {
                console.log(e);
            })
        //url 전송
    }

    onClickPhotoCancelButton = () => {
        this.props.history.goBack();
    }

    onClickPhotoTabButton = (event) => {
        this.setState({ photoState: event });
    }

    onClickContentTabButton = (event) => {
        this.setState({ documentState: event });
    }

    handlePhoto = (event) => {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({ photoFile: file, photoUrl: reader.result });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let photoStateTabbuttons = (
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.photoState === 'photo' })}
                        id="edit_photo_tab_button" onClick={() => this.onClickPhotoTabButton('photo')}>
                        Photo
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.photoState === 'preview' })}
                        id="preview_photo_tab_button" onClick={() => this.onClickPhotoTabButton('preview')}>
                        Preview
                        </NavLink>
                </NavItem>
            </Nav>
        );
        let documentStateTabbuttons = (
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.documentState === 'write' })}
                        id="edit_content_tab_button" onClick={() => this.onClickContentTabButton('write')}>
                        Write
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.documentState === 'preview' })}
                        id="preview_content_tab_button" onClick={() => this.onClickContentTabButton('preview')}>
                        Preview
                        </NavLink>
                </NavItem>
            </Nav>
        );

        let $imagePreview = (this.state.photoUrl) ? (<img src={this.state.photoUrl} />) :
            (<div className="noPhoto">There is no image to preview</div>);

        return (
            <div>
                <Upperbar/>
            <div className="PhotoUpload">
                <br/>
                <h1>Photo Upload</h1>
                <br/>
                    <div className="FileUpload">
                        <Input type="file" name="photo_file_file" onChange={(event) => this.handlePhoto(event)} />
                    </div>
                    <br/>
                    {photoStateTabbuttons}
                    <TabContent activeTab={this.state.photoState}>
                        <TabPane tabId="photo">
                            {$imagePreview}
                        </TabPane>
                        <TabPane tabId="preview">
                            <b>*Photo with selected blur applied will appear here*</b>
                        </TabPane>
                    </TabContent>
                    {documentStateTabbuttons}
                    <TabContent activeTab={this.state.documentState}>
                        <TabPane tabId="write">
                            <Form>
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input type="text" id="photo_title_input" placeholder="title"
                                        onChange={(event) => this.setState({ photoTitle: event.target.value })}></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label>Content</Label>
                                    <Input type="textarea" rows="10" id="photo_content_textarea" placeholder="content"
                                        onChange={(event) => this.setState({ photoContent: event.target.value })}></Input>
                                </FormGroup>
                            </Form>
                        </TabPane>
                        <TabPane tabId="preview">
                            <div className="preview">
                            <div className="photoInfo">
<br/>
                            <Label>Title:</Label>
                            <h1><div className="photoTitle">{this.state.photoTitle}</div></h1>
                            <Label>Content:</Label>
                            <MarkdownPreview value={this.state.photoContent} />
                            </div>
                            </div>
                        </TabPane>
                    </TabContent>
                    <ButtonGroup>
                        <Button type="button" id="document_confirm_button" disabled={!this.state.photoTitle || !this.state.photoContent}
                            onClick={this.onClickPhotoConfirmButton}>Confirm</Button>
                        <Button type="button" id="document_cancel_button"
                            onClick={this.onClickPhotoCancelButton}>Cancel</Button>
                    </ButtonGroup>

                            </div>
            </div>
        )
    }
}


export default connect(null, null)(withRouter(PhotoUpload));