import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import UpperBar from '../UpperBar/UpperBar'

class HearUs extends Component {
    state = {
        search: ''
    }

    onChangeSearchInput = (event) => {
        this.setState({ search: event.target.value });
    }

    onClickSearchConfirmButton = (event) => {
            // 백엔드 구현이후 추가 예정
    }

    onClickCreateButton = (event) => {
        this.props.history.push('/hear_us/create');
    }

    onClickMyPetitionButton = (event) => {
        this.props.history.push('/hear_us/my_petition/:user_id');
    }

    onClickCategoryButton = (event) => {

    }

    onClickDetailButton = (event) => {

    }

    onClickListButton = (event) => {

    }


    render() {
        return (
            <div className="HearUs">
                <UpperBar />
                <h1>HearUs</h1>
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
                <Button type="button" id="my_petition_button"
                    onClick={this.onClickMyPetitionButton}>MY PETITION</Button>

            </div>
        )
    }
}

export default connect(null, null)(withRouter(HearUs));