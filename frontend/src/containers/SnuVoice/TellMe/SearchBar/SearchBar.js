import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../store/actions/index'

import {
    Button,
    Input
} from 'reactstrap';

export class SearchBar extends Component {
    state = {
        searchInput: ''
    }

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value });
    };

    onClickSearchConfirmButton = () => {
        let toSearch = this.state.searchInput
        for (i = toSearch.length-1 ; i>=0; i++) {
            if (toSearch[i] === ' ' ) break;
            else toSearch.slice(0,i)
        }
        this.props.getDocumentByTitle(toSearch)
    };

    onClickCreateButton = () => {
        this.props.history.push("/tell_me/create");
    };

    render() {
        return (
            <div className="SearchBar">
                <InputGroup>
                    <Input
                        type="text"
                        id="search_input"
                        autoFocus
                        onChange={this.onChangeSearchInput}
                    ></Input>
                    <InputGroupAddon addonType="append">
                        <Button
                            type="button"
                            id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}
                        >
                            Search
              </Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        )
    }

}

export const mapDispatchToProps = dispatch => {
    return {
        getDocumentByTitle: (title) =>
            dispatch(actionCreator.getDocument(title))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(withRouter(SearchBar));

