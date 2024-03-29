import React, { Component } from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import * as actionCreator from '../../../store/actions/index';

import { Button, Col, Row } from "reactstrap";

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
    let documentList = this.props.documentList.map((document, i) => {
      return (
        <div className="recent_document" key={i}>
          <div key={i}>
            <Link to={'/tell_me/documents/' + document.title}>{document.title}</Link>
          </div>
        </div>

      )
    })

    return (
      <div className="TellMe">
        <UpperBar />
        <div className="TellMe_body">
          <div />
          <Row>
            <Col>
              <div className="TellMeContent">
                <div className="TellMeText">
                  <h1>Tell Me</h1>
                  <h6>
                    <i>Ask Anything, Answer Everything</i>
                  </h6>
                  <br />
                  <a href="/tell_me/documents/TELL-ME:기본방침">TELL-ME:기본방침</a>
                  <br />
                  <a href="/tell_me/documents/TELL-ME:문법%20도움말">TELL-ME:문법 도움말</a>
                  <br />
                  <br />
                  Tell Me is a wiki  service <b>ONLY FOR SNU</b>.
                  <br />
                  <br />
                  Visit Tell Me to access the <i>newest, temporary, verified</i> SNU-related information.
                  </div>

                <Button
                  className="tellme_create_button"
                  type="button"
                  id="create_button"
                  onClick={this.onClickCreateButton}
                >
                  Create Page
            </Button>
                <Button
                  type="button"
                  id="photo_button"
                  className="tellme_photo_button"
                  onClick={this.onClickPhotoButton}
                >
                  Upload Photo
          </Button>
              </div>
            </Col>
            <Col className="tellme_right" md={2}>
              <div className="recent_documents">
                <h6><b>Recently Edited</b></h6>
                {documentList}
              </div>
            </Col>
          </Row>
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
