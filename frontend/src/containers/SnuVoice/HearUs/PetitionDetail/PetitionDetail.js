import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ShareLink from 'react-facebook-share-link'

import { Row, Col, Button, ButtonGroup } from 'reactstrap';

import * as actionCreators from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';
import './PetitionDetail.css';

class PetitionDetail extends Component {
    state = {
        isSelected: false,
        comment: '',
        listNumber: [1, 2, 3, 4, 5],
        selectedNumber: 1,
    }

    componentDidMount = async () => {
        await this.props.onGetPetition(this.props.match.params.petition_url);
        await this.props.onGetPetitionComments(this.props.match.params.petition_url);

        window.Kakao.init('41c0076be4855dfb7bac65638652b1f9');
        window.Kakao.Link.createDefaultButton({
            container: '#kakao-link-btn',
            objectType: 'feed',
            content: {
                title: this.props.selectedPetition.title,
                description: '서울대학교 청원',
                imageUrl: 'https://user-images.githubusercontent.com/26313346/70518116-22fba300-1b7d-11ea-9e10-a4a41437fd09.png',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href,
                }
            },
            social: {
                likeCount: this.props.selectedPetition.votes,
            },
            buttons: [
                {
                    title: '자세히 보기',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                    }
                },
            ]
        });
    }

    onClickCommentConfirmButton = async () => {
        await this.props.onStorePetitionComment(this.props.match.params.petition_url, this.state.comment);
        await this.props.onPetitionVote(this.props.match.params.petition_url);
        window.location.reload(false);
    }

    onClickPetitionCancelButton = () => {
        this.props.history.push('/hear_us');
    }

    onClickDownloadCsvButton = () => {
        this.props.onGetCsvFile(this.props.match.params.petition_url);
    }

    onClickListPrevButton = () => {
        const numbers = this.state.listNumber.map(listNumber => listNumber - 5);
        if (numbers[0] > 0) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] });
        }
    }

    onClickListNumberButton = (event) => {
        this.setState({ selectedNumber: event.target.value })
    }

    onClickListNextButton = () => {
        const numbers = this.state.listNumber.map(listNumber => listNumber + 5);
        if (this.props.storedPetitionComments && this.props.storedPetitionComments.length / 10 + 1 >= numbers[0]) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] });
        }
    }

    onClickCopyURL = () => {
        const obShareUrl = document.getElementById("ShareUrl");
        obShareUrl.select();
        document.execCommand("Copy");
        alert("URL이 클립보드에 복사되었습니다");
    }

    render() {
        let title = '';
        let content = '';
        let votes = '';
        let status = '';
        let category = '';
        let start_date = '';
        let end_date = '';
        let link = [''];

        if (this.props.selectedPetition) {
            title = this.props.selectedPetition.title;
            content = this.props.selectedPetition.content;
            votes = this.props.selectedPetition.votes;
            category = this.props.selectedPetition.category;
            status = this.props.selectedPetition.status;
            start_date = this.props.selectedPetition.start_date.substring(0, 10);
            end_date = this.props.selectedPetition.end_date.substring(0, 10);
            link = this.props.selectedPetition.link.split(' ');
            link = link.slice(0, link.length - 1);
        }

        const links = link.map(url => {
            return (
                <li key="">
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </li>
            );
        });

        let comments = [];
        if (this.props.storedPetitionComments) {
            comments = this.props.storedPetitionComments.map((com, i) => {
                let date = null;
                let time = null;
                if (typeof com.date === 'string') {
                    date = com.date.substring(0, 10);
                    time = com.date.substring(11, 16);
                }
                if (i < this.state.selectedNumber * 10 && i >= (this.state.selectedNumber - 1) * 10) {
                    return (
                        <div key={com.id} className="Reply_Reply_list">
                            <div className="Reply_Reply_contents">
                                <div className="pv3_R_contents_head">
                                    <h6>{date + ' ' + time}</h6>
                                </div>
                                <div className="R_R_contents_txt">
                                    <h6>{com.comment}</h6>
                                </div>
                                <hr />
                            </div>
                        </div>
                    );
                }
                return [];
            });
        }

        let listNumbers = this.state.listNumber.map((number, i) => {
            if (this.props.storedPetitionComments && this.props.storedPetitionComments.length / 10 + 1 >= number) {
                return (
                    <Button type="button" id="list_number_buttons" key={i} value={number}
                        onClick={this.onClickListNumberButton}>{number}</Button>
                );
            }
            return null;
        });

        let listNumberButtons = (
            <div className="list_numbering_button">
                <ButtonGroup>
                    <Button type="button" id="list_prev_button" disabled={this.state.listNumber[0] === 1}
                        onClick={this.onClickListPrevButton}>prev</Button>
                    {listNumbers}
                    <Button type="button" id="list_next_button" disabled={this.props.storedPetitionComments && this.state.listNumber[0] + 5 > this.props.storedPetitionComments.length / 10 + 1}
                        onClick={this.onClickListNextButton}>next</Button>
                </ButtonGroup>
            </div>
        );

        let graphSrc = "https://www.snuvoice.site/tellme/media/graph/ex";//local : http://localhost:8000/api/tellme ...
        if (this.props.selectedPetition) {
            if (this.props.selectedPetition.status === 'ongoing' || this.props.selectedPetition.status === 'end')
                graphSrc = "https://www.snuvoice.site/tellme/media/graph/" + this.props.selectedPetition.id;
        }

        return (
            <div>
                <UpperBar />
                <div className="PetitionDetail">
                    <br /><br />
                    <Button type="button" id="petition_cancel_button"
                        onClick={this.onClickPetitionCancelButton}>BACK</Button>
                    <br /><br />
                    <div className="content">
                        <b><br />
                            <p className="petitionStatus_count">- {status} -</p>
                            <h2 className="petitionsView_title"><b>{title}</b></h2>
                            <br />
                            <p className="petitionsView_count">Votes: [ {votes} ]</p>
                            <div className="petitionsView_info">
                                <Row className="petitionsView_info_list">
                                    <Col>
                                        <div className="petitionsView_category">Category: {category}</div>
                                    </Col>
                                    <Col>
                                        <div className="petitionsView_start_date">Start: {start_date}</div>
                                    </Col>
                                    <Col>
                                        <div className="petitionsView_end_date">End: {end_date}</div>
                                    </Col>
                                </Row>
                            </div>
                        </b>
                        <br />
                        <hr />
                        <div className="petitionsView_write">
                            <h6 className="petitionsView_writeHead">Petition Description:</h6>
                            <div className="View_write">{content}</div>
                            <br />
                            <h6 className="View_write_link">Attached links: </h6>
                            {links}
                            <input type="text" id="ShareUrl" value={window.location.href} />
                            <Button onClick={this.onClickCopyURL}>URL 복사</Button>
                            <div id="kakao-link-btn">
                                <img src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_small.png" alt="Share on Kakao Talk" />
                            </div>
                            <ShareLink link={window.location.href}>
                                {_link => (
                                    <a href={_link} target='_blank' rel="noopener noreferrer">
                                        <img src="https://user-images.githubusercontent.com/26313346/70497186-ac977a80-1b55-11ea-98d3-c45f7705b1eb.png" width="32" alt="Share on Facebook" />
                                    </a>
                                )}
                            </ShareLink>
                        </div>
                        <hr />
                        <div className="petitionsView_statistic">
                            <h4>&#60;Graphs&#62;</h4>
                            <br /><br />
                            <Row>
                                <img className="imgs" src={graphSrc + "/trend.jpg"} alt="Graph: Trend" />
                                <img className="imgs" src={graphSrc + "/gender.jpg"} alt="Graph: Gender" />
                            </Row>
                            <Row>
                                <img className="imgs" src={graphSrc + "/department.jpg"} alt="Graph: Department" />
                                <img className="imgs" src={graphSrc + "/studentId.jpg"} alt="Graph: Student ID" />
                            </Row>
                            <h6 className="Ex_alert_message" hidden={status === 'ongoing'}>These graphs are examples, you can see this petition&apos;s graphs when this petition&apos;s state becomes ongoing.</h6>
                            <div className="download_csv_buttn" hidden={status !== 'ongoing'}>
                                <Button id="download_csv_button"
                                    onClick={this.onClickDownloadCsvButton}>Download .csv file</Button>
                            </div>
                            <br /><br />
                        </div>
                    </div>

                    <h3 className="Reply_area_agree"><span className="pet_det_votes">{votes}</span> Current Votes</h3>


                    <div className="Reply_area_write">
                        <textarea id="tw_contents" placeholder="Write your comment within 50 characters."
                            onChange={(event) => this.setState({ comment: event.target.value })}></textarea>
                        <Button type="button" id="comment_confirm_button"
                            disabled={!this.props.signIn || this.props.storedPetitionComments
                                .filter(comment => comment.author_id === this.props.selectedUser.id).length > 0}
                            onClick={this.onClickCommentConfirmButton}> Agree</Button>
                    </div>

                    <div className="petitionsReply_Reply">
                        {comments}
                        <br />
                        {listNumberButtons}
                    </div>
                    <br />
                </div >
            </div >
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        selectedPetition: state.hu.selectedPetition,
        storedPetitionComments: state.hu.comment_list,
        signIn: state.usr.signIn
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetPetition: petition_url =>
            dispatch(actionCreators.getPetition(petition_url)),
        onGetPetitionComments: petition_url =>
            dispatch(actionCreators.getPetitionComments(petition_url)),
        onStorePetitionComment: (petition_url, comment) =>
            dispatch(actionCreators.postPetitionComment({ petition_url: petition_url, comment: comment })),
        onPetitionVote: petition_url =>
            dispatch(actionCreators.putPetitionVote(petition_url)),
        onGetCsvFile: petition_url =>
            dispatch(actionCreators.getCsvFile(petition_url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PetitionDetail));
