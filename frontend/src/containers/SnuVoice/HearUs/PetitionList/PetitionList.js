import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import UpperBar from '../../UpperBar/UpperBar'
import Petition from '../../../../components/Petition/petition'
import Category from '../../../../components/Category/category'
import PetitionTableHeader from '../../../../components/Petition/petitionTableHeader';
import * as actionCreator from '../../../../store/actions/index'

import './PetitionList.css';

class PetitionList extends Component {
    state = {
        petitionState: 'ongoing',
        petitionOrder: 'vote',
        listNumber: [1, 2, 3, 4, 5],
        selectedNumber: 1,
        selectedCategory: 'All',
    }

    onClickPetitionTabButton = (event) => {
        this.setState({ petitionState: event })
    }

    onClickCategoryButton = (event) => {
        this.setState({ selectedCategory: event.target.value })
    }

    onClickPetitionOrderButton = (event) => {
        this.setState({ petitionOrder: event.target.value })
    }

    onClickDetailButton = (petition) => {
        this.props.history.push('/hear_us/petition/' + petition.url)
    }

    onClickListPrevButton = () => {
        let numbers = this.state.listNumber.map(listNumber => listNumber - 5)
        if (numbers[0] > 0) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] })
        }

    }

    onClickListNumberButton = (event) => {
        this.setState({ selectedNumber: event.target.value })
    }

    onClickListNextButton = () => {
        let numbers = this.state.listNumber.map(listNumber => listNumber + 5)
        if (this.props.petitionList.length / 10 + 1 >= numbers[0]) {
            this.setState({ listNumber: numbers, selectedNumber: numbers[0] })
        }
    }

    componentDidMount = () => {
        if (this.props.match.params.petition_title === undefined) this.props.getAllPetitions()
        else this.props.getPetitionByTitle(this.props.match.params.petition_title)
    }




    render() {
        let petitionList, sortedPetitionList;

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
                <Button type="button" id="top_votes_button" value="vote"
                    onClick={this.onClickPetitionOrderButton}>Top Votes</Button>
                <Button type="button" id="latest_button" value="latest"
                    onClick={this.onClickPetitionOrderButton}>Latest</Button>
            </ButtonGroup>
        )

        let listNumbers = this.state.listNumber.map((number, i) => {
            if (this.props.petitionList.length / 10 + 1 > number) {
                return (
                    <Button type="button" id="list_number_buttons" key={i} value={number}
                        onClick={this.onClickListNumberButton}>{number}</Button>
                );
            } else return undefined;

        });


        if (this.state.selectedCategory === 'All') {
            petitionList =
                this.props.petitionList
                    .filter(petition =>
                        petition.status === this.state.petitionState)

        } else {
            petitionList = (
                this.props.petitionList
                    .filter(petition =>
                        petition.category === this.state.selectedCategory
                        && petition.status === this.state.petitionState)
            )
        }

        if (this.state.petitionOrder === 'vote') {
            sortedPetitionList = petitionList
                .sort((a, b) => a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0)
                .map((petition, i) => {
                    if (i < this.state.selectedNumber * 10 && i >= (this.state.selectedNumber - 1) * 10) {
                        return (
                            <Petition
                                key={petition.id}
                                url={petition.url}
                                title={petition.title}
                                state={petition.status}
                                category={petition.category}
                                dueDate={petition.end_date}
                                votes={petition.votes}
                                onClick={() => this.onClickDetailButton(petition)}
                            />
                        )
                    } else return undefined;
                })
        } else {
            sortedPetitionList = petitionList
                .sort((a, b) => a.start_date > b.start_date ? -1 : a.start_date < b.start_date ? 1 : 0)
                .map((petition, i) => {
                    if (i < this.state.selectedNumber * 10 && i >= (this.state.selectedNumber - 1) * 10) {
                        return (
                            <Petition
                                key={petition.id}
                                url={petition.url}
                                category={petition.category}
                                dueDate={petition.end_date}
                                state={petition.status}
                                title={petition.title}
                                votes={petition.votes}
                                onClick={() => this.onClickDetailButton(petition)}
                            />
                        )
                    } else return undefined;
                })

        }

        let listNumberButtons = (
            <ButtonGroup>
                <Button type="button" id="list_prev_button" disabled={this.state.listNumber[0] === 1}
                    onClick={this.onClickListPrevButton}>prev</Button>
                {listNumbers}
                <Button type="button" id="list_next_button" disabled={this.state.listNumber[0] + 5 > this.props.petitionList.length / 10 + 1}
                    onClick={this.onClickListNextButton}>next</Button>
            </ButtonGroup>
        )

        return (
            <div>

                <UpperBar />
                <div className="TopOfPage">
                    <br />
                    <div className="PetitionList">
                        <h4>Petition List</h4>
                        <br />
                    </div>
                    <br />
                    {petitionStateTabButtons}
                    <TabContent activeTab={this.state.petitionState}>
                        <TabPane tabId='ongoing'>
                            <br />
                            <div className="tableButtons1">
                                {petitionOrderButtons}<br />
                            </div>
                            <br />
                            <br />
                            <div className="tableButtons2">
                                <Category onClick={this.onClickCategoryButton} />
                            </div>
                            <br /><br /><br />
                            <div className="Tables">

                                <PetitionTableHeader />
                                {sortedPetitionList}
                            </div>
                            {listNumberButtons}
                        </TabPane>
                        <TabPane tabId='end'>
                            <br />
                            <div className="tableButtons1">

                                {petitionOrderButtons}<br />
                            </div>
                            <br />
                            <br />
                            <div className="tableButtons1">
                                <Category onClick={this.onClickCategoryButton} />
                            </div>
                            <br /><br /><br />
                            <div className="Tables">

                                <PetitionTableHeader />
                                {sortedPetitionList}
                            </div>
                            {listNumberButtons}
                        </TabPane>
                    </TabContent>


                </div>

            </div>
        )
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        getAllPetitions: () =>
            dispatch(actionCreator.getAllPetitions()),
        getPetitionByTitle: (title) =>
            dispatch(actionCreator.getPetitionByTitle(title))
    }
}

export const mapStateToProps = state => {
    return {
        selectedUser: state.usr.selectedUser,
        petitionList: state.hu.petition_list
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(PetitionList));