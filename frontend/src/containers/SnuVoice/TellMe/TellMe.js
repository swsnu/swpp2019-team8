import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Button } from "reactstrap";

import UpperBar from "../UpperBar/UpperBar";

import "./TellMe.css";

class TellMe extends Component {
  state = {
  };

  onClickCreateButton = () => {
    this.props.history.push("/tell_me/create");
  };

  render() {
    return (
      <div>
        <UpperBar />
        <div className="TopOfPage">
          <br />
          <div className="Title">
            <h1>Tell Me</h1>
            <h6>
              <i>Ask Anything, Answer Everything</i>
            </h6>
          </div>
          <div className="SearchBar">
          </div>
          <br />
          <div />
          <br />
          <div className="TellMe">
            <br />
            <div className="TellMeText">
              <h5><b>Tell Me 설명글:</b></h5>
              <br />
              예: Tell Me는 무엇인가<br />
              Tell Me의 목적?<br />
              Tell Me의 규정?<br />
              Tell Me의 사용법?<br />
              Tell Me는 마크다운 기반?
           </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button
              className="CreateButton"
              type="button"
              id="create_button"
              onClick={this.onClickCreateButton}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    );
  }
}


export default connect(
  null,
  null
)(withRouter(TellMe));

