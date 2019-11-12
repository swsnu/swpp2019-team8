import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index'

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export class SearchBar extends Component {
    state = {
        searchInput: ''
    }

    onKeyPress = event => {
        if (event.key === 'Enter') this.onClickSearchConfirmButton()
    }

    onChangeSearchInput = event => {
        this.setState({ searchInput: event.target.value });
    };

    onClickSearchConfirmButton = async () => {
        let toSearch = this.state.searchInput
        let input = toSearch;
        for (var i = toSearch.length - 1; i >= 0; i--) {
            if (toSearch[i] !== ' ') break;
            else input = toSearch.slice(0, i)
        }
        await this.props.getDocumentByTitle(input)
        if (this.props.selectedDocument !== null) this.props.history.push('/tell_me/documents/' + this.props.selectedDocument.title)
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
                        onKeyPress={this.onKeyPress}
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

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SearchBar));

