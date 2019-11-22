import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Button, Table } from 'reactstrap';

import Upperbar from "../../UpperBar/UpperBar";
import Petition from "../../../../components/Petition/petition";
import Category from "../../../../components/Category/category";
import * as actionCreator from "../../../../store/actions/index";
import SearchBar from "../SearchBar/SearchBar";

class MyPetition extends Component {
  state = {
    selectedCategory: "All"
  }

  componentDidMount = () => {
    this.props.getCurrentUser(this.props.selectedUser.id);
    this.props.getPetitionByUser(this.props.selectedUser.id);
  }

  onClickDetailButton = (event) => {
    this.props.history.push('/hear_us/' + event.target.value)
    }

    onClickCategoryButton = (event) => {
        this.setState({ selectedCategory: event.target.value })
    }

  render() {
    let myPetitionList = this.props.petitionList.map(petition => {
      return (
        <Petition
          key={petition.id}
          id={petition.id}
          title={petition.title}
          state={petition.status}
          category={petition.category}
          dueDate={petition.end_date}
          votes={petition.votes}
          onClick={this.onClickDetailButton}
        />
      );
    });

    return (
      <div>
        <Upperbar />
        <div className="TopOfPage">
          <br />
          {/* <SearchBar/> */}
    <h1>{this.props.selectedUser.nickname}'s Petitions</h1>
          <br />
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
          {myPetitionList}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    petitionList: state.hu.petition_list,
    selectedUser: state.usr.selectedUser
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getPetitionByUser: user_id =>
      dispatch(actionCreator.getMyPetitions(user_id)),

    getCurrentUser: user_id =>
        dispatch(actionCreator.getUserByUserId(user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPetition));
