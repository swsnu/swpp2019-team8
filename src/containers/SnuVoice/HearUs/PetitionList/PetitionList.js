import React, { Component } from 'react';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, ButtonGroup, Input, InputGroup, InputGroupAddon, Table, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

import UpperBar from '../../UpperBar/UpperBar'
import Petition from '../../../../components/Petition/petition'
import Category from '../../../../components/Category/category'

class PetitionList extends Component {
    state = {
        search: '',
        petitionState: 'ongoing',
        petitionOrder: 'vote'
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
                        <Petition key={1} id={1} state={"ongoing"} title={"Funny SWPP"} category={"인권"}
                            dueDate={"2019.10.19"} votes={123} onClick={this.onClickDetailButton} />
                    </TabPane>
                    <TabPane tabId='end'>
                        <Category />
                        <br />
                        {petitionOrderButtons}
                        {tableHead}
                        <Petition key={1} id={2} state={"ongoing"} title={"Funny SWPP"} category={"인권"}
                            dueDate={"2019.10.19"} votes={123} onClick={this.onClickDetailButton} />
                    </TabPane>
                </TabContent>



            </div>
        )
    }
}

export default connect(null, null)(withRouter(PetitionList));