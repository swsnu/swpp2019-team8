import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../store/actions/index'
import './UpperBar.css';
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormText
} from 'reactstrap';

export class UpperBar extends Component {
    state = {
        email: '',
        password: '',
        location: '',
        modal: false,
        feedBackMessage: ''
    }

    //Set modal (sign in window)
    toggleModal = () => {
        if (!this.state.modal) {
            this.setState({ modal: !this.state.modal })
        } else {
            this.setState({
                modal: !this.state.modal,
                email: '',
                password: '',
                feedBackMessage: ''
            })
        }
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') this.onClickSignInButton()
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
    onClickSignInButton = async () => {
        await this.props.postSignIn(this.state.email, this.state.password);
        if (this.props.signIn === true) {
            this.toggleModal();
            this.setState({ feedBackMessage: '' })
        } else {
            this.setState({ feedBackMessage: '이메일이나 비밀번호를 확인해주십시오.' })
        }
    }

    onClickSignOutButton = () => {
        this.props.getSignOut();
    }

    componentDidMount = () => {
        this.props.checkSignIn();
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
                        <FormText color="danger" size="12">
                            {this.state.feedBackMessage}
                        </FormText>
                        <Input
                            type="email"
                            id="email_input"
                            placeholder="SNU MAIL"
                            value={this.state.email}
                            onKeyPress={this.onKeyPress}
                            onChange={(event) => this.setState({ email: event.target.value })}></Input>
                        <Input
                            type="password"
                            id="password_input"
                            placeholder="PASSWORD"
                            value={this.state.password}
                            onKeyPress={this.onKeyPress}
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
        checkSignIn: () =>
            dispatch(actionCreator.checkSignIn()),
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