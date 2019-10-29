import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Input, InputGroup, InputGroupAddon, Table } from 'reactstrap';

import UpperBar from '../UpperBar/UpperBar'
import Category from '../../../components/Category/category'
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

    onClickCreateButton = () => {
        this.props.history.push('/hear_us/create');
    }

    onClickMyPetitionButton = () => {
        this.props.history.push('/hear_us/my_petition/:user_id');
    }

    onClickCategoryButton = (event) => {
        // petition 을 category 따라 들고오기
    }

    onClickDetailButton = (event) => {
        // petion detail로 redirect
        this.props.history.push('/hear_us/' + event.target.value) 
    }

    onClickListButton = () => {
        this.props.history.push('/hear_us/petitions')

    }


    render() {
        let category = (<Category onClick = {this.onClickCategoryButton}/>)
        let tableHead = (
            <Table hover>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>due</th>
                        <th>votes</th>
                    </tr>
                </thead>
            </Table>
        )
        let voteList = (
            <Petition key={1}  id ={1} state={"ongoing"} title={"Funny SWPP"} category={"인권"}
                dueDate={"2019.10.19"} votes={123} onClick={this.onClickDetailButton} />
        )
        let deadlineList = (
            <Petition key={2} id={2} state={"done"} title={"I LIKE IT!!!"} category={"복지"}
                dueDate={"2019.10.20"} votes={1223} onClick={this.onClickDetailButton} />
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
                    onClick={this.onClickCreateButton}>NEW</Button>
                <Button type="button" id="my_petition_button"
                    onClick={this.onClickMyPetitionButton}>MINE</Button>
                <br></br>
                {category}
                <br></br>
                Top 5 Votes
                {tableHead}
                {voteList}
                Latest 5
                {tableHead}
                {deadlineList}
                <Button type="button" id="petition_list_button"
                    onClick={this.onClickListButton}>+</Button>
            </div>
        )
    }
}

export default connect(null, null)(withRouter(HearUs));