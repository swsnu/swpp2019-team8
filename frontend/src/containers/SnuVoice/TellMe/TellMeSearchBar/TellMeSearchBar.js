import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index'

import SearchButton from '../../../../img/search_button.png';

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export class TellMeSearchBar extends Component {
    state = {
        searchInput: ''
    }

    onKeyPress = event => {
        if (event.key === 'Enter' && this.state.searchInput !== '') this.onClickSearchConfirmButton()
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
        if (input === '' ) return;
        if (/.jpeg$/.exec(input) || /.jpg$/.exec(input) || /.png$/.exec(input) || /.bmp$/.exec(input)){
            await this.props.getPhoto(input)
            if (this.props.selectedPhoto !== null) {
                this.props.history.push('/tell_me/photo/' + input)
                return;
            }
        } else {
            await this.props.getDocumentByTitle(input)
            if (this.props.selectedDocument !== null)  {
                this.props.history.push('/tell_me/documents/' + input)
                return;
            }
        }
        this.props.history.push('/tell_me/search_fail/' + input)
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
                        className="search_input"
                        autoFocus
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeSearchInput}
                    ></Input>
                    <InputGroupAddon addonType="append">
                        <Button
                            type="button"
                            id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}
                            className="search_button"
                            disabled={this.state.searchInput === '' || this.state.searchInput === undefined}
                        >
                            <img src={SearchButton} style={{height: 20}}></img>
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
            dispatch(actionCreator.getDocument(title)),
        getPhoto: (photo_title) =>
            dispatch(actionCreator.getPhoto(photo_title))
    }
}

export const mapStateToProps = state => {
    return {
        selectedDocument: state.tm.selectedDocument,
        selectedPhoto: state.tm.selectedPhoto
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TellMeSearchBar));

