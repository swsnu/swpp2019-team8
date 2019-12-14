import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "reactstrap";

import UpperBar from "../UpperBar/UpperBar";
import Category from "../../../components/Category/category";
import Petition from "../../../components/Petition/petition";
import PetitionTableHeader from "../../../components/Petition/petitionTableHeader";
import * as actionCreator from '../../../store/actions/index'

import "./HearUs.css";

export class HearUs extends Component {
  state = {
    selectedCategory: 'All'
  };

  onClickCategoryButton = event => {
    // petition 을 category 따라 들고오기
    this.setState({ selectedCategory: event.target.value })
  };

  onClickDetailButton = petition => {
    // petion detail로 redirect
    this.props.history.push("/hear_us/petition/" + petition.url);
  };

  onClickListButton = () => {
    this.props.history.push("/hear_us/petitions");
  };

  componentDidMount = () => {
    this.props.getAllPetitions();
  }

  onClickCreateButton = () => {
    this.props.history.push('/hear_us/create')
  }

  onClickMyPetitionButton = () => {
    this.props.history.push('/hear_us/my_petition')
  }

  render() {
    let category = <Category onClick={this.onClickCategoryButton} />;
    let voteList, deadlineList;
    let buttons = '';

    if (this.props.signIn) {
      buttons = (
        <div className="userOptions">
          <Button type="button" id="create_button"
            onClick={this.onClickCreateButton}>NEW</Button>
          <Button type="button" id="my_petition_button"
            onClick={this.onClickMyPetitionButton}>MINE</Button>
        </div>
      )
    }

    if (this.state.selectedCategory === 'All') {
      voteList = (
        this.props.petitionList
          .filter(petition => petition.status === 'ongoing')
          .sort((a, b) => a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0)
          .map((petition, i) => {
            if (i < 5) {
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

      );
      deadlineList = (
        this.props.petitionList
          .filter(petition => petition.status === 'ongoing')
          .sort((a, b) => a.end_date > b.end_date ? -1 : a.end_date < b.end_date ? 1 : 0)
          .map((petition, i) => {
            if (i < 5) {
              return (
                <Petition
                  key={petition.id}
                  url={petition.url}
                  state={petition.status}
                  title={petition.title}
                  votes={petition.votes}
                  category={petition.category}
                  dueDate={petition.end_date}
                  onClick={() => this.onClickDetailButton(petition)} />
              )
            } else return undefined;
          })
      );
    } else {
      voteList = (
        this.props.petitionList
          .filter(petition => petition.category === this.state.selectedCategory && petition.status === 'ongoing')
          .sort((a, b) => a.votes > b.votes ? -1 : a.votes < b.votes ? 1 : 0)
          .map((petition, i) => {
            if (i < 5) {
              return (
                <Petition
                  key={petition.id}
                  url={petition.url}
                  state={petition.status}
                  title={petition.title}
                  category={petition.category}
                  dueDate={petition.end_date}
                  votes={petition.votes}
                  onClick={() => this.onClickDetailButton(petition)} />
              )
            } else return undefined;
          })
      );
      deadlineList = (
        this.props.petitionList
          .filter(petition => petition.category === this.state.selectedCategory && petition.status === 'ongoing')
          .sort((a, b) => a.end_date > b.end_date ? -1 : a.end_date < b.end_date ? 1 : 0)
          .map((petition, i) => {
            if (i < 5) {
              return (
                <Petition
                  key={petition.id}
                  url={petition.url}
                  category={petition.category}
                  dueDate={petition.end_date}
                  votes={petition.votes}
                  state={petition.status}
                  title={petition.title}
                  onClick={() => this.onClickDetailButton(petition)}
                />
              )
            } else return undefined;
          })
      );
    }

    return (
      <div>
        <UpperBar />
        <div className="HearUs">
          <div className="HearUs_body">
          <h1 className="title">Hear Us</h1>
            {/* <h1>Hear Us</h1>
            <br /> */}
            <a className="hearushow" href="/tell_me/documents/HEAR-US:도움말">HEAR-US:도움말</a>
            <br /><br />
            {buttons}
          
          <div className="Category">{category}</div>
          <br /><br /><br />
          <div className="Tables">
            <br />
            <h5 className="table_name"><b>Top 5 Votes</b></h5>
            <PetitionTableHeader/>
            {voteList}
            <br />
            <h5 className="table_name"><b>Latest 5</b></h5>
            <PetitionTableHeader/>
            {deadlineList}
            <br />
          </div>
          <br />
          <Button
            type="button"
            id="petition_list_button"
            onClick={this.onClickListButton}
            >
            +
          </Button>
          <br />
            </div>
        </div>
      </div>
    );
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
    petitionList: state.hu.petition_list,
    selectedUser: state.usr.selectedUser,
    signIn: state.usr.signIn
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HearUs));
