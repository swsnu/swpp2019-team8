import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreator from '../../../store/actions/index';

import { Button } from "reactstrap";

import UpperBar from "../UpperBar/UpperBar";

import "./TellMe.css";

class TellMe extends Component {
  state = {
  };

  onClickCreateButton = () => {
    this.props.history.push("/tell_me/create");
  };

  onClickPhotoButton = () => {
    this.props.history.push("/tell_me/photo");
  };

  componentDidMount = async () => {
    await this.props.onGetDocumentList();
  }

  render() {
    let documetList = this.props.documentList.map((document, i) => {
      return (
        <div className="document" key={i}>
          <li key={i}>
            <a href={'document/' + document.title} target="_blank" rel="noopener noreferrer">{document.title}</a>
          </li>
          <br />
        </div>

      )
    })
    return (
      <div className="TellMe">
        <UpperBar />
        <div className="TopOfPage">
          <div />
          <div className="TellMeContent">
            <br />
            <div className="TellMeText">
              <h1>Tell Me</h1>
              <h6>
                <i>Ask Anything, Answer Everything</i>
              </h6>
              <br />
              <a href="/tell_me/document/TELL-ME:기본방침">TELL-ME:기본방침</a>
              <br />
              <a href="/tell_me/document/TELL-ME:문법%20도움말">TELL-ME:문법 도움말</a>
            </div>

            <Button
              className="CreateButton"
              type="button"
              id="create_button"
              onClick={this.onClickCreateButton}
            >
              Create
            </Button>
            <Button
              type="button"
              id="photo_button"
              className="photoButton"
              onClick={this.onClickPhotoButton}
            >
              Upload Photo
          </Button>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => {
  return {
    documentList: state.tm.documents
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    onGetDocumentList: () =>
      dispatch(actionCreator.getLatestDocuments())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TellMe));
