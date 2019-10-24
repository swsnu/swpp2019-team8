import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input } from 'reactstrap';

class UpperBar extends Component {
    state = {
        email: '',
        password: '',
        signIn: false,
        location: ''
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

    onClickSignInButton = () => {
        this.setState({ signIn: true });
    }

    onClickSignOutButton = () => {
        this.setState({ signIn: false });
    }

    componentDidMount = () => {
        if (/tell_me/.exec(window.location.href)) {
            this.setState({ location: 'tell_me' });
        } else if (/hear_us/.exec(window.location.href)) {
            this.setState({ location: 'hear_us' });
        }
    }

    render() {
        let crossover = null;
        let upperBar = null;

        if (this.state.location !== '') {
            crossover = (
                <div className="CrossOver">
                    <Button type="button" id="crossover_button"
                        onClick={this.onClickCrossOverButton}>HueHue</Button>
                </div>
            );
        }

        if (this.state.signIn === false) {
            upperBar = (
                <nav className="UpperBar" class="navbar bg-dark">
                    <a class="navbar-brand" href="/">SNUVOICE</a>
                    <form class="form-inline">
                        <Input type="email" id="email_input" placeholder="SNU MAIL"
                            onChange={(event) => this.setState({ email: event.target.value })}></Input>
                        <Input type="password" id="password_input" placeholder="PASSWORD"
                            onChange={(event) => this.setState({ password: event.target.value })}></Input>
                        <Button type="button" id="sign_in_button"
                            onClick={this.onClickSignInButton}>SIGN-IN</Button>
                        <Button type="button" id="sign_up_button"
                            onClick={this.onClickSignUpButton}>SIGN-UP</Button>
                    </form>
                </nav>
            );
        } else if (this.state.signIn === true) {
            upperBar = (
                <nav className="UpperBar" class="navbar bg-dark">
                    <a class="navbar-brand" href="/">SNUVOICE</a>
                    <form class="form-inline">
                        <Button type="button" id="sign_out_button"
                            onClick={this.onClickSignOutButton}>SIGN-OUT</Button>
                    </form>
                </nav>
            );
        }
        
        return (
            <div className="UpperBar">
                {crossover}
                {upperBar}
            </div>
        );
    }
}

export default connect(null, null)(withRouter(UpperBar));