import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col,
  Row,
  Container
} from "reactstrap";

class SignUp extends Component {
  state = {
    email: "",
    verifyCode: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    studentId: "",
    selectedDepartment: "all",
    selectedMajor: "", // ex) 컴퓨터공학부...
    agreeToTerms: false,
    verify: false,
    genderRadio: {
      male: false,
      female: false,
      etc: false
    },
    statusRadio: {
      student: false,
      alumnus: false,
      faculty: false
    },
    studentRadio: {
      undergrad: false,
      grad: false,
      doctor: false
    },
    departmentList: [
      { value: "-" },
      { value: "Humanities" },
      { value: "Social Sciences" },
      { value: "Natural Sciences" },
      { value: "Business Administration" },
      { value: "Nursing" },
      { value: "Engineering" },
      { value: "Agriculture and Life Sciences" },
      { value: "Fine Arts" },
      { value: "Education" },
      { value: "Human Ecology" },
      { value: "Veterinary Medicine" },
      { value: "Pharmacy" },
      { value: "Music" },
      { value: "Medicine" },
      { value: "Liberal Studies" }
    ], // ex() 공대, 농생대
    majorList: {
      all: [{ value: "" }],
      Engineering: [{ value: "hi" }, { value: "temp" }],
      hi: [{ value: "asdasd" }, { value: "asdasd" }]
    },
    checkInputResult: {
      email: false,
      verfiyCode: false,
      password: false,
      passwordConfirm: false,
      nickname: false,
      studentId: false
    }
  };

  onChangeEmailInput = event => {
    this.setState({ email: event.target.value });
  };

  onChangeVerifyCodeInput = event => {
    this.setState({ verifyCode: event.target.value });
  };

  onChangePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  onChangePasswordComfirmInput = event => {
    this.setState({ passwordConfirm: event.target.value });
  };

  onChangeNicknameInput = event => {
    this.setState({ nickname: event.target.value });
    // 나중에 중복체크 해야할 때 써야할듯 하하
  };

  onChangeGenderRadioButton = event => {
    let temp = this.state.genderRadio;
    for (let i in temp) {
      if (i === event.target.value) temp[i] = event.target.checked;
      else temp[i] = false;
    }
    this.setState({ genderRadio: temp });
  };

  onChangeStatusRadioButton = event => {
    let temp = this.state.statusRadio;
    for (let i in temp) {
      if (i === event.target.value) temp[i] = event.target.checked;
      else temp[i] = false;
    }
    this.setState({ statusRadio: temp });
  };

  onChagneStuentIdInput = event => {
    this.setState({ studentId: event.target.value });
  };

  onChangeStudentRadioButton = event => {
    let temp = this.state.studentRadio;
    for (let i in temp) {
      if (i === event.target.value) temp[i] = event.target.checked;
      else temp[i] = false;
    }
    this.setState({ studentRadio: temp });
  };

  onChangeDepartmentSelect = event => {
    this.setState({ selectedDepartment: event.target.value });
  };

  onChangeMajorSelect = event => {
    this.setState({ selectedMajor: event.target.value });
  };

  onClickAgreeToTermsCheckBox = () => {
    this.setState({ agreeToTerms: !this.state.agreeToTerms });
  };

  onClickVerifyButton = () => {};

  onClickSignUpConfirmButton = () => {
    this.props.history.push("/");
  };

  onClickBackButton = () => {
    this.props.history.push("/");
  };

  render() {
    let status_detail = null;

    if (this.state.statusRadio["student"]) {
      const departmentList = this.state.departmentList.map((v, i) => {
        return <option key={i} value={v.value} label={v.value}></option>;
      });
      const majorList = this.state.majorList[this.state.selectedDepartment].map(
        (v, i) => {
          return <option key={i} value={v.value} label={v.value}></option>;
        }
      );

      status_detail = (
        <div className="StatusDetail">
          <FormGroup>
            <Input
              type="text"
              id="student_id_input"
              placeholder="STUDENT ID"
              onChange={this.onChagneStuentIdInput}
            ></Input>
            <br />
            <Label>Degree</Label>
            <Row>
              <Col>
                <Input
                  type="radio"
                  name="student_radio"
                  id="student_undergrad_radio"
                  value="undergrad"
                  onChange={this.onChangeStudentRadioButton}
                ></Input>
                UNDERGRAD
              </Col>
              <Col>
                <Input
                  type="radio"
                  name="student_radio"
                  id="student_grad_radio"
                  value="grad"
                  onChange={this.onChangeStudentRadioButton}
                ></Input>
                GRADUATE
              </Col>
              <Col>
                <Input
                  type="radio"
                  name="student_radio"
                  id="student_doctor_radio"
                  value="doctor"
                  onChange={this.onChangeStudentRadioButton}
                ></Input>
                DOCTOR
              </Col>
              <br />
              College of...
              <Input type="select" onChange={this.onChangeDepartmentSelect}>
                {departmentList}
              </Input>
              Major
              <Input type="select" onChange={this.onChangeMajorSelect}>
                {majorList}
              </Input>
            </Row>
          </FormGroup>
        </div>
      );
    }

    return (
      <div className="SignUp">
        <h1>Sign Up</h1>
        <Container>
          <Form>
            <textarea rows="5" cols="80">
              약관 적어넣기 약관 적어넣기
            </textarea>
            <FormGroup>
              <Input
                type="checkbox"
                id="agree_to_terms_checkbox"
                checked={this.state.agreeToTerms}
                onChange={() => this.onClickAgreeToTermsCheckBox()}
              />
              Agree
            </FormGroup>
            <Col md={{ size: 4, offset: 4 }}>
              <FormGroup row>
                <Label>SNU MAIL</Label>
                <InputGroup>
                  <Input
                    type="email"
                    id="email_input"
                    placeholder="SNU MAIL"
                    onChange={this.onChangeEmailInput}
                  ></Input>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>@snu.ac.kr</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <Button
                  type="button"
                  id="verify_button"
                  onClick={this.onClickVerifyButton}
                  className="float-right"
                >
                  Verify
                </Button>
              </FormGroup>
              <FormGroup row>
                <Label>VERIFY CODE</Label>
                <Input
                  type="text"
                  id="verify_code_input"
                  placeholder="VERIFY CODE"
                  onChange={this.onChangeVerifyCodeInput}
                ></Input>
              </FormGroup>
              <FormGroup row>
                <Label>PASSWORD</Label>
                <Input
                  type="password"
                  id="password_input"
                  placeholder="PASSWORD"
                  onChange={this.onChangePasswordInput}
                ></Input>
              </FormGroup>
              <FormGroup row>
                <Label>PASSWORD-CONFIRM</Label>
                <Input
                  type="password"
                  id="password_confirm_input"
                  placeholder="PASSWORD CONFIRMATION"
                  onChange={this.onChangePasswordComfirmInput}
                ></Input>
              </FormGroup>
              <FormGroup row>
                <Label>NICKNAME</Label>
                <Input
                  type="text"
                  id="nickname_input"
                  placeholder="NICKNAME"
                  onChange={this.onChangeNicknameInput}
                ></Input>
              </FormGroup>
              {/* // radio input : label을 클릭해야 작동(글씨) */}
              <Label>GENDER</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="radio"
                      name="gender_radio"
                      id="gender_male_radio"
                      value="male"
                      onChange={this.onChangeGenderRadioButton}
                    ></Input>
                    MALE&emsp;
                  </Col>
                  <Col>
                    <Input
                      type="radio"
                      name="gender_radio"
                      id="gender_female_radio"
                      value="female"
                      onChange={this.onChangeGenderRadioButton}
                    ></Input>
                    FEMALE
                  </Col>
                  <Col>
                    <Input
                      type="radio"
                      name="gender_radio"
                      id="gender_etc_radio"
                      value="etc"
                      onChange={this.onChangeGenderRadioButton}
                    ></Input>
                    ETC
                  </Col>
                </Row>
              </FormGroup>
              <br/>
              <Label>STATUS</Label>
              <FormGroup>
                <Row>
                  <Col>
                    <Input
                      type="radio"
                      name="status_radio"
                      id="status_student_radio"
                      value="student"
                      onChange={this.onChangeStatusRadioButton}
                    ></Input>
                    STUDENT
                  </Col>
                  <Col>
                    <Input
                      type="radio"
                      name="status_radio"
                      id="status_alumnus_radio"
                      value="alumnus"
                      onChange={this.onChangeStatusRadioButton}
                    ></Input>
                    ALUMNUS
                  </Col>
                  <Col>
                    <Input
                      type="radio"
                      name="status_radio"
                      id="status_faculty_radio"
                      value="faculty"
                      onChange={this.onChangeStatusRadioButton}
                    ></Input>
                    FACULTY
                  </Col>
                </Row>
              </FormGroup>
              {status_detail}
              <Button
                type="button"
                id="back_button"
                onClick={this.onClickBackButton}
                className="float-right"
              >
                BACK
              </Button>
              <Button
                type="button"
                id="confirm_button"
                onClick={this.onClickSignUpConfirmButton}
                className="float-right"
              >
                CONFIRM
              </Button>
            </Col>
          </Form>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(withRouter(SignUp));
