import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actionCreators from '../../../../store/actions/index';

class PetitionDetail extends Component {
    componentDidMount() {
        this.props.onGetPetition(this.props.match.params.petition_id);
    }

    render() {
        let title = '';
        let content = '';
        let votes = '';
        let category = '';
        let start_date = '';
        let end_date = '';
        if (this.props.selectedPetition) {
            title = this.props.selectedPetition.title;
            content = this.props.selectedPetition.content;
            votes = this.props.selectedPetition.votes;
            category = this.props.selectedPetition.category;
            start_date = this.props.selectedPetition.start_date.substring(0, 10);
            end_date = this.props.selectedPetition.end_date.substring(0, 10);
        }
        return (
            <div className="PetitionDetail">
                <h1>PetitionDetail</h1>
                <h2 className="petitionsView_title">{title}</h2>
                <p className="petitionsView_count">Votes: [ {votes} ]</p>
                <div className="petitionsView_info">
                    <ul className="petitionsView_info_list">
                        <li className="petitionsView_category">Category: {category}</li>
                        <li className="petitionsView_start_date">Start: {start_date}</li>
                        <li className="petitionsView_end_date">End: {end_date}</li>
                        <li className="petitionsView_petitioner">Petitioner: 여기에 닉네임</li>
                    </ul>
                </div>
                <p className="petitionsView_graphy">-----여기에 진행상태바 근데 이건 css 힘이 너무 많이 필요해서 일단 패스-----</p>

                <div className="petitionsView_write">
                    <h4 className="petitionsView_writeHead">Content</h4>
                    <div className="View_write">{content}</div>
                    <ul className="View_write_link">
                        <li>
                            <p>Link 1 : </p>
                            <a href="https://github.com/swsnu/swpp2019-team8" target="_blank" rel="noopener noreferrer">여기에 링크1</a>
                        </li>
                        <li>
                            <p>Link 2 : </p>
                            <a href="https://github.com/swsnu/swpp2019-team8" target="_blank" rel="noopener noreferrer">여기에 링크2</a>
                        </li>
                    </ul>
                </div>

                <div className="petitionsView_statistic">
                    <br></br><br></br>** 여기에 통계 **<br></br><br></br>
                </div>

                <div className="petitionsReply_area">
                    <div className="Reply_area_head">
                        <h5 className="Reply_area_agree">Votes: 여기에 투표 수</h5>
                        <div className="Reply_area_url">
                            URL: 여기에 URL
                            <button>Copy</button>
                        </div>
                    </div>
                    <div className="Reply_area_write">
                        <textarea id="tw_contents"></textarea>
                        <button>Agree</button>
                    </div>
                    <div className="petitionsReply_Reply">
                        <ul>
                            <li className="Reply_Reply_list">
                                <div className="Reply_Reply_contents">
                                    <div className="pv3_R_contents_head">
                                        <h4>여기에 닉네임</h4>
                                    </div>
                                    <div className="R_R_contents_txt">
                                        여기에 댓글
                                    </div>
                                </div>
                            </li>
                            <li className="Reply_Reply_list">
                                <div className="Reply_Reply_contents">
                                    <div className="pv3_R_contents_head">
                                        <h4>여기에 닉네임</h4>
                                    </div>
                                    <div className="R_R_contents_txt">
                                        여기에 댓글
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}

export const mapStateToProps = state => {
    return {
        selectedPetition: state.hu.selectedPetition,
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onGetPetition: petition_id =>
            dispatch(actionCreators.getPetition(petition_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PetitionDetail));