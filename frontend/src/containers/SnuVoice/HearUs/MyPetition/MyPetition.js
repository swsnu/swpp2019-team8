import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Button, Table } from 'reactstrap';

import Upperbar from "../../UpperBar/UpperBar";
import Petition from "../../../../components/Petition/petition";
import PetitionTableHeader from "../../../../components/Petition/petitionTableHeader";
import * as actionCreator from "../../../../store/actions/index";


export class MyPetition extends Component {
  state = {
    selectedCategory: "All"
  }

  componentDidMount = async () => {
    await this.props.getCurrentUser();
    if (this.props.signIn) {
      this.props.getPetitionByUser(this.props.selectedUser.id);
    } else {
      alert("You must be logged in to see your petitions")
      this.props.history.push('/hear_us');
    }
  }

  onClickDetailButton = (petition) => {
    this.props.history.push('/hear_us/petition/' + petition.url)
  }

  // onClickCategoryButton = (event) => {
  //   this.setState({ selectedCategory: event.target.value })
  // }

  ngOnInit = async () => {
    await this.props.getCurrentUser();
    if(!this.props.signIn) {
      this.props.history.push("/hear_us");
    }
  }

  render() {
    this.ngOnInit();

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
          <h1>{this.props.selectedUser.nickname}&apos;s Petitions</h1>
          <br />
          <PetitionTableHeader/>
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
    signIn: state.usr.signIn
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    getPetitionByUser: user_id =>
      dispatch(actionCreator.getMyPetitions(user_id)),

    getCurrentUser:  ()=>
      dispatch(actionCreator.checkSignIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyPetition));
