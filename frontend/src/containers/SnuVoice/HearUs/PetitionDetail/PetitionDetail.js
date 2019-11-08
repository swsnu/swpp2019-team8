import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Row, Col, Button } from 'reactstrap';

import * as actionCreators from '../../../../store/actions/index';

import UpperBar from '../../UpperBar/UpperBar';
import './PetitionDetail.css';

import demoGraph from '../../../../img/demoGraph.png';

class PetitionDetail extends Component {
    state = {
        isSelected: false,
        comment: '',
    }

    componentDidMount() {
        this.props.onGetPetition(this.props.match.params.petition_id);
        this.props.onGetPetitionComments(this.props.match.params.petition_id);
    }

    onClickCommentConfirmButton = () => {
        this.props.onStorePetitionComment(this.props.match.params.petition_id, this.state.comment);
    }

    onClickPetitionCancelButton = () => {
        this.props.history.push('/hear_us');
    }

    render() {
        let title = '';
        let content = '';
        let votes = '';
        let category = '';
        let start_date = '';
        let end_date = '';
        let link = [''];

        if (this.props.selectedPetition) {
            title = this.props.selectedPetition.title;
            content = this.props.selectedPetition.content;
            votes = this.props.selectedPetition.votes;
            category = this.props.selectedPetition.category;
            start_date = this.props.selectedPetition.start_date.substring(0, 10);
            end_date = this.props.selectedPetition.end_date.substring(0, 10);
            if (this.state.isSelected === false) {
                this.props.onGetUserByUserId(this.props.selectedPetition.author);
                this.setState({ isSelected: true });
            }
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

        const comments = this.props.storedPetitionComments.map(com => {
            console.log(com);
            return (
                <div className="Reply_Reply_list">
                    <div className="Reply_Reply_contents">
                        <div className="pv3_R_contents_head">
                            {com.date}
                        </div>
                        <div className="R_R_contents_txt">
                            {com.comment}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <UpperBar />

                <div className="PetitionDetail">
                    <br /><br />
                    <div className="content">
                        <b><br />
                            <h6>Petition</h6>
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

                        <div className="petitionsView_write">
                            <h6 className="petitionsView_writeHead">Petition Description:</h6>
                            <div className="View_write">{content}</div>
                            <br />
                            <h6 className="View_write_link">Attached links: </h6>
                            {links}
                        </div>

                        <div className="petitionsView_statistic">
                            <br /><br />
                            <img src={demoGraph} style={{ width: 450 }} />
                            <Button type="button" id="more-statistics-button">More Statistics..</Button>
                            <br /><br />
                        </div>

                    </div>

                    <div className="Reply_area_write">
                        <textarea id="tw_contents" style={{ width: 700 }}
                            onChange={(event) => this.setState({ comment: event.target.value })}></textarea>
                        <Button type="button" id="comment_confirm_button"
                            onClick={this.onClickCommentConfirmButton}> Agree</Button>
                    </div>

                    <Button type="button" id="petition_cancel_button"
                        onClick={this.onClickPetitionCancelButton}>BACK</Button>

                    <br /><br />
                    <div className="petitionsReply_Reply">
                        {comments}
                    </div>
                </div >
            </div >
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedPetition: state.hu.selectedPetition,
        selectedUser: state.usr.selectedUser,
        storedPetitionComments: state.hu.comment_list,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetPetition: petition_id =>
            dispatch(actionCreators.getPetition(petition_id)),
        onGetUserByUserId: user_id =>
            dispatch(actionCreators.getUserByUserId(user_id)),
        onGetPetitionComments: petition_id =>
            dispatch(actionCreators.getPetitionComments(petition_id)),
        onStorePetitionComment: (petition_id, comment) =>
            dispatch(actionCreators.postPetitionComment({ petition_id: petition_id, comment: comment })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PetitionDetail));