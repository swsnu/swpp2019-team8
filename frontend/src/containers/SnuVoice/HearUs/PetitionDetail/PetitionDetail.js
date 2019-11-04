import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class PetitionDetail extends Component {
    render() {
        return (
            <div className="PetitionDetail">
                <h1>PetitionDetail</h1>
                <h2 class="petitionsView_title">여기에 제목</h2>
                <p class="petitionsView_count">Votes: [ 여기에 투표 수 ]</p>
                <div class="petitionsView_info">
                    <ul class="petitionsView_info_list">
                        <li>Category: 여기에 카테고리</li>
                        <li>Start: 여기에 시작 날짜</li>
                        <li>End: 여기에 마감 날짜</li>
                        <li>Petitioner: 여기에 닉네임</li>
                    </ul>
                </div>
                <p class="petitionsView_graphy">-----여기에 진행상태바 근데 이건 css 힘이 너무 많이 필요해서 일단 패스-----</p>

                <div class="petitionsView_write">
                    <h4 class="petitionsView_writeHead">Content</h4>
                    <div class="View_write">
                        여기에 청원내용<br></br>
                        소개원실 하하하하하하하ㅏ하하하하하하핳<br></br>
                        소개원실 하하하하하하하ㅏ하하하하하하핳<br></br>
                        소개원실 하하하하하하하ㅏ하하하하하하핳<br></br>
                        소개원실 하하하하하하하ㅏ하하하하하하핳<br></br>
                        <br></br><br></br>
                    </div>
                    <ul class="View_write_link">
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

                <div class="petitionsView_statistic">
                    <br></br><br></br>** 여기에 통계 **<br></br><br></br>
                </div>

                <div class="petitionsReply_area">
                    <div class="Reply_area_head">
                        <h5 class="Reply_area_agree">Votes: 여기에 투표 수</h5>
                        <div class="Reply_area_url">
                            URL: 여기에 URL
                            <button>Copy</button>
                        </div>
                    </div>
                    <div class="Reply_area_write">
                        <textarea id="tw_contents"></textarea>
                        <button>Agree</button>
                    </div>
                    <div class="petitionsReply_Reply">
                        <ul>
                            <li class="Reply_Reply_list">
                                <div class="Reply_Reply_contents">
                                    <div class="pv3_R_contents_head">
                                        <h4>여기에 닉네임</h4>
                                    </div>
                                    <div class="R_R_contents_txt">
                                        여기에 댓글
                                    </div>
                                </div>
                            </li>
                            <li class="Reply_Reply_list">
                                <div class="Reply_Reply_contents">
                                    <div class="pv3_R_contents_head">
                                        <h4>여기에 닉네임</h4>
                                    </div>
                                    <div class="R_R_contents_txt">
                                        여기에 댓글
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="paging">
                        <div class="p_wrap">
                            <div class="p_btn">
                                <div class="p_btn">
                                    <a><strong>1</strong></a>
                                    <a>2</a>
                                    <a>3</a>
                                    <a>4</a>
                                    <a>5</a>
                                    <a>6</a>
                                    <a>7</a>
                                    <a>8</a>
                                    <a>9</a>
                                    <a>10</a>
                                </div>
                                <div class="p_btn next">
                                    <a>Next</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default connect(null, null)(withRouter(PetitionDetail));