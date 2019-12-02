import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Button, Table } from 'reactstrap';

import Upperbar from "../../UpperBar/UpperBar";
import Petition from "../../../../components/Petition/petition";
import * as actionCreator from "../../../../store/actions/index";


export class MyPetition extends Component {
  state = {
    selectedCategory: "All"
  }

  componentDidMount = async () => {
    await this.props.getCurrentUser(this.props.selectedUser.id);
    await this.props.getPetitionByUser(this.props.selectedUser.id);
  }

  onClickDetailButton = (petition) => {
    this.props.history.push('/hear_us/petition/' + petition.url)
  }

  // onClickCategoryButton = (event) => {
  //   this.setState({ selectedCategory: event.target.value })
  // }

  render() {
    let myPetitionList = this.props.petitionList.map(petition => {
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
      );
    });

    return (
      <div className="TopOfPage">
        <Upperbar />
        <div className="MyPetition">
          <br />
          {/* <SearchBar/> */}
          <h1>{this.props.selectedUser.nickname}`s Petitions</h1>
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
    selectedUser: state.usr.selectedUser,
    petitionList: state.hu.petition_list,
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
