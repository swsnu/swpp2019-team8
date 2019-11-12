import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export class SearchBar extends Component {
    state = {
        serachInput: '',
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter') this.onClickSearchConfirmButton();
    }

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value });
    };

    onClickSearchConfirmButton = () => {
        let toSearch = this.state.searchInput
        let input = toSearch;
        for (var i = toSearch.length - 1; i >= 0; i--) {
            if (toSearch[i] !== ' ') break;
            else input = toSearch.slice(0, i)
        }
        window.sessionStorage.setItem('petitionSearch', input)
        this.props.history.push('/hear_us/search')
    }

    onClickCreateButton = () => {
        this.props.history.push('/hear_us/create')
    }

    onClickMyPetitionButton = () => {
        this.props.history.push('/hear_us/my_petition/' + this.props.selectedUser.id)
    }

    render() {
        let buttons = '';
        if (this.props.signIn === true) {
            buttons = (
                <div className="userOptions">
                    <Button type="button" id="create_button"
                        onClick={this.onClickCreateButton}>NEW</Button>
                    <Button type="button" id="my_petition_button"
                        onClick={this.onClickMyPetitionButton}>MINE</Button>
                </div>
            )
        }
        return (
            <div>
                <InputGroup className="searchBar">
                    <Input type="text" id="search_input" autoFocus onKeyPress={this.onKeyPress}
                        onChange={this.onChangeSearchInput}></Input>
                    <InputGroupAddon addonType="append">
                        <Button type="button" id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br />
                {buttons}
            </div >
        )
    }
}

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        signIn: state.usr.signIn
    }
}

export default connect(
    mapStateToProps,
    null
)(withRouter(SearchBar));