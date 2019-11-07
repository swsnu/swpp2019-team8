import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../store/actions/index'

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter
} from 'reactstrap';

export class UpperBar extends Component {
    state = {
        email: '',
        password: '',
        signIn: false,
        location: '',
        modal: false,
    }

    //Set modal (sign in window)
    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }

    onClickCrossOverButton = () => {
        if (this.state.location === 'tell_me') {
            this.props.history.push('/hear_us');
        } else if (this.state.location === 'hear_us') {
            this.props.history.push('/tell_me');
        }
    }

    onClickSignUpButton = () => {
        this.props.history.push('/sign_up');
    }

    //NOT the sign-in button in navbar, but sign-in button in the modal (popup)
    onClickSignInButton = () => {
        this.toggleModal();
        this.props.postSignIn(this.state.email, this.state.password);
    }

    onClickSignOutButton = () => {
        this.props.getSignOut();
    }

    componentDidMount = () => {
        if (window.localStorage.getItem('userId') !== null) {
            this.props.getUserByUserId(parseInt(window.localStorage.getItem('userId')))
        }
        if (/^http:\/\/localhost:3000\/tell_me/.exec(window.location.href)) {
            this.setState({ location: 'tell_me' });
        } else if (/^http:\/\/localhost:3000\/hear_us/.exec(window.location.href)) {
            this.setState({ location: 'hear_us' });
        }
    }

    render() {
        let crossover = null;
        let upperBar = null;

        if (this.state.location !== '') {
            crossover = (
                <div className="Crossover">
                    <Button type="button" id="crossover_button"
                        onClick={this.onClickCrossOverButton}>Cross</Button>
                </div>
            );
        }

        if (this.props.signIn === false) {
            upperBar = (
                <nav className="navbar">
                    <a className="navbar-brand" href="/">SNUVOICE</a>
                    <form className="form-inline">
                        {crossover}
                        <Button type="button" id="sign_in_button"
                            onClick={this.toggleModal}>SIGN-IN</Button>
                        <Button type="button" id="sign_up_button"
                            onClick={this.onClickSignUpButton}>SIGN-UP</Button>
                    </form>
                </nav>
            );
        } else {
            upperBar = (
                <nav className="navbar">
                    <a className="navbar-brand" href="/">SNUVOICE</a>
                    <form className="form-inline">
                        {crossover}
                        <Button type="button" id="sign_out_button"
                            onClick={this.onClickSignOutButton}>SIGN-OUT</Button>
                    </form>
                </nav>
            );
        }

        return (
            <div className="UpperBar">
                {upperBar}
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="SignInModal">
                    <ModalHeader>
                        Welcome to SNU VOICE
                    </ModalHeader>
                    <ModalBody>
                        <Input type="email" id="email_input" placeholder="SNU MAIL"
                            onChange={(event) => this.setState({ email: event.target.value })}></Input>
                        <Input type="password" id="password_input" placeholder="PASSWORD"
                            onChange={(event) => this.setState({ password: event.target.value })}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.onClickSignInButton}>Sign In</Button>
                        <Button onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        postSignIn: (email, password) =>
            dispatch(actionCreator.postSignIn({ email: email, password: password })),
        getSignOut: () =>
            dispatch(actionCreator.getSignOut()),
        getUserByUserId: (userId) =>
            dispatch(actionCreator.getUserByUserId(userId))

    }

};

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        signIn: state.usr.signIn
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UpperBar));