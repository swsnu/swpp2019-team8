import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class SignUp extends Component {
    state = {
        email: '',
        verifyCode: '',
        password: '',
        passwordConfirm: '',
        nickname: '',
        studentId: '',
        selectedDepartment: 'all',
        selectedMajor: '',      // ex) 컴퓨터공학부...
        agreeToTerms: false,
        verify: false,
        genderRadio: {
            male: false,
            female: false,
            etc: false,
        },
        statusRadio: {
            student: false,
            alumnus: false,
            faculty: false,
        },
        studentRadio: {
            undergrad: false,
            grad: false,
            doctor: false,
        },
        departmentList: [
            { value: '-' },
            { value: 'Humanities' },
            { value: 'Social Sciences' },
            { value: 'Natural Sciences' },
            { value: 'Business Administration' },
            { value: 'Nursing' },
            { value: 'Engineering' },
            { value: 'Agriculture and Life Sciences' },
            { value: 'Fine Arts' },
            { value: 'Education' },
            { value: 'Human Ecology' },
            { value: 'Veterinary Medicine' },
            { value: 'Pharmacy' },
            { value: 'Music' },
            { value: 'Medicine' },
            { value: 'Liberal Studies' },
        ], // ex() 공대, 농생대
        majorList: {
            all: [{ value: '' }],
            Engineering: [
                { value: 'hi' },
                { value: 'temp' },
            ],
            hi: [
                { value: 'asdasd' },
                { value: 'asdasd' },
            ],
        },
    }

    onChangeEmailInput = (event) => {
        this.setState({ email: event.target.value });
    }

    onChangeVerifyCodeInput = (event) => {

    }

    onChangePasswordComfirmInput = (event) => {

    }

    onChangeNicknameInput = (evnet) => {
        //나중에 중복체크 해야할 때 써야할듯 하하
    }

    onChangeGenderRadioButton = (event) => {
        let temp = this.state.genderRadio;
        for (let i in temp) {
            if (i === event.target.value)
                temp[i] = event.target.checked;
            else
                temp[i] = false;
        }
        this.setState({ genderRadio: temp })
    }

    onChangeStatusRadioButton = (event) => {
        let temp = this.state.statusRadio;
        for (let i in temp) {
            if (i === event.target.value)
                temp[i] = event.target.checked;
            else
                temp[i] = false;
        }
        this.setState({ statusRadio: temp })
    }

    onChangeStudentRadioButton = (event) => {
        let temp = this.state.studentRadio;
        for (let i in temp) {
            if (i === event.target.value)
                temp[i] = event.target.checked;
            else
                temp[i] = false;
        }
        this.setState({ studentRadio: temp });
    }

    onChangeDepartmentSelect = (event) => {
        this.setState({ selectedDepartment: event.target.value });
    }

    onChangeMajorSelect = (event) => {
        this.setState({ selectedMajor: event.target.value });
    }

    onClickAgreeToTermsCheckBox = () => {
        this.setState({ agreeToTerms: !this.state.agreeToTerms });
    }

    onClickVerifyButton = () => {

    }

    onClickSignUpConfirmButton = () => {
        this.props.history.push('/');
    }

    onClickBackButton = () => {
        this.props.history.push('/');
    }

    render() {
        let status_detail = null;
        if (this.state.statusRadio['student']) {
            const departmentList = this.state.departmentList.map((v, i) => {
                return (
                    <option key={i} value={v.value} label={v.value}></option>
                );
            });
            const majorList = this.state.majorList[this.state.selectedDepartment].map((v, i) => {
                return (
                    <option key={i} value={v.value} label={v.value}></option>
                );
            });

            status_detail = (
                <div className="StatusDetail">
                    <Label>뭐라하지</Label>
                    <FormGroup>
                        <Input type="radio" name="student_radio" id="student_undergrad_radio" value="undergrad"
                            onChange={this.onChangeStudentRadioButton}></Input>UNDERGRADUATE
                        <Input type="radio" name="student_radio" id="student_grad_radio" value="grad"
                            onChange={this.onChangeStudentRadioButton}></Input>GRADUATE
                        <Input type="radio" name="student_radio" id="student_doctor_radio" value="doctor"
                            onChange={this.onChangeStudentRadioButton}></Input>DOCTOR
                    </FormGroup>
                    College of...
                    <Input type="select" onChange={this.onChangeDepartmentSelect}>
                        {departmentList}
                    </Input>
                    Major
                    <Input type="select" onChange={this.onChangeMajorSelect}>
                        {majorList}
                    </Input>
                </div>
            );
        }

        return (
            <div className="SignUp">
                <Form>
                    {/* 약관박스 만들기 */}
                    Agree
                    <FormGroup>
                        <Input type="checkbox" id="agree_to_terms_checkbox" checked={this.state.agreeToTerms}
                            onChange={() => this.onClickAgreeToTermsCheckBox()}></Input>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={2}>
                            <Label>SNU MAIL</Label>
                            <Input type="email" id="email_input" placeholder="SNU MAIL"
                                onChange={this.onChangeEmailInput}></Input>
                            <Button type="button" id="verify_button"
                                onClick={this.onClickVerifyButton}>Verify</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={2}>
                            <Label>VERIFY CODE</Label>
                            <Input type="text" id="verify_code_input" placeholder="VERIFY CODE"
                                onChange={this.onChangeVerifyCodeInput}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={2}>
                            <Label>PASSWORD</Label>
                            <Input type="password" id="password_input" placeholder="PASSWORD"
                                onChange={(event) => this.setState({ password: event.target.value })}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={2}>
                            <Label>PASSWORD-CONFIRM</Label>
                            <Input type="password" id="password_confirm_input" placeholder="PASSWORD CONFIRMATION"
                                onChange={this.onChangePasswordComfirmInput}></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={2}>
                            <Label>NICKNAME</Label>
                            <Input type="text" id="nickname_input" placeholder="NICKNAME"
                                onChange={this.onChangeNicknameInput}></Input>
                        </Col>
                    </FormGroup>
                    {/* // radio input : label을 클릭해야 작동(글씨) */}
                    <Label>GENDER</Label>
                    <FormGroup>
                        <Input type="radio" name="gender_radio" id="gender_male_radio" value='male'
                            onChange={this.onChangeGenderRadioButton}></Input>MALE
                        <Input type="radio" name="gender_radio" id="gender_female_radio" value='female'
                            onChange={this.onChangeGenderRadioButton}></Input>FEMALE
                        <Input type="radio" name="gender_radio" id="gender_etc_radio" value='etc'
                            onChange={this.onChangeGenderRadioButton}></Input>ETC
                    </FormGroup>
                    <Label>STATUS</Label>
                    <FormGroup>
                        <Input type="radio" name="status_radio" id="status_student_radio" value="student"
                            onChange={this.onChangeStatusRadioButton}></Input>STUDENT
                        <Input type="radio" name="status_radio" id="status_alumnus_radio" value="alumnus"
                            onChange={this.onChangeStatusRadioButton}></Input>ALUMNUS
                        <Input type="radio" name="status_radio" id="status_faculty_radio" value="faculty"
                            onChange={this.onChangeStatusRadioButton}></Input>FACULTY
                    </FormGroup>
                    {status_detail}
                    <Button type="button" id="confirm_button"
                        onClick={this.onClickSignUpConfirmButton}>CONFIRM</Button>
                    <Button type="button" id="back_button"
                        onClick={this.onClickBackButton}>BACK</Button>
                </Form>
            </div >
        );
    }
}

export default connect(null, null)(withRouter(SignUp));