import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input } from 'reactstrap';

class SnuVoice extends Component {
    state = {
        email: '',
        password: '',
        sign_in: false,
    }

    onClickSignUpButton = () => {
        this.props.history.push('/sign_up');
    }

    onClickSignInButton = () => {
        this.setState({ sign_in: true });
    }

    onClickSignOutButton = () => {
        this.setState({ sign_in: false });
    }

    onClickTellMeButton = () => {
        this.props.history.push('/tell_me');
    }

    onClickHearUsButton = () => {
        this.props.history.push('/hear_us');
    }

    render() {
        let upper_bar = null;
        if (this.state.sign_in === false) {
            upper_bar = (
                <div className="UpperBar">
                    <Input type="email" id="email_input" placeholder="SNU MAIL"
                        onChange={(event) => this.setState({ email: event.target.value })}></Input>
                    <Input type="password" id="password_input" placeholder="PASSWORD"
                        onChange={(event) => this.setState({ password: event.target.value })}></Input>
                    <Button type="button" id="sign_in_button"
                        onClick={this.onClickSignInButton}>SIGN-IN</Button>
                    <Button type="button" id="sign_up_button"
                        onClick={this.onClickSignUpButton}>SIGN-UP</Button>
                </div >
            );
        }
        else if (this.state.sign_in === true) {
            upper_bar =
                <div className="UpperBar">
                    <Button type="button" id="sign_out_button"
                        onClick={this.onClickSignOutButton}>SIGN-OUT</Button>
                </div>
        }

        return (
            <div className="SnuVoice">
                {upper_bar}
                <div className="row">
                    <Button type="button" id="tell_me_button"
                        onClick={this.onClickTellMeButton}>TELL-ME</Button>
                    <Button type="button" id="hear_us_button"
                        onClick={this.onClickHearUsButton}>HEAR-US</Button>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(SnuVoice));