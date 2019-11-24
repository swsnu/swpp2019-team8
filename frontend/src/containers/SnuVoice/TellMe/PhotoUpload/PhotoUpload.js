import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, TabContent, TabPane, Nav, NavItem, NavLink, Label, Form, FormGroup } from 'reactstrap';
import { MarkdownPreview } from 'react-marked-markdown';

import Upperbar from '../../UpperBar/UpperBar';

import './PhotoUpload.css';
import { checkStudentIdDuplicate } from '../../../../store/actions';

class PhotoUpload extends Component {
    state = {
        photoTitle: '',
        photoContent: '',
        photoFile: '',
        photoUrl: '',
        photoState: 'photo',
        documentState: 'write',
        message: "Upload your Photo",
        googleKey: "AIzaSyCf7H4P1K0Q_y-Eu9kZP9ECo0DsS1PmeMQ",
        canvasWidth: 100,
        canvasHeight: 100,
    }

    constructor(props) {
        super(props);
        this.refCanvas = React.createRef();
        this.refImg = React.createRef();
    }

    onClickPhotoConfirmButton = () => {
        // confirm
    }

    onClickPhotoCancelButton = () => {
        this.props.history.push('/tell_me/create');
    }

    onClickPhotoTabButton = (event) => {
        this.setState({ photoState: event });
    }

    onClickContentTabButton = (event) => {
        this.setState({ documentState: event });
    }

    handlePhoto = (event) => {
        event.preventDefault();

        const reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({ photoFile: file, photoUrl: reader.result });
            const imageData = reader.result.split(",")[1];
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                this.setState({
                    message: "File uploading...",
                });
                this.fileUpload(imageData)
                    .then((result) => {
                        if (result.message) {
                            this.setState({
                                message: result.message,
                            });
                        }
                        console.log('num_faces: ' + result.num_faces);
                        this.drawInCanvas(result.info, result.num_faces);
                    });
            };
        }

        reader.readAsDataURL(file);
    }

    fileUpload = (content) => {
        return new Promise((resolve, reject) => {
            const body = {
                requests: [
                    {
                        image: {
                            content,
                        },
                        features: [
                            {
                                type: "FACE_DETECTION",
                            },
                        ],
                    },
                ],
            };
            fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${
                this.state.googleKey
                }`,
                {
                    method: "POST",
                    headers: new Headers({
                        Accept: "application/json",
                    }),
                    body: JSON.stringify(body),
                },
            )
                .then(res => res.json())
                .then(res => resolve(this.getPhotoInfo(res)))
                .catch(() => reject(false));
        });
    };

    getPhotoInfo = (data) => {
        // 얼굴이 인식되지 않은 경우
        if (typeof data.responses[0].faceAnnotations === "undefined") {
            return {
                info: [],
                message: "The face is not recognized.",
                num_faces: 0,
            }
        }

        let info = [];

        for (let i = 0; i < data.responses[0].faceAnnotations.length; i++) {
            let faceDetection = data.responses[0].faceAnnotations[i];
            let topBound;
            let bottomBound;
            let leftBound;
            let rightBound;
            faceDetection.fdBoundingPoly.vertices.forEach((vertice) => {
                if (!topBound || vertice.y < topBound) {
                    topBound = vertice.y;
                }
                if (!bottomBound || vertice.y > bottomBound) {
                    bottomBound = vertice.y;
                }
                if (!leftBound || vertice.x < leftBound) {
                    leftBound = vertice.x;
                }
                if (!rightBound || vertice.x > rightBound) {
                    rightBound = vertice.x;
                }
            });

            info.push({
                x: leftBound,
                y: topBound,
                width: rightBound - leftBound,
                height: bottomBound - topBound,
            });
        }

        return {
            info: info,
            message: "Photo Uploaded",
            num_faces: data.responses[0].faceAnnotations.length,
        };
    };

    drawInCanvas = (photoInfo, n) => {
        const canvas = this.refCanvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.refImg.current;

        ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight); // 시작에 앞서 canvas에 렌더링 된 데이터를 삭제합니다.
        ctx.drawImage(img, 0, 0);

        let elemLeft = canvas.offsetLeft;
        let elemTop = canvas.offsetTop;
        let elements = [];

        canvas.addEventListener('click', function (event) {
            var x = event.pageX - elemLeft,
                y = event.pageY - elemTop;

            // Collision detection between clicked offset and element.
            elements.forEach(function (element, index) {
                if (y > element.top && y < element.top + element.height
                    && x > element.left && x < element.left + element.width) {
                    element.blur = !element.blur;
                    if (element.blur === true) {
                        ctx.filter = 'blur(4px)';
                        ctx.drawImage(img, element.left, element.top, element.width, element.height, element.left, element.top, element.width, element.height);
                        ctx.filter = 'none';
                        ctx.beginPath();
                        ctx.lineWidth = "6";
                        ctx.strokeStyle = element.color;
                        ctx.rect(element.left, element.top, element.width, element.height);
                        ctx.stroke();
                    }
                    else if (element.blur === false) {
                        ctx.filter = 'none';
                        ctx.drawImage(img, element.left, element.top, element.width, element.height, element.left, element.top, element.width, element.height);
                        ctx.beginPath();
                        ctx.lineWidth = "6";
                        ctx.strokeStyle = element.color;
                        ctx.rect(element.left, element.top, element.width, element.height);
                        ctx.stroke();
                    }
                }
            });
        }, false);

        // Add element.
        for (let i = 0; i < n; i++) {
            const { x, y, width, height } = photoInfo[i];
            elements.push({
                color: 'red',
                width: width,
                height: height,
                left: x,
                top: y,
                blur: false,
            });
        }

        // Render elements.
        elements.forEach(function (element) {
            for (let i = 0; i < n; i++) {
                ctx.beginPath();
                ctx.lineWidth = "6";
                ctx.strokeStyle = element.color;
                ctx.rect(element.left, element.top, element.width, element.height);
                ctx.stroke();
            }
        });
    };

    onImgLoad = ({ target: img }) => {
        this.setState({
            canvasWidth: img.offsetWidth,
            canvasHeight: img.offsetHeight,
        });
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

        let $imagePreview = (this.state.photoUrl) ? (<img ref={this.refImg} src={this.state.photoUrl} onLoad={this.onImgLoad} />) :
            (<div className="noPhoto">There is no image to preview</div>);

        return (
            <div>
                <Upperbar />
                <div className="PhotoUpload">
                    <br />
                    <h1>Photo Upload</h1>
                    <br />
                    <div>
                        <p>{this.state.message}</p>
                        <div className="FileUpload">
                            <Input type="file" name="photo_file_file"
                                onChange={(event) => this.handlePhoto(event)} accept=".jpg,.png,.bmp,.jpeg" />
                        </div>
                        <br />
                        {photoStateTabbuttons}
                        <TabContent activeTab={this.state.photoState}>
                            <TabPane tabId="photo">
                                <canvas ref={this.refCanvas} width={this.state.canvasWidth} height={this.state.canvasHeight} />
                                {$imagePreview}
                            </TabPane>
                            <TabPane tabId="preview">
                                <b>*Photo with selected blur applied will appear here*</b>
                            </TabPane>
                        </TabContent>
                    </div>
                    <div>
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
                                        <br />
                                        <Label>Title:</Label>
                                        <h1><div className="photoTitle">{this.state.photoTitle}</div></h1>
                                        <Label>Content:</Label>
                                        <MarkdownPreview value={this.state.photoContent} />
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                    <ButtonGroup>
                        <Button type="button" id="photo_confirm_button" disabled={!this.state.photoTitle || !this.state.photoContent}
                            onClick={this.onClickPhotoConfirmButton}>Confirm</Button>
                        <Button type="button" id="photo_cancel_button"
                            onClick={this.onClickPhotoCancelButton}>Cancel</Button>
                    </ButtonGroup>

                </div>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(PhotoUpload));