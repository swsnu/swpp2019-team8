import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index';

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export class HearUsSearchBar extends Component {
    state = {
        searchInput: '',
    }

    onKeyPress = (event) => {
        if (event.key === 'Enter' && this.state.searchInput !== '') this.onClickSearchConfirmButton();
    }

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value });
    };

    onClickSearchConfirmButton = () => {
        let toSearch = this.state.searchInput
        let input = toSearch;
        if (/[/\\]/.exec(toSearch)) {
            alert("\\ and / is not allowed while seraching");
            return;
        }
        for (var i = toSearch.length - 1; i >= 0; i--) {
            if (toSearch[i] !== ' ') break;
            else input = toSearch.slice(0, i)
        }
        if(input === '') return;
        this.props.history.push('/hear_us/search/' + input);
        this.props.getPetitionByTitle(input);
    }

    render() {    
        return (
            <div>
                <InputGroup className="searchBar">
                    <Input type="text" id="search_input" autoFocus
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeSearchInput}
                        ></Input>
                    <InputGroupAddon addonType="append">
                        <Button type="button" id="search_confirm_button"
                            disabled={this.state.searchInput === '' || this.state.searchInput === undefined}
                            onClick={this.onClickSearchConfirmButton}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div >
        )
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getPetitionByTitle: (title) =>
            dispatch(actionCreator.getPetitionByTitle(title))
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
    mapDispatchToProps
)(withRouter(HearUsSearchBar));