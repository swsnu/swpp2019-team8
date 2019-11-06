import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import UpperBar from '../../UpperBar/UpperBar'
import Petition from '../../../../components/Petition/petition'
import Category from '../../../../components/Category/category'
import * as actionCreator from '../../../../store/actions/index'

class PetitionList extends Component {
    state = {
        search: '',
        petitionState: 'ongoing',
        petitionOrder: 'vote',
        listNumber: [1, 2, 3, 4, 5],
        selectedNumber: 1,
    }

    onChangeSearchInput = (event) => {
        this.setState({ search: event.target.value });
    }

    onClickSearchConfirmButton = (event) => {
        // 리다이렉트
    }

    onClickCreateButton = (event) => {
        this.props.history.push('/hear_us/create')
    }

    onClickMyPetitionButton = (event) => {
        this.props.history.push('/hear_us/my_petition/:user_id')
    }

    onClickPetitionTabButton = (event) => {
        this.setState({ petitionState: event })
    }

    onClickCategoryButton = (event) => {

    }

    onClickPetitionOrderButton = (event) => {
        this.setState({ petitionOrder: event })
    }

    onClickDetailButton = (event) => {
        this.props.history.push('/hear_us/' + event.target.value)
    }

    onClickListPrevButton = (event) => {
        let numbers = this.state.listNumber.map(listNumber => listNumber - 5)
        if (numbers[0] > 0) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] })
        }

    }

    onClickListNumberButton = (event) => {
        this.setState({ selectedNumber: event.target.value })
    }

    onClickListNextButton = (event) => {
        let numbers = this.state.listNumber.map(listNumber => listNumber + 5)
        this.setState({ listNumber: numbers, selectedNumber: numbers[0] })

    }

    componentDidMount = () => {
        this.props.getAllPetitions()
    }




    render() {
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
        let petitionStateTabButtons = (
            <Nav tabs>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.petitionState === 'ongoing' })}
                        id="ongoing_petition_button" onClick={() => this.onClickPetitionTabButton('ongoing')}>
                        Ongoing
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.petitionState === 'end' })}
                        id="ended_petition_button" onClick={() => this.onClickPetitionTabButton('end')}>
                        End
                        </NavLink>
                </NavItem>
            </Nav>

        )
        let petitionOrderButtons = (
            <ButtonGroup>
                <Button type="button" id="top_votes_button" value="topVotes"
                    onClick={this.onClickPetitionOrderButton}>Top Votes</Button>
                <Button type="button" id="latest_button" value="latest"
                    onClick={this.onClickPetitionOrderButton}>Latest</Button>
            </ButtonGroup>
        )

        let listNumbers = this.state.listNumber.map((number, i) => {
            if (this.props.petitionList.length / 10 + 1 >= number) {
                return (
                    <Button type="button" id="list_number_buttons" key={i} value={number}
                        onClick={this.onClickListNumberButton}>{number}</Button>
                );
            }

        });

        let petitionList = (
            this.props.petitionList.map((petition, i) => {
                if (i < this.state.selectedNumber * 10 && i >= (this.state.selectedNumber-1) * 10 ) {
                    return (
                        <Petition
                            key={petition.id}
                            id={petition.id}
                            state={petition.status}
                            title={petition.title}
                            category={petition.category}
                            dueDate={petition.end_date}
                            votes={petition.votes}
                            onClick={this.onClickDetailButton}
                        />
                    )
                }
            })
        )

        let listNumberButtons = (
            <ButtonGroup>
                <Button type="button" id="list_prev_button"
                    onClick={this.onClickListPrevButton}>prev</Button>
                {listNumbers}
                <Button type="button" id="list_next_button"
                    onClick={this.onClickListNextButton}>next</Button>
            </ButtonGroup>
        )

        return (
            <div className="PetitionList">
                <UpperBar />
                <h1>PetitionList</h1>
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
                {petitionStateTabButtons}
                <TabContent activeTab={this.state.petitionState}>
                    <TabPane tabId='ongoing'>
                        <Category />
                        <br />
                        {petitionOrderButtons}
                        {tableHead}
                        {petitionList}
                        {listNumberButtons}
                    </TabPane>
                    <TabPane tabId='end'>
                        <Category />
                        <br />
                        {petitionOrderButtons}
                        {tableHead}
                        {petitionList}
                        {listNumberButtons}
                    </TabPane>
                </TabContent>



            </div>
        )
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getAllPetitions: () =>
            dispatch(actionCreator.getAllPetitions())
    }
}

export const mapStateToProps = state => {
    return {
        petitionList: state.hu.petition_list
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PetitionList));