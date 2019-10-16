import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input } from 'reactstrap';

class UpperBar extends Component {
    state = {
        email: '',
        password: '',
        signIn: false,
    }
    
    onClickSignUpButton = () => {
        this.props.history.push('/sign_up');
    }

    onClickSignInButton = () => {
        this.setState({ signIn: true });
    }

    onClickSignOutButton = () => {
        this.setState({ signIn: false });
    }
    
    render() {
        console.log(window.location);
        let upper_bar = null;
        if (this.state.signIn === false) {
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
        } else if (this.state.signIn === true) {
            upper_bar =
                <div className="UpperBar">
                    <Button type="button" id="sign_out_button"
                        onClick={this.onClickSignOutButton}>SIGN-OUT</Button>
                </div>
        }
        return (
            <div className = "UpperBar">
                {upper_bar}
            </div>
        )
    }
}

export default connect(null, null)(withRouter(UpperBar));