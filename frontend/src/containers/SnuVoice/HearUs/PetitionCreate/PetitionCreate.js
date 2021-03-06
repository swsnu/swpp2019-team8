import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
    InputGroup,
    InputGroupAddon,
    Button,
    ButtonGroup,
    Form,
    FormGroup,
    Label,
    Input,
    Card
} from "reactstrap";
import * as actionCreators from "../../../../store/actions/index";

import "./PetitionCreate.css";
import UpperBar from "../../UpperBar/UpperBar";

class PetitionCreate extends Component {
    state = {
        agreeToTerms: false,
        petitionTitle: "",
        categoryList: [
            { value: "-", label: "- Select Category -" },
            { value: "human rights", label: "Human Rights" },
            { value: "welfare", label: "Welfare" },
            { value: "traffic", label: "Traffic" },
            { value: "education", label: "Education" },
            { value: "administration", label: "Administration" },
            { value: "facility", label: "Facility" }
        ],
        selectedCategory: "-",
        petitionContent: "",
        petitionLink: "",
        petitionLinkList: [],
        petitionTag: "",
        petitionTagList: [],
        signIn: ""
    };

    ngOnInit = async () => {
        if (this.state.signIn === "") {
            await this.props.onCheckSignIn();
            if (!this.props.signIn) {
                alert("You must logged in to Create Petition");
                this.props.history.push("/hear_us");
            } else {
                this.setState({
                    signIn: this.props.signIn
                });
            }
        } else if (!this.props.signIn) {
            alert("You must logged in to Create Petition");
            this.props.history.push("/hear_us");
        }
        //check authentication
    };

    onClickAgreeToTermsCheckBox = () => {
        this.setState({ agreeToTerms: !this.state.agreeToTerms });
    };

    onChangeCategorySelect = event => {
        this.setState({ selectedCategory: event.target.value });
    };

    onClickLinkAddButton = () => {
        let temp = decodeURI(this.state.petitionLink);
        let doTemp = decodeURI(temp);
        doTemp = doTemp.replace(/\s/gi, "%20");
        doTemp = doTemp.replace(/\^/gi, "%5E");
        doTemp = doTemp.replace(/`/gi, "%60");
        doTemp = doTemp.replace(/\|/gi, "%7C");
        doTemp = doTemp.replace(/}/gi, "%7D");
        doTemp = doTemp.replace(/{/gi, "%7B");
        this.state.petitionLinkList.push(doTemp);
        this.setState({ petitionLink: "" });
        this.forceUpdate();
    };

    onClickLinkDeleteButton = event => {
        this.state.petitionLinkList.splice(event.target.value, 1);
        this.forceUpdate();
    };
    onClickPetitionConfirmButton = () => {
        let temp = window.confirm("You cannot edit anymore. Are you sure?");
        if (!temp) return;
        let retLink = "";
        for (var i in this.state.petitionLinkList) {
            retLink += this.state.petitionLinkList[i] + " ";
        }
        this.props.onStorePetition(
            this.state.petitionTitle,
            this.state.petitionContent,
            this.state.selectedCategory,
            /*retTag ,*/ retLink
        );
    };

    onClickPetitionCancelButton = () => {
        this.props.history.push("/hear_us");
    };

    render() {
        this.ngOnInit();
        const link_list = this.state.petitionLinkList.map((link, i) => {
            return (
                <div className="LinkList" key={i}>
                    <a href={link} target="_sub">
                        {link}
                    </a>
                    <Button
                        type="button"
                        value={i}
                        id="petition_link_delete_button"
                        onClick={this.onClickLinkDeleteButton}
                    >
                        Delete Link
                    </Button>
                </div>
            );
        });
        const category_list = this.state.categoryList.map((v, i) => {
            return <option key={i} value={v.value} label={v.label}></option>;
        });
        return (
            <div>
                <UpperBar />
                <div className="PetitionCreate">
                    <Form>
                        <b>
                            <br />
                            <h1 className="petition_create_title">
                                Create New Petition
                            </h1>
                            <br />
                            <div className="inputTop">
                                Operation rule
                                <Card id="petition_terms_textarea">
                                    SNUVOICE는 사상과 표현의 다양성을
                                    존중합니다. 동시에 타인의 권리를 침해하거나
                                    명예를 훼손하는 내용은 제한합니다.
                                    방송통신심의위원회의 '정보통신에 관한 심의
                                    규정', 한국인터넷자율정책기구의 '정책규정'
                                    등을 기반으로 문제 게시물은 삭제될 수
                                    있습니다. 자극적이고 혐오스러운 내용,
                                    비속어, 폭력적 내용, 특정 대상을 비하하거나
                                    차별을 조장하는 내용, 개인정보 유출을 비롯해
                                    타인의 권리를 침해하는 내용, 반복되는 내용,
                                    허위사실 등은 삭제나 숨김 처리될 수
                                    있습니다.
                                </Card>
                                <div className="agree">
                                    <FormGroup>
                                        <Input
                                            type="checkbox"
                                            id="agree_to_terms_checkbox"
                                            checked={this.state.agreeToTerms}
                                            onChange={() =>
                                                this.onClickAgreeToTermsCheckBox()
                                            }
                                        ></Input>
                                    </FormGroup>
                                    Agree
                                    <br/><br/>
                                </div>
                                    청원 작성 안내
                                    <Card id="petition_terms_textarea">
                                    <li>청원글 게시 후 24시간 동안 4명의
                                    사전동의를 받은 청원에 한해 SNUVOICE 게시판
                                    3주간 공개됩니다.</li>
                                    <li>그래프는 매일 오전 3시와 오후 3시에
                                    갱신됩니다. (.csv 파일은 실시간으로
                                    갱신됩니다.)</li>
                                    <li>한 번 작성된 청원은 수정 및 삭제가
                                    불가능합니다. 최초 청원 취지와 다른 내용으로
                                    변경되는 것을 방지하여 청원 참여자의 의견을
                                    보호하기 위한 조치이니 신중하게 작성하여
                                    주시기 바랍니다.</li>
                                    </Card>
                                    </div>
                                    <div className="inputMid">
                                <FormGroup>
                                    <Label>Title</Label>
                                    <Input
                                        type="text"
                                        id="petition_title_input"
                                        placeholder="title"
                                        onChange={event =>
                                            this.setState({
                                                petitionTitle:
                                                    event.target.value
                                            })
                                        }
                                    ></Input>
                                </FormGroup>
                                Category
                                <Input
                                    type="select"
                                    id="petition_category_select"
                                    onChange={this.onChangeCategorySelect}
                                >
                                    {category_list}
                                </Input>
                            </div>
                            <br />
                            <FormGroup>
                                <Label>Content</Label>
                                <Input
                                    type="textarea"
                                    id="petition_content_textarea"
                                    placeholder="content"
                                    style={{ height: 200 }}
                                    onChange={event =>
                                        this.setState({
                                            petitionContent: event.target.value
                                        })
                                    }
                                ></Input>
                            </FormGroup>
                            <div className="inputBottom">
                                <FormGroup>
                                    <Label>Link</Label>
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            id="petition_link_input"
                                            placeholder="new link"
                                            value={this.state.petitionLink}
                                            onChange={event =>
                                                this.setState({
                                                    petitionLink:
                                                        event.target.value
                                                })
                                            }
                                        ></Input>
                                        <InputGroupAddon addonType="prepend">
                                            <Button
                                                type="button"
                                                id="petition_link_add_button"
                                                onClick={
                                                    this.onClickLinkAddButton
                                                }
                                                disabled={
                                                    !this.state.petitionLink
                                                }
                                            >
                                                Add Link
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {link_list}
                                </FormGroup>
                                <ButtonGroup className="buttons">
                                    <Button
                                        type="button"
                                        id="petition_confirm_button"
                                        onClick={
                                            this.onClickPetitionConfirmButton
                                        }
                                        disabled={
                                            !this.state.agreeToTerms ||
                                            !this.state.petitionTitle ||
                                            !this.state.petitionContent ||
                                            this.state.selectedCategory === "-"
                                        }
                                        className="navy_button left"
                                    >
                                        CONFIRM
                                    </Button>
                                    <Button
                                        type="button"
                                        id="petition_cancel_button"
                                        onClick={
                                            this.onClickPetitionCancelButton
                                        }
                                        className="navy_button right"
                                    >
                                        CANCEL
                                    </Button>
                                </ButtonGroup>
                            </div>
                            <br />
                            <br />
                            <br />
                        </b>
                    </Form>
                </div>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onStorePetition: (title, content, category, /*tag,*/ link) =>
            dispatch(
                actionCreators.postPetition({
                    title: title,
                    content: content,
                    category: category,
                    /*tag: tag,*/ link: link
                })
            ),
        onCheckSignIn: () => dispatch(actionCreators.checkSignIn())
    };
};

export const mapStateToProps = state => {
    return {
        signIn: state.usr.signIn
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PetitionCreate));
