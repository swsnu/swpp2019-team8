import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Upperbar from "../../UpperBar/UpperBar";
import Petition from "../../../../components/Petition/petition";
import Category from "../../../../components/Category/category";
import * as actionCreator from "../../../../store/actions/index";

class MyPetition extends Component {
  state = {
    selectedCategory: "All"
  };

  componentDidMount = () => {
    this.props.getPetitionByUser(this.props.selectedUser.id);
  };

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
          <h1>MyPetition</h1>
          <br />
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
      dispatch(actionCreator.getMyPetitions(user_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPetition));
