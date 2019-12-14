import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../../store/actions/index'

import {
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';

import SearchIcon from '../../../../img/search_button.png';

export class TellMeSearchBar extends Component {
    state = {
        searchInput: '',
        // formText: '',
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
        if (/[/\\]/.exec(toSearch)) {
            alert("\\ and / is not allowed while seraching");
            return;
        }
        for (var i = toSearch.length - 1; i >= 0; i--) {
            if (toSearch[i] !== ' ') break;
            else input = toSearch.slice(0, i)
        }
        if (input === '') return;
        if (/.jpeg$/.exec(input) || /.jpg$/.exec(input) || /.png$/.exec(input) || /.bmp$/.exec(input)) {
            await this.props.getPhoto(input)
            if (this.props.selectedPhoto !== null) {
                this.props.history.push('/tell_me/photo/' + input)
                return;
            }
        } else {
            await this.props.getDocumentByTitle(input)
            if (this.props.selectedDocument !== null) {
                this.props.history.push('/tell_me/documents/' + input)
                return;
            }
        }
        await this.props.getDocumentByTitle(input)
        this.props.history.push('/tell_me/search_fail/' + input)
    };

    render() {
        return (
            <div className="searchBar">
                <InputGroup>
                    <Input
                        type="text"
                        id="search_input"
                        autoFocus
                        onKeyPress={this.onKeyPress}
                        onChange={this.onChangeSearchInput}
                        className="search_input"
                    ></Input>
                    {/* <FormText >
                        {this.state.formText}
                    </FormText> */}
                    <InputGroupAddon addonType="append">
                        <Button
                            type="button"
                            id="search_confirm_button"
                            onClick={this.onClickSearchConfirmButton}
                            disabled={this.state.searchInput === '' || this.state.searchInput === undefined}
                            className="search_confirm_button"
                        >
                            <img src={SearchIcon} style={{ height: 35 }} alt="Search icon"/>
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

