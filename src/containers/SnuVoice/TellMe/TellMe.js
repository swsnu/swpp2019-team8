import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import UpperBar from '../UpperBar/UpperBar'

class TellMe extends Component {
    state = {
        search: ''
    }

    onChangeSearchInput = (event) => {
        this.setState({ search: event.target.value });
    }

    onClickSearchConfirmButton = () => {
        this.props.history.push('/') //리다이렉트 백엔드 구햔하고 해야할듯
    }

    onClickCreateButton = () => {
        this.props.history.push('/tell_me/create');
    }
    render() {
        return (
            <div className="TellMe">
                <UpperBar />
                <h1>TellMe</h1>
                <InputGroup>
                    <Input type="text" id="search_input" autoFocus
                        onChange={this.onChangeSearchInput}></Input>
                    <InputGroupAddon addonType="append">
                        <Button type="button" id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <Button type="button" id="create_button"
                    onClick={this.onClickCreateButton}>Create</Button>
            </div>
        );
    }
}

export default connect(null, null)(withRouter(TellMe));