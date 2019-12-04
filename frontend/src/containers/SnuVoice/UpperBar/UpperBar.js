import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreator from "../../../store/actions/index";

import HearUsSearchBar from "../HearUs/HearUsSearchBar/HearUsSearchBar";
import TellMeSearchBar from "../TellMe/TellMeSearchBar/TellMeSearchBar";

import Logo from "../../../img/Logo_blue.png";
import "./UpperBar.css";

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormText,
    Col,
    Row
} from "reactstrap";

import "./UpperBar.css";

export class UpperBar extends Component {
    state = {
        email: "",
        password: "",
        location: "",
        modal: false,
        feedBackMessage: ""
    };

    //Set modal (sign in window)
    toggleModal = () => {
        if (!this.state.modal) {
            this.setState({ modal: !this.state.modal });
        } else {
            this.setState({
                modal: !this.state.modal,
                email: "",
                password: "",
                feedBackMessage: ""
            });
        }
    };

    onKeyPress = event => {
        if (event.key === "Enter") this.onClickSignInButton();
    };

    // onClickTellMeButton = () => {
    //     this.props.history.push("/tell_me");
    // };

    // onClickHearUsButton = () => {
    //     this.props.history.push("/hear_us");
    // };

    onClickSignUpButton = () => {
        this.props.history.push("/sign_up");
    };

    //NOT the sign-in button in navbar, but sign-in button in the modal (popup)
    onClickSignInButton = async () => {
        await this.props.postSignIn(this.state.email, this.state.password);
        if (this.props.signIn === true) {
            this.toggleModal();
            this.setState({ feedBackMessage: "" });
        } else {
            this.setState({
                feedBackMessage: "이메일이나 비밀번호를 확인해주십시오."
            });
        }
    };

    onClickSignOutButton = () => {
        this.props.getSignOut();
    };

    componentDidMount = () => {
        this.props.checkSignIn();
        if (/^http:\/\/localhost:3000\/tell_me/.exec(window.location.href)) {
            this.setState({ location: "tell_me" });
        } else if (
            /^http:\/\/localhost:3000\/hear_us/.exec(window.location.href)
        ) {
            this.setState({ location: "hear_us" });
        }
    };
    render() {
        let upperBar = null;
        let searchBar = "";
        if (this.state.location === "tell_me") {
            searchBar = (
                <Row className="sub_bar">
                    <Col className="navbuttons">
                        <a
                            className="navbar-brand"
                            // type="button"
                            id="tell_me_button"
                            // onClick={this.onClickTellMeButton}
                            href="/tell_me"
                        >
                            <b>TELL-ME</b>
                        </a>
                        <a
                            className="navbar-brand"
                            // type="button"
                            id="hear_us_button"
                            // onClick={this.onClickHearUsButton}
                            href="/hear_us"
                        >
                            HEAR-US
                        </a>
                    </Col>
                    <Col className="searchbar">
                        <TellMeSearchBar />
                    </Col>
                </Row>
            );
        } else if (this.state.location === "hear_us") {
            searchBar = (
                <Row className="sub_bar">
                    <Col className="navbuttons">
                    <a
                            className="navbar-brand"
                            // type="button"
                            id="tell_me_button"
                            // onClick={this.onClickTellMeButton}
                            href="/tell_me"
                        >
                            TELL-ME
                        </a>
                        <a
                            className="navbar-brand"
                            // type="button"
                            id="hear_us_button"
                            // onClick={this.onClickHearUsButton}
                            href="/hear_us"
                        >
                            <b>HEAR-US</b>
                        </a>
                    </Col>
                    <Col className="searchbar">
                        <HearUsSearchBar />
                    </Col>
                </Row>
            );
        }

        if (this.props.signIn === false) {
            upperBar = (
                <div>
                <div className="upperbar_top">
                        <a className="logo" href="/">
                        <img src={Logo} style={{ height: 60 }} />
                        </a>
                        <div className="user_button">
                            <Button
                                type="button"
                                id="sign_in_button"
                                onClick={this.toggleModal}
                                className="sign_in_button"
                            >
                                SIGN-IN
                            </Button>
                            <Button
                                type="button"
                                id="sign_up_button"
                                className="sign_up_button"
                                onClick={this.onClickSignUpButton}
                            >
                                SIGN-UP
                            </Button>
                        </div>
                </div>
                    <div className="upperbar_bottom">{searchBar}</div>
                    </div>
            );
        } else {
            upperBar = (
                <div>
                <div className="upperbar_top">
                        <a href="/" className="logo">
                        <img src={Logo} href="/" style={{ height: 60 }} />
                        </a>
                        <div className="user_button">
                            <Button
                                type="button"
                                id="sign_out_button"
                                onClick={this.onClickSignOutButton}
                                className="sign_out_button"
                                >
                                SIGN-OUT
                            </Button>
                        </div>
                </div>
                    <div className="upperbar_bottom">{searchBar}</div>
                                </div>
            );
        }
        return (
            <div className="UpperBar">
                {upperBar}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="SignInModal"
                >
                    <ModalHeader>Welcome to SNU VOICE</ModalHeader>
                    <ModalBody>
                        <FormText color="danger" size="12">
                            {this.state.feedBackMessage}
                        </FormText>
                        <Input
                            type="email"
                            id="email_input"
                            placeholder="SNU MAIL"
                            value={this.state.email}
                            onKeyPress={this.onKeyPress}
                            onChange={event =>
                                this.setState({ email: event.target.value })
                            }
                        ></Input>
                        <Input
                            type="password"
                            id="password_input"
                            placeholder="PASSWORD"
                            value={this.state.password}
                            onKeyPress={this.onKeyPress}
                            onChange={event =>
                                this.setState({ password: event.target.value })
                            }
                        ></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="sign_in_button" onClick={this.onClickSignInButton}>
                            Sign In
                        </Button>
                        <Button className="cancel_button" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        checkSignIn: () => dispatch(actionCreator.checkSignIn()),
        postSignIn: (email, password) =>
            dispatch(
                actionCreator.postSignIn({ email: email, password: password })
            ),
        getSignOut: () => dispatch(actionCreator.getSignOut()),
        getUserByUserId: userId =>
            dispatch(actionCreator.getUserByUserId(userId))
    };
};

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        signIn: state.usr.signIn
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UpperBar));
