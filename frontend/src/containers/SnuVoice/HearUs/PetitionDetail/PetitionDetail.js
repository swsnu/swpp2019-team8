import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import ShareLink from "react-facebook-share-link";

import { Row, Col, Button, ButtonGroup } from "reactstrap";

import * as actionCreators from "../../../../store/actions/index";

import UpperBar from "../../UpperBar/UpperBar";
import "./PetitionDetail.css";

class PetitionDetail extends Component {
    state = {
        isSelected: false,
        comment: "",
        listNumber: [1, 2, 3, 4, 5],
        selectedNumber: 1
    };

    componentDidMount = async () => {
        await this.props.onGetPetition(this.props.match.params.petition_url);
        await this.props.onGetPetitionComments(
            this.props.match.params.petition_url
        );

        window.Kakao.init('41c0076be4855dfb7bac65638652b1f9');
        if (this.props.selectedPetition.title && this.props.selectedPetition.votes) {
            window.Kakao.Link.createDefaultButton({
                container: '#kakao-link-btn',
                objectType: 'feed',
                content: {
                    title: this.props.selectedPetition.title,
                    description: '서울대학교 청원',
                    imageUrl: 'https://user-images.githubusercontent.com/26313346/70518116-22fba300-1b7d-11ea-9e10-a4a41437fd09.png',
                    link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href
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
    }

    onClickCommentConfirmButton = async () => {
        if (!this.props.signIn) {
            alert("You must be logged in to vote");
            return;
        }
        else if (this.props.storedPetitionComments
            .filter(comment => comment.author_id === this.props.selectedUser.id).length > 0) {
            alert("You already voted for this petition");
            return;
        }
        await this.props.onPetitionVote(this.props.match.params.petition_url);
        await this.props.onStorePetitionComment(this.props.match.params.petition_url, this.state.comment);
        window.location.reload(false);
    };

    // onClickPetitionCancelButton = () => {
    //     this.props.history.push('/hear_us');
    // }

    onClickDownloadCsvButton = () => {
        this.props.onGetCsvFile(this.props.match.params.petition_url);
    };

    onClickListPrevButton = () => {
        const numbers = this.state.listNumber.map(listNumber => listNumber - 5);
        if (numbers[0] > 0) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] });
        }
    };

    onClickListNumberButton = event => {
        this.setState({ selectedNumber: event.target.value });
    };

    onClickListNextButton = () => {
        const numbers = this.state.listNumber.map(listNumber => listNumber + 5);
        if (
            this.props.storedPetitionComments &&
            this.props.storedPetitionComments.length / 10 + 1 >= numbers[0]
        ) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] });
        }
    };

    onClickCopyURL = () => {
        const obShareUrl = document.getElementById("ShareUrl");
        obShareUrl.select();
        document.execCommand("Copy");
        alert("URL이 클립보드에 복사되었습니다");
    };

    render() {
        let title = "";
        let content = "";
        let votes = "";
        let status = "";
        let category = "";
        let start_date = "";
        let end_date = "";
        let link = [""];

        if (this.props.selectedPetition) {
            title = this.props.selectedPetition.title;
            content = this.props.selectedPetition.content;
            votes = this.props.selectedPetition.votes;
            category = this.props.selectedPetition.category;
            status = this.props.selectedPetition.status;
            start_date = this.props.selectedPetition.start_date.substring(
                0,
                10
            );
            end_date = this.props.selectedPetition.end_date.substring(0, 10);
            link = this.props.selectedPetition.link.split(" ");
            link = link.slice(0, link.length - 1);
        }

        const links = link.map(url => {
            return (
                <li key="">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                    </a>
                </li>
            );
        });

        let comments = [];
        if (this.props.storedPetitionComments) {
            comments = this.props.storedPetitionComments.map((com, i) => {
                let date = null;
                let time = null;
                if (typeof com.date === "string") {
                    date = com.date.substring(0, 10);
                    time = com.date.substring(11, 16);
                }
                if (
                    i < this.state.selectedNumber * 10 &&
                    i >= (this.state.selectedNumber - 1) * 10
                ) {
                    return (
                        <div key={com.id} className="Reply_Reply_list">
                            <div className="Reply_Reply_contents">
                                <div className="pv3_R_contents_head">
                                    <h6>{date + " " + time}</h6>
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
            if (
                this.props.storedPetitionComments &&
                this.props.storedPetitionComments.length / 10 + 1 >= number
            ) {
                return (
                    <Button
                        type="button"
                        id="list_number_buttons"
                        key={i}
                        value={number}
                        onClick={this.onClickListNumberButton}
                    >
                        {number}
                    </Button>
                );
            }
            return null;
        });

        let listNumberButtons = (
            <div className="list_numbering_button">
                <ButtonGroup>
                    <Button
                        type="button"
                        id="list_prev_button"
                        disabled={this.state.listNumber[0] === 1}
                        onClick={this.onClickListPrevButton}
                    >
                        Prev
                    </Button>
                    {listNumbers}
                    <Button
                        type="button"
                        id="list_next_button"
                        disabled={
                            this.props.storedPetitionComments &&
                            this.state.listNumber[0] + 5 >
                                this.props.storedPetitionComments.length / 10 +
                                    1
                        }
                        onClick={this.onClickListNextButton}
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </div>
        );

        let graphSrc = "https://www.snuvoice.site/api/tellme/media/graph/ex";//local : http://localhost:8000/api/tellme ...
        if (this.props.selectedPetition) {
            if (this.props.selectedPetition.status === 'ongoing' || this.props.selectedPetition.status === 'end')
                graphSrc = "https://www.snuvoice.site/api/tellme/media/graph/" + this.props.selectedPetition.id;
        }
        let trendSrc = graphSrc + "/trend.jpg";
        var d = new Date();
        if (this.props.selectedPetition) {
            if (this.props.selectedPetition.status === 'preliminary') {
                var date_string = this.props.selectedPetition.start_date;
                var year = date_string.substring(0, 4);
                var month = date_string.substring(5, 7);
                var day = date_string.substring(8, 10);
                if (year === d.getFullYear().toString() && month === (d.getMonth() + 1).toString() && day === d.getDate().toString()) {
                    trendSrc = "http://localhost:8000/api/tellme/media/graph/ex/tomorrow.jpg";
                }
            }
        }

        return (
            <div>
                <UpperBar />
                <div className="PetitionDetail">
                    <div className="content">
                        <br />
                        <p className="petitionStatus_count">- {status} -</p>
                        <h2 className="petitionsView_title">
                            <b>{title}</b>
                        </h2>
                        <br />
                        <p className="petitionsView_count">
                            <b>Votes: [ {votes} ]</b>
                        </p>
                        <div className="petitionsView_info">
                            <Row className="petitionsView_info_list">
                                <Col>
                                    <div className="petitionsView_category">
                                        <b>Category:</b> {category}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="petitionsView_start_date">
                                        <b>Start:</b> {start_date}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="petitionsView_end_date">
                                        <b>End:</b> {end_date}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <br />
                        <hr />
                        <div className="petitionsView_write">
                            <h6 className="petitionsView_writeHead">
                                Petition Description:
                            </h6>
                            <div className="View_write">{content}</div>
                            <br />
                            <h6 className="View_write_link">
                                Attached links:{" "}
                            </h6>
                            {links}
                            <br />
                        </div>
                        <hr />
                        <div className="petitionsView_statistic">
                            <h4>Statistics</h4>
                            {/* &#60; */}
                            <br />
                            <br />
                            <Row>
                                <img className="imgs" src={trendSrc} alt="Graph: Trend" />
                                <img className="imgs" src={graphSrc + "/gender.jpg"} alt="Graph: Gender" />
                            </Row>
                            <Row>
                                <img
                                    className="imgs"
                                    src={graphSrc + "/department.jpg"}
                                    alt="Graph: Department"
                                />
                                <img
                                    className="imgs"
                                    src={graphSrc + "/studentId.jpg"}
                                    alt="Graph: Student ID"
                                />
                            </Row>
                            <h6
                                className="Ex_alert_message"
                                hidden={status === "ongoing"}
                            >
                                These graphs are examples, you can see this
                                petition&apos;s graphs when this petition&apos;s
                                state becomes ongoing.
                            </h6>
                            <div
                                className="download_csv_buttn"
                                hidden={status !== "ongoing"}
                            >
                                <Button
                                    id="download_csv_button"
                                    onClick={this.onClickDownloadCsvButton}
                                >
                                    Download .csv file
                                </Button>
                            </div>
                            <br />
                        </div>
                        <hr/>
                            <br />
                        <div className="Reply">
                            <Row>
                                <Col className="Reply_area_agree">
                                    <h3>
                                        <span className="pet_det_votes">
                                            {votes}
                                        </span>{" "}
                                        People Agree
                                    </h3>
                                </Col>
                                <Col>
                                    <div className="View_share_icons">
                                        {/* <div className="View_share">
                                    Share:
                                </div> */}
                                        <div>
                                        {/* <input
                                            type="text"
                                            id="ShareUrl"
                                            value={window.location.href}
                                            /> */}
                                        <Button onClick={this.onClickCopyURL}  className="share_url">
                                            URL
                                        </Button>
                                            </div>
                                            <div className="share_kakao">
                                        <Button className="Kakao">
                                        <img
                                            id="kakao-link-btn"
                                            src="//developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png"
                                            alt="Share on Kakao Talk"
                                            className="kakao_icon"
                                            />
                                        </Button >
                                            </div>
                                            <div className="share_facebook">
                                        <ShareLink link={window.location.href}>
                                            {_link => (
                                                <a
                                                href={_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                >
                                                    <img
                                                        src="https://user-images.githubusercontent.com/26313346/70497186-ac977a80-1b55-11ea-98d3-c45f7705b1eb.png"
                                                        width="32"
                                                        alt="Share on Facebook"
                                                        />
                                                </a>
                                            )}
                                        </ShareLink>
                                            </div>
                                    </div>
                                </Col>
                            </Row>

                            <div className="Reply_area_write">
                                <textarea
                                    className="Reply_textarea"
                                    id="tw_contents"
                                    placeholder="Write your comment within 50 characters."
                                    onChange={event =>
                                        this.setState({
                                            comment: event.target.value
                                        })
                                    }
                                ></textarea>
                                <Button
                                    type="button"
                                    id="comment_confirm_button"
                                    disabled={
                                        !this.props.signIn ||
                                        this.props.storedPetitionComments.filter(
                                            comment =>
                                                comment.author_id ===
                                                this.props.selectedUser.id
                                        ).length > 0
                                    }
                                    onClick={this.onClickCommentConfirmButton}
                                >
                                    {" "}
                                    Agree
                                </Button>
                            </div>

                            <div className="petitionsReply_Reply">
                                <hr />
                                {comments}
                                <br />
                                {listNumberButtons}
                            </div>
                        </div>
                        <br />
                    </div>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        selectedPetition: state.hu.selectedPetition,
        storedPetitionComments: state.hu.comment_list,
        signIn: state.usr.signIn
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onGetPetition: petition_url =>
            dispatch(actionCreators.getPetition(petition_url)),
        onGetPetitionComments: petition_url =>
            dispatch(actionCreators.getPetitionComments(petition_url)),
        onStorePetitionComment: (petition_url, comment) =>
            dispatch(
                actionCreators.postPetitionComment({
                    petition_url: petition_url,
                    comment: comment
                })
            ),
        onPetitionVote: petition_url =>
            dispatch(actionCreators.putPetitionVote(petition_url)),
        onGetCsvFile: petition_url =>
            dispatch(actionCreators.getCsvFile(petition_url))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PetitionDetail));
