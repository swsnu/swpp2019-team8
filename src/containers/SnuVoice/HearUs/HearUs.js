import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input, InputGroup, InputGroupAddon, Table } from 'reactstrap';

import UpperBar from '../UpperBar/UpperBar'
import Petition from '../../../components/Petition/petition'

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
        let table = (
            <Table hover>
                <thead>
                    <th>State</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>due</th>
                    <th>votes</th>
                </thead>
            </Table>
        )
        let votes = (
            <Petition key={1} state={"ongoing"} title={"Funny SWPP"} category={"인권"}
                dueDate={"2019.10.19"} votes={123} onClickDetailButton={this.onClickDetailButton} />
        )
        let deadLine = (
            <Petition key={2} state={"done"} title={"I LIKE IT!!!"} category={"복지"}
                dueDate={"2019.10.20"} votes={1223} onClickDetailButton={this.onClickDetailButton} />
        )
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
                {table}
                {votes}
                {table}
                {deadLine}

            </div>
        )
    }
}

export default connect(null, null)(withRouter(HearUs));