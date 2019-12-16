import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreator from "../../../store/actions/index";

import HearUsSearchBar from "../HearUs/HearUsSearchBar/HearUsSearchBar";
import TellMeSearchBar from "../TellMe/TellMeSearchBar/TellMeSearchBar";

import Logo from "../../../img/Logo_blue.png";
import Profile from "../../../img/profile_icon.png";
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
    Row,
    ButtonDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem
} from "reactstrap";

import "./UpperBar.css";

export class UpperBar extends Component {
    state = {
        email: "",
        password: "",
        location: "",
        modal: false,
        feedBackMessage: "",
        profile: false
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

    toggleProfile = () => {
        this.setState({ profile: !this.state.profile });
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
                feedBackMessage: "Please check your mail or password."
            });
        }
    };

    onClickInfoEditButton = () => {
        this.props.history.push("/user/edit");
    }

    onClickSignOutButton = () => {
        this.props.getSignOut();
    };

    onClickCreateDocumentButton = () => {
        this.props.history.push("/tell_me/create");
    }

    onClickUploadPhotoButton = () => {
        this.props.history.push("/tell_me/photo");
    }

    onClickCreatePetitionButton = () => {
        this.props.history.push("/hear_us/create");
    }

    onClickMyPetitionButton = () => {
        this.props.history.push("/hear_us/my_petition");
    }



    componentDidMount = () => {
        this.props.checkSignIn();
        if (/snuvoice.site\/tell_me/.exec(window.location.href)) {
            this.setState({ location: "tell_me" });
        } else if (
            /snuvoice.site\/hear_us/.exec(window.location.href)
        ) {
            this.setState({ location: "hear_us" });
        }

        // if (/localhost:3000\/tell_me/.exec(window.location.href)) {
        //     this.setState({ location: "tell_me" });
        // } else if (/localhost:3000\/hear_us/.exec(window.location.href)) {
        //     this.setState({ location: "hear_us" });
        // }
    };
    render() {
        let upperBar = null;
        let searchBar = "";
        if (this.state.location === "tell_me") {
            searchBar = (
                <Row className="sub_bar">
                    <Col className="navbuttons">
                        <a
                            className="navbar-brand info"
                            // type="button"
                            id="tell_me_button"
                            // onClick={this.onClickTellMeButton}
                            href="/tell_me"
                        >
                            <b>TELL-ME</b>
                        </a>
                        <a
                            className="navbar-brand info"
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
                            <img
                                src={Logo}
                                style={{ height: 60 }}
                                alt="SNUVOICE logo"
                            />
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
                                onClick={this.onClickSignUpButton}
                                className="sign_up_button"
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
                            <img
                                src={Logo}
                                href="/"
                                style={{ height: 60 }}
                                alt="SNUVOICE logo"
                            />
                        </a>
                        <div className="user_button">
                            {/* <Button
                                type="button"
                                id="sign_out_button"
                                onClick={this.onClickSignOutButton}
                            >
                                SIGN-OUT
                            </Button> */}
                            <ButtonDropdown
                                isOpen={this.state.profile}
                                toggle={this.toggleProfile}
                                direction="left"
                            >
                                <DropdownToggle className="profile_button">
                                    <img
                                        src={Profile}
                                        style={{ height: 30, width: 25 }}
                                        className="profile_icon"
                                        alt="profile_icon"
                                    />
                                </DropdownToggle>
                                <DropdownMenu className="profile_dropdown">
                                    <DropdownItem header><b>{this.props.selectedUser.nickname}</b></DropdownItem>
                                    <DropdownItem onClick={this.onClickInfoEditButton}>Change Profile</DropdownItem>
                                    <DropdownItem
                                        id="sign_out_button"
                                        onClick={this.onClickSignOutButton}
                                    >
                                        Sign Out
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem header>Tell Me</DropdownItem>
                                    <DropdownItem onClick={this.onClickCreateDocumentButton}>New Document</DropdownItem>
                                    <DropdownItem onClick={this.onClickUploadPhotoButton}>Upload Photo</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem header>Hear Us</DropdownItem>
                                    <DropdownItem onClick={this.onClickCreatePetitionButton}>New Petition</DropdownItem>
                                    <DropdownItem onClick={this.onClickMyPetitionButton}>My Petitions</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
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
                        <Button onClick={this.onClickSignInButton}>
                            Sign In
                        </Button>
                        <Button onClick={this.toggleModal}>Cancel</Button>
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
