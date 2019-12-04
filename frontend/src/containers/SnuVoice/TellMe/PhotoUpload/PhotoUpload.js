import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    Button,
    ButtonGroup,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Label,
    Form,
    FormGroup,
    FormText
} from 'reactstrap';
import { MarkdownPreview } from 'react-marked-markdown';

import Upperbar from '../../UpperBar/UpperBar';

import './PhotoUpload.css';

class PhotoUpload extends Component {
    state = {
        photoTitle: '',
        photoContent: '',
        photoFile: null,
        photoFileName: null,
        photoUrl: null,
        documentState: 'write',
        message: "Upload your Photo",
        googleKey: "AIzaSyCf7H4P1K0Q_y-Eu9kZP9ECo0DsS1PmeMQ",
        canvasWidth: 100,
        canvasHeight: 100,
        blurElements: [],
        titleFormText: '',
        uploadEnd: false,
        _img: null,
    }

    constructor(props) {
        super(props);
        this.refCanvas = React.createRef();
        this.refImg = React.createRef();
    }

    onChangePhotoTitleInput = (event) => {
        let formText;
        if (/[#%?]/.exec(event.target.value)) {
            formText = "# ? % 는 허용되지 않습니다."
        } else {
            if (/.jpg$/.exec(event.target.value) || /.jpeg$/.exec(event.target.value) || /.bmp$/.exec(event.target.value) || /.png$/.exec(event.target.value)) {
                formText = ''
            } else {
                formText = ".jpg/.jpeg/.bmp/.png로 끝나야 합니다."
            }
        }
        this.setState({
            photoTitle: event.target.value,
            titleFormText: formText
        })

    }

    onClickPhotoConfirmButton = () => {
        const canvas = this.refCanvas.current;
        const ctx = canvas.getContext("2d");
        const img = this.state._img;

        ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight); // 시작에 앞서 canvas에 렌더링 된 데이터를 삭제합니다.
        ctx.drawImage(img, 0, 0);

        this.state.blurElements.forEach(function (element, index) {
            if (element.blur === true) {
                let blurAmount = element.width / 10;
                ctx.filter = `blur(${blurAmount}px)`;
                ctx.drawImage(
                    img,
                    element.left + blurAmount / 10,
                    element.top + blurAmount / 10,
                    element.width - blurAmount / 5,
                    element.height - blurAmount / 5,
                    element.left + blurAmount / 10,
                    element.top + blurAmount / 10,
                    element.width - blurAmount / 5,
                    element.height - blurAmount / 5);
                ctx.filter = 'none';
            }
        });

        const this_tmp = this;

        canvas.toBlob(function (blob) {
            const formData = new FormData();
            formData.append('file', blob, this_tmp.state.photoFileName);
            formData.append('title', this_tmp.state.photoTitle);
            formData.append('content', this_tmp.state.photoContent);
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
                });
        });
    }

    onClickPhotoCancelButton = () => {
        this.props.history.goBack();
    }

    onClickContentTabButton = (event) => {
        this.setState({ documentState: event });
    }

    handlePhoto = (event) => {
        event.preventDefault();

        const reader = new FileReader();
        let file = event.target.files[0];
        console.log(file);

        if (file && file.size > 500000) {
            alert("File is too big! (max: 500,000B)");
            return;
        }

        reader.onloadend = () => {
            this.setState({ uploadEnd: false, blurElements: [], photoFile: file, photoFileName: file.name, photoUrl: reader.result });
            const imageData = reader.result.split(",")[1];
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
                const copiedImg = img;
                this.setState({
                    uploadEnd: true,
                    message: "File uploading...",
                    _img: copiedImg,
                });
                this.fileUpload(imageData)
                    .then((result) => {
                        if (result.message) {
                            this.setState({
                                message: result.message,
                            });
                        }
                        console.log('num_faces: ' + result.num_faces);
                        this.drawInCanvas(result.info, result.num_faces, copiedImg);
                    });
            };
        }

        if (file) {
            reader.readAsDataURL(file);
        }
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

    drawInCanvas = async (photoInfo, n, copiedImg) => {
        const canvas = this.refCanvas.current;
        const ctx = canvas.getContext("2d");
        const img = copiedImg;

        ctx.clearRect(0, 0, this.state.canvasWidth, this.state.canvasHeight); // 시작에 앞서 canvas에 렌더링 된 데이터를 삭제합니다.
        ctx.drawImage(img, 0, 0);

        let elemLeft = canvas.offsetLeft;
        let elemTop = canvas.offsetTop;

        const this_tmp = this;

        await canvas.addEventListener('click', function (event) {
            let x = event.pageX - elemLeft;
            let y = event.pageY - elemTop;

            let isBoxClicked = false;

            // Collision detection between clicked offset and element.
            this_tmp.state.blurElements.forEach(function (element, index) {
                if (y > element.top && y < element.top + element.height &&
                    x > element.left && x < element.left + element.width &&
                    element.color === 'red') {
                    element.blur = !element.blur;
                    isBoxClicked = true;
                    console.log(index + 'clicked!');
                }
            });

            console.log(isBoxClicked);

            if (!isBoxClicked) {
                const blurSize = Math.min(this_tmp.state.canvasWidth, this_tmp.state.canvasHeight) / 20;
                this_tmp.setState({
                    blurElements: this_tmp.state.blurElements.concat({
                        color: '',
                        width: blurSize * 2,
                        height: blurSize * 2,
                        left: x - blurSize,
                        top: y - blurSize,
                        blur: true,
                    })
                });
            }

            ctx.clearRect(0, 0, this_tmp.state.canvasWidth, this_tmp.state.canvasHeight); // 시작에 앞서 canvas에 렌더링 된 데이터를 삭제합니다.
            ctx.drawImage(img, 0, 0);

            this_tmp.state.blurElements.forEach(function (element, index) {
                if (element.blur) {
                    let blurAmount = element.width / 10;
                    ctx.filter = `blur(${blurAmount}px)`;
                    ctx.drawImage(
                        img,
                        element.left + blurAmount / 10,
                        element.top + blurAmount / 10,
                        element.width - blurAmount / 5,
                        element.height - blurAmount / 5,
                        element.left + blurAmount / 10,
                        element.top + blurAmount / 10,
                        element.width - blurAmount / 5,
                        element.height - blurAmount / 5);
                    ctx.filter = 'none';
                }
            });

            this_tmp.state.blurElements.forEach(function (element, index) {
                if (element.color === 'red') {
                    ctx.beginPath();
                    ctx.strokeStyle = element.color;
                    ctx.rect(element.left, element.top, element.width, element.height);
                    ctx.stroke();
                }
            });

            console.log(this_tmp.state.blurElements);
        }, false);

        // Add element.
        for (let i = 0; i < n; i++) {
            const { x, y, width, height } = photoInfo[i];
            this.setState({
                blurElements: this.state.blurElements.concat({
                    color: 'red',
                    width: width,
                    height: height,
                    left: x,
                    top: y,
                    blur: false,
                })
            });
        }
        console.log(this.state.canvasWidth);
        console.log(this.state.canvasHeight);
        console.log(this.state.blurElements);

        // Render elements.
        this.state.blurElements.forEach(function (element) {
            for (let i = 0; i < n; i++) {
                ctx.beginPath();
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

        let $imagePreview = (!this.state.photoUrl) ? (<div className="noPhoto">There is no image to preview</div>) :
            (this.state.uploadEnd) ? (<div></div>) :
                (<img ref={this.refImg} src={this.state.photoUrl} onLoad={this.onImgLoad} />);

        let $canvas = (this.state.photoUrl && this.state.uploadEnd) ?
            (<canvas ref={this.refCanvas} width={this.state.canvasWidth} height={this.state.canvasHeight} />) : (<div></div>);

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
                            <Input type="file" id="photo_file_file"
                                onChange={(event) => this.handlePhoto(event)} accept=".jpg,.png,.bmp,.jpeg" />
                        </div>
                        <br />
                        {$imagePreview}
                        {$canvas}
                    </div>
                    <div>
                        {documentStateTabbuttons}
                        <TabContent activeTab={this.state.documentState}>
                            <TabPane tabId="write">
                                <Form>
                                    <FormGroup>
                                        <Label>Title</Label>
                                        <Input type="text" id="photo_title_input" placeholder="title"
                                            onChange={this.onChangePhotoTitleInput}></Input>
                                    </FormGroup>
                                    <FormText color="danger">
                                        {this.state.titleFormText}
                                    </FormText>
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
                                        <h1><div className="photoTitle">{this.state.photoTitle}</div></h1>
                                        <hr />
                                        <MarkdownPreview value={this.state.photoContent} />
                                    </div>
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                    <ButtonGroup>
                        <Button type="button" id="photo_confirm_button" disabled={!this.state.photoTitle || !this.state.photoContent || this.state.titleFormText !== ""}
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
