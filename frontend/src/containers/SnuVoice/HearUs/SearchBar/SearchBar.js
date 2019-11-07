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

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value });
    };

    onClickSearchConfirmButton = () => {
        let toSearch = this.state.searchInput
        for (var i = toSearch.length - 1; i >= 0; i--) {
            if (toSearch[i] === ' ') break;
            else toSearch.slice(0, i)
        }
        window.sessionStorage.setItem('petitionSearch', toSearch)
        this.props.history.push('/hear_us/search')
    }

    onClickCreateButton = () => {
        this.props.history.push('/hear_us/create')
    }

    onClickMyPetitionButton = () => {
        this.props.history.push('/hear_us/my_petition/' + this.props.selectedUser.id)
    }

    render() {
        return (
            <div>
                <InputGroup className="searchBar">
                    <Input type="text" id="search_input" autoFocus
                        onChange={this.onChangeSearchInput}></Input>
                    <InputGroupAddon addonType="append">
                        <Button type="button" id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
                <br />
                <div className="userOptions">
                    <Button type="button" id="create_button"
                        onClick={this.onClickCreateButton}>NEW</Button>
                    <Button type="button" id="my_petition_button"
                        onClick={this.onClickMyPetitionButton}>MINE</Button>
                </div>
            </div >
        )
    }
}

export default connect(
    null,
    null
)(withRouter(SearchBar));