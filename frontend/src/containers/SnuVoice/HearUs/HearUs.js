import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button, Input, InputGroup, InputGroupAddon, Table } from "reactstrap";

import UpperBar from "../UpperBar/UpperBar";
import Category from "../../../components/Category/category";
import Petition from "../../../components/Petition/petition";
import * as actionCreator from '../../../store/actions/index'

import "./HearUs.css";

class HearUs extends Component {
  state = {
    search: ""
  };

  onChangeSearchInput = event => {
    this.setState({ search: event.target.value });
  };

  onClickSearchConfirmButton = event => {
    // 백엔드 구현이후 추가 예정
    window.sessionStorage.setItem('petitionSearch', this.state.search)
    this.props.history.push("/hear_us/create");
  };

  onClickCreateButton = () => {
    this.props.history.push("/hear_us/create");
  };

  onClickMyPetitionButton = () => {
    this.props.history.push("/hear_us/my_petition/:user_id");
  };

  onClickCategoryButton = event => {
    // petition 을 category 따라 들고오기
  };

  onClickDetailButton = event => {
    // petion detail로 redirect
    this.props.history.push("/hear_us/" + event.target.value);
  };

  onClickListButton = () => {
    this.props.history.push("/hear_us/petitions");
  };

  componentDidMount = () => {
    window.sessionStorage.removeItem('petitionSearch')
    this.props.getAllPetitions();
  }

  render() {
    let category = <Category onClick={this.onClickCategoryButton} />;
    let voteList, deadlineList;
    console.log(this.props.petitionList)

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
    );


      voteList = (
        this.props.petitionList
          .sort((a, b) => a.votes > b.votes)
          .map((petition, i) => {
            if (i < 5) {
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

      );
      deadlineList = (
        this.props.petitionList.map((petition, i) => {
          if (i < 5) {
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

      );
  
    return (
      <div>
        <UpperBar />
        <div className="TopOfPage">
          <br/>
        <div className="HearUs">
          <h1>Hear Us</h1>
          <br/>
          <InputGroup>
            <Input
              type="text"
              id="search_input"
              autoFocus
              onChange={this.onChangeSearchInput}
            ></Input>
            <InputGroupAddon addonType="append">
              <Button
                type="button"
                id="search_confirm_button"
                onClick={this.onClickSearchConfirmButton}
              >
                Search
              </Button>
            </InputGroupAddon>
          </InputGroup>
          </div>
          <br/>
          <div className="UserOptions">
          <Button
            type="button"
            id="create_button"
            onClick={this.onClickCreateButton}
          >
            NEW
          </Button>
          <Button
            type="button"
            id="my_petition_button"
            onClick={this.onClickMyPetitionButton}
          >
            MINE
          </Button>
          </div>
          <br></br><br/>
          <div className="Category">{category}</div>
          <br/><br/><br/>
          <div className="Tables">
            <br/>
          <h5><b>Top 5 Votes</b></h5>
          {tableHead}
          {voteList}
          <br/>
          <h5><b>Latest 5</b></h5>
          {tableHead}
          {deadlineList}
          <br/>
          </div>
          <br />
          <Button
            type="button"
            id="petition_list_button"
            onClick={this.onClickListButton}
          >
            +
          </Button>
          <br/>
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
    petitionList: state.hu.petition_list
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HearUs));
