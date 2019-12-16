import React, { Component } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreator from '../../../store/actions/index';

import {
    Button,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    FormFeedback,
    Col,
    Row,
} from "reactstrap";

import MajorList from '../../../components/Signup/majorList';
import UpperBar from "../UpperBar/UpperBar";

import './InfoEdit.css';

export class InfoEdit extends Component {
    state = {
        signIn: '',
        modal: false,
        selectedModal: '',
        modifiedUser: '',
        password: "",
        passwordConfirm: "",
        studentId: "",
        selectedDepartment: "all",
        selectedMajor: "",
        selectedStatus: "",
        selctedStudentStatus: "",
        statusRadio: {
            student: false,
            alumnus: false,
            faculty: false
        },
        degreeRadio: {
            undergrad: false,
            gard: false,
            doctor: false
        },
        checkInputResult: {
            password: false,
            passwordConfirm: false,
            studentId: false,
            department: false,
            major: false,
            status: false,
            degree: false
        },
        checkInputInvalid: {
            password: false,
            passwordConfirm: false,
            studentId: false
        },
        formFeedbackMessage: {
            password: "",
            passwordConfirm: "",
            studentId: ""
        },
        departmentList: [
            { value: "all", label: "-" },
            { value: "agricultureAndLifeSciences", label: "Agriculture and Life Sciences" },
            { value: "businessAdministration", label: "Business Administration" },
            { value: "education", label: "Education" },
            { value: "engineering", label: "Engineering" },
            { value: "fineArts", label: "Fine Arts" },
            { value: "humanities", label: "Humanities" },
            { value: "humanEcology", label: "Human Ecology" },
            { value: "liberalStudies", label: "Liberal Studies" },
            { value: "medicine", label: "Medicine" },
            { value: "music", label: "Music" },
            { value: "naturalSciences", label: "Natural Sciences" },
            { value: "nursing", label: "Nursing" },
            { value: "pharmacy", label: "Pharmacy" },
            { value: "socialSciences", label: "Social Sciences" },
            { value: "veterinaryMedicine", label: "Veterinary Medicine" }
        ],
        majorList: MajorList    
    }

    toggleModal = async (event) => {
        let modals = event.target.value;
        let inputCheck = this.state.checkInputResult;
        let inputInvalid = this.state.checkInputInvalid;
        let status = {
            student: false,
            alumnus: false,
            faculty: false
        }
        if (this.state.selectedModal === 'status') {
            inputCheck.status = false;
            inputCheck.studentId = false;
        } else if (this.state.selectedModal === 'password') {
            inputCheck.password = false;
            inputCheck.passwordConfirm = false;
            inputInvalid.password = false;
            inputInvalid.passwordConfirm = false;
        }
        if (this.state.modal) modals = '';
        await this.props.getUser();
        this.setState({
            modifiedUser: {
                'email': String(this.props.modifiedUser.email),
                'status': String(this.props.modifiedUser.status),
                'gender': String(this.props.modifiedUser.gender),
                'studentStatus': String(this.props.modifiedUser.studentStatus),
                'department': String(this.props.modifiedUser.department),
                'major': String(this.props.modifiedUser.major),
                'studentId': String(this.props.modifiedUser.studentId),
                'nickname': String(this.props.modifiedUser.nickname),
                'password': ''
            },
            statusRadio: status,
            selectedModal: modals,
            modal: !this.state.modal,
            checkInputResult: inputCheck,
            checkInputInvalid: inputInvalid,
            studentId: '',
            password: '',
            passwordConfirm: '',
            selectedStudentStatus: '',
            selectedStatus: '',
            selectedDepartment: 'all',
            selectedMajor: '',
            // sele
        })
    }
    onChangePasswordInput = event => {
        let user = this.state.modifiedUser;
        let inputResult = this.state.checkInputResult;
        let message = this.state.formFeedbackMessage;
        let inputInvalid = this.state.checkInputInvalid;
        if (event.target.value.length < 8) {
            if (event.target.value === "") {
                inputResult.password = false;
                inputInvalid.password = false;
                message.password = "";
            } else {
                inputResult.password = false;
                inputInvalid.password = true;
                message.password =
                    "비밀번호가 너무 짧습니다. 8자 이상으로 설정해주십시오";
            }
        } else {
            if (
                /[a-zA-Z]+/.exec(event.target.value) &&
                /[0-9]+/.exec(event.target.value) &&
                /[^\w\s]+/.exec(event.target.value)
            ) {
                inputResult.password = true;
                inputInvalid.password = false;
                message.password = "";
                user.password = event.target.value
            } else {
                inputResult.password = false;
                inputInvalid.password = true;
                message.password =
                    "영문자, 특수기호, 숫자를 포함한 8자 이상으로 설정해주십시오.";
            }
        }
        if (
            event.target.value !== this.state.passwordConfirm &&
            this.state.passwordConfirm !== ""
        ) {
            inputResult.passwordConfirm = false;
            inputInvalid.passwordConfirm = true;
            message.passwordConfirm =
                "비밀번호와 일치하지 않습니다.";
        } else if (this.state.passwordConfirm !== "") {
            inputResult.passwordConfirm = true;
            inputInvalid.passwordConfirm = false;
            message.passwordConfirm = "";
        }
        this.setState({
            modifiedUser: user,
            password: event.target.value,
            checkInputInvalid: inputInvalid,
            checkInputResult: inputResult,
            formFeedbackMessage: message
        });
    }

    onChangePasswordConfirmInput = event => {
        let inputResult = this.state.checkInputResult;
        let formFeedbackMessage = this.state.formFeedbackMessage;
        let inputInvalid = this.state.checkInputInvalid;
        if (this.state.password === event.target.value) {
            //성공
            inputInvalid.passwordConfirm = false;
            inputResult.passwordConfirm = true;
            formFeedbackMessage.passwordConfirm = "";
        } else if (event.target.value === "") {
            //실패
            inputInvalid.passwordConfirm = false;
            inputResult.passwordConfirm = false;
            formFeedbackMessage.passwordConfirm = "";
        } else {
            inputInvalid.passwordConfirm = true;
            inputResult.passwordConfirm = false;
            formFeedbackMessage.passwordConfirm =
                "비밀번호와 일치하지 않습니다.";
        }
        this.setState({
            passwordConfirm: event.target.value,
            checkInputInvalid: inputInvalid,
            checkInputResult: inputResult,
            formFeedbackMessage: formFeedbackMessage
        });
    };

    onChangeStatusRadioButton = event => {
        let user = this.state.modifiedUser;
        let selectedStatus = this.state.statusRadio;
        let inputResult = this.state.checkInputResult;
        let studentId = '';
        let newDepartment = 'all';
        let selectedMajor = '';
        let selectedStudentStatus = '';
        user.status = newDepartment;
        for (let i in selectedStatus) {
            if (i === event.target.value) {
                selectedStatus[i] = event.target.checked;
                inputResult.status = true;
            } else selectedStatus[i] = false;
        }
        if (selectedStatus.student === false) {
            if (selectedStatus.alumnus === true) {
                selectedStudentStatus = 'alumnus';
                newDepartment = 'alumnus';
                selectedMajor = 'alumnus'
                user.status = 'alumnus'
            } else {
                newDepartment = 'faculty';
                selectedMajor = 'faculty'
                selectedStudentStatus = 'faculty';
                user.status = 'faculty'
            }
            user.studentId = '';
            inputResult.major = true;
            inputResult.studentId = true;
            inputResult.department = true;
            inputResult.studentStatus = true;
        } else {
            newDepartment = 'all';
            user.status = 'student';
            inputResult.studentId = false;
            inputResult.studentStatus = false;
            inputResult.department = false;
            inputResult.major = false;
        }
        this.setState({
            modifiedUser: user,
            statusRadio: selectedStatus,
            selectedStatus: event.target.value,
            checkInputResult: inputResult,
            studentId: studentId,
            selectedDepartment: newDepartment,
            selectedMajor: selectedMajor,
            selectedStudentStatus: selectedStudentStatus
        });
    };

    onChangeStudentIdInput = async event => {
        let user = this.state.modifiedUser;
        let studentId = event.target.value;
        let inputResult = this.state.checkInputResult;
        let inputInvalid = this.state.checkInputInvalid;
        let formFeedbackMessage = this.state.formFeedbackMessage;
        if (/^[1-2]([0-9]){3}-([0-9]){5}$/.exec(studentId)) {
            await this.props.checkStudentIdDuplicate(studentId);
            if (this.props.studentIdDuplicate === true) {
                if (studentId !== this.props.modifiedUser.studentId) {
                    inputResult.studentId = false;
                    inputInvalid.studentId = true;
                    formFeedbackMessage.studentId = "이미 가입한 학번입니다.";
                } else {
                    user.studentId = studentId;
                    inputResult.studentId = true;
                    inputInvalid.studentId = false;
                    formFeedbackMessage.studentId = "";

                }
            } else {
                user.studentId = studentId;
                inputResult.studentId = true;
                inputInvalid.studentId = false;
                formFeedbackMessage.studentId = "";
            }
        } else {
            if (studentId === "") {
                inputResult.studentId = false;
                inputInvalid.studentId = false;
                formFeedbackMessage.studentId = "";
            } else {
                inputResult.studentId = false;
                inputInvalid.studentId = true;
                formFeedbackMessage.studentId =
                    "학번의 형식이 올바르지 않습니다.\n20XX-XXXXX 형식으로 입력하여 주십시오";
            }
        }
        this.setState({
            modifiedUser: user,
            studentId: studentId,
            checkInputResult: inputResult,
            checkInputInvalid: inputInvalid,
            formFeedbackMessage: formFeedbackMessage
        });
    };

    onChangeStudentRadioButton = event => {
        let user = this.state.modifiedUser;
        let inputResult = this.state.checkInputResult;
        let selectedStudent = this.state.degreeRadio;
        for (let i in selectedStudent) {
            if (i === event.target.value) {
                inputResult.studentStatus = true;
                selectedStudent[i] = event.target.checked;
            } else selectedStudent[i] = false;
        }
        user.studentStatus = event.target.value;
        this.setState({
            modifiedUser: user,
            degreeRadio: selectedStudent,
            selectedStudentStatus: event.target.value,
            checkInputResult: inputResult
        });
    };

    onChangeDepartmentSelect = event => {
        let user = this.state.modifiedUser;
        let inputResult = this.state.checkInputResult;
        if (event.target.value !== "all") {
            user.department = event.target.value;
            inputResult.department = true;
        } else {
            inputResult.department = false;
            inputResult.major = false;
        }
        this.setState({
            modifiedUser: user,
            selectedDepartment: event.target.value,
            checkInputResult: inputResult
        });
    };

    onChangeMajorSelect = event => {
        let user = this.state.modifiedUser;
        let inputResult = this.state.checkInputResult;
        if (event.target.value !== "-") {
            user.major = event.target.value;
            inputResult.major = true;
        } else inputResult.major = false;
        this.setState({
            modifiedUser: user,
            selectedMajor: event.target.value,
            checkInputResult: inputResult
        });
    };

    ngOnInit = async () => {
        if (this.state.signIn === '') {
            await this.props.checkSignIn();
            if (!this.props.signIn) {
                alert("You must logged in to edit info");
                this.props.history.push("/");
            } else {
                this.setState({
                    signIn: true
                })
            }
        } else if (!this.props.signIn) {
            alert("You must logged in to edit info");
            this.props.history.push('/')
        }

    }

    onClickConfirmButton = async () => {
        let inputCheck = this.state.checkInputResult;
        if (this.state.selectedModal === 'status') {
            if (
                !inputCheck.department ||
                !inputCheck.major ||
                !inputCheck.status ||
                !inputCheck.studentId
            ) {
                alert("Check your inputs again");
                return;
            }
        } else if (this.state.selectedModal === 'password') {
            if (!inputCheck.password || !inputCheck.passwordConfirm) {
                alert("Check your inputs again");
                return;
            }

        }
        await this.props.editUser(this.state.modifiedUser)
        alert("Your info is succesfully editted")
        this.toggleModal({ target: { value: this.state.selectedModal } })
    }

    componentDidMount = async () => {
        await this.props.getUser();
        if (this.props.modifiedUser !== '') {
            this.setState({
                modifiedUser: {
                    'email': String(this.props.modifiedUser.email),
                    'department': String(this.props.modifiedUser.department),
                    'status': String(this.props.modifiedUser.status),
                    'studentStatus': String(this.props.modifiedUser.studentStatus),
                    'major': String(this.props.modifiedUser.major),
                    'gender': String(this.props.modifiedUser.gender),
                    'studentId': String(this.props.modifiedUser.studentId),
                    'nickname': String(this.props.modifiedUser.nickname),
                    'password': ''
                }
            })
        }
    }

    render() {
        this.ngOnInit();
        let status_detail = null;
        let detailedInfo = '';
        let userInfo = '';
        let usingModal = '';

        if (this.state.statusRadio["student"]) {
            const majorList = this.state.majorList[
                this.state.selectedDepartment
            ].map((v, i) => {
                return (
                    <option key={i} label={v.label} value={v.value}></option>
                );
            });
            const departmentList = this.state.departmentList.map((v, i) => {
                return (
                    <option key={i} value={v.value} label={v.label}></option>
                );
            });
            status_detail = (
                <div className="StatusDetail">
                    <FormGroup>
                        <Input
                            type="text"
                            placeholder="STUDENT ID"
                            id="student_id_input"
                            onChange={this.onChangeStudentIdInput}
                            invalid={this.state.checkInputInvalid.studentId}
                            valid={this.state.checkInputResult.studentId}
                        ></Input>
                        <FormFeedback>
                            {this.state.formFeedbackMessage.studentId}
                        </FormFeedback>
                        <br />
                        <Label>Degree</Label>
                        <Row>
                            <Col>
                                <Input
                                    type="radio"
                                    name="student_radio"
                                    value="undergrad"
                                    id="student_undergrad_radio"
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
                            <Input
                                type="select"
                                onChange={this.onChangeDepartmentSelect}
                            >
                                {departmentList}
                            </Input>
                            Major
                            <Input
                                type="select"
                                onChange={this.onChangeMajorSelect}
                            >
                                {majorList}
                            </Input>
                        </Row>
                    </FormGroup>
                </div>
            );
        } else {
            status_detail = '';
        }
        if (this.props.modifiedUser !== '') {
            if (this.props.modifiedUser.status === "student") {
                detailedInfo = (
                    <div className="detailedInfo">
                        <p>StudentId : {this.state.modifiedUser.studentId}</p>
                        <br />
                        <p>Degree : {this.state.modifiedUser.studentStatus}</p>
                        <br />
                        <p>Department : {this.state.modifiedUser.department}</p>
                        <br />
                        <p>Major : {this.state.modifiedUser.major}</p>
                        <br />
                    </div>
                )
            }
            userInfo = (
                <div className="userInfo">
                    <div className="userInfo_body">
                    <h3>Current Profile</h3>
                    <br/>
                    <p>Email : <b>{this.state.modifiedUser.email}</b></p>
                    <p>Gender : <b>{this.state.modifiedUser.gender}</b></p>
                    <p>Nickname : <b>{this.state.modifiedUser.nickname}</b></p>
                    <p>Status : <b>{this.state.modifiedUser.status}</b></p>
                    <br/>
                    <Button
                        type="button"
                        value="status"
                        id="status_button"
                        onClick={this.toggleModal}
                    >Change Status</Button>
                    {detailedInfo}
                    <Button
                        type="button"
                        value="password"
                        id="password_button"
                        onClick={this.toggleModal}
                    >
                        Change Password
                    </Button>
                    </div>
                </div>
            )
        }

        if (this.state.selectedModal === 'status') {
            usingModal = (
                <div className="status_modal">
                    <Label>STATUS</Label>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Input
                                    type="radio"
                                    name="status_radio"
                                    id="status_student_radio"
                                    value="student"
                                    onChange={
                                        this.onChangeStatusRadioButton
                                    }
                                ></Input>
                                STUDENT
                                    </Col>
                            <Col>
                                <Input
                                    type="radio"
                                    name="status_radio"
                                    id="status_alumnus_radio"
                                    value="alumnus"
                                    onChange={
                                        this.onChangeStatusRadioButton
                                    }
                                ></Input>
                                ALUMNUS
                                    </Col>
                            <Col>
                                <Input
                                    type="radio"
                                    name="status_radio"
                                    id="status_faculty_radio"
                                    value="faculty"
                                    onChange={
                                        this.onChangeStatusRadioButton
                                    }
                                ></Input>
                                FACULTY
                                    </Col>
                        </Row>
                    </FormGroup>
                    {status_detail}
                </div>
            )
        } else if (this.state.selectedModal === 'password') {
            usingModal = (
                <div className="password_modal">
                    <FormGroup row>
                        <Label>NEW PASSWORD</Label>
                        <Input
                            id="password_input"
                            type="password"
                            placeholder="PASSWORD"
                            valid={this.state.checkInputResult.password}
                            invalid={this.state.checkInputInvalid.password}
                            onChange={this.onChangePasswordInput}
                        ></Input>
                        <FormFeedback>
                            {this.state.formFeedbackMessage.password}
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup row>
                        <Label>PASSWORD-CONFIRM</Label>
                        <Input
                            id="password_confirm_input"
                            type="password"
                            placeholder="PASSWORD CONFIRMATION"
                            valid={this.state.checkInputResult.passwordConfirm}
                            invalid={this.state.checkInputInvalid.passwordConfirm}
                            onChange={this.onChangePasswordConfirmInput}
                        ></Input>
                        <FormFeedback>
                            {this.state.formFeedbackMessage.passwordConfirm}
                        </FormFeedback>
                    </FormGroup>

                </div >
            )
        }

        return (
            <div className="InfoEdit">
                <UpperBar />
                <Row className="infoedit_nav_bar">
                    <Col className="navbuttons">
                        <a
                            className="navbar-brand"
                            // type="button"
                            id="tell_me_button"
                            // onClick={this.onClickTellMeButton}
                            href="/tell_me"
                        >
                            <b>TELL-ME</b>
                        </a>
                        <a
                            className="navbar-brand"
                            // type="button"
                            id="hear_us_button"
                            // onClick={this.onClickHearUsButton}
                            href="/hear_us"
                        >
                            HEAR-US
                        </a>
                    </Col>
                    </Row>
                {userInfo}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    className="editModal"
                >
                    <ModalHeader>Change your Information</ModalHeader>
                    <ModalBody className="info_change">
                        {usingModal}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            type="button"
                            value="confirm"
                            id="confirm_button"
                            onClick={this.onClickConfirmButton}
                            className="float-right"
                        >Confirm</Button>
                        <Button
                            type="button"
                            value="cancle"
                            id="cancle_button"
                            onClick={this.toggleModal}
                        >Cancel</Button>
                    </ModalFooter>


                </Modal>
                {/* {userEdit} */}
            </div >
        );
    }
}


export const mapDispatchToProps = dispatch => {
    return {
        checkSignIn: () =>
            dispatch(actionCreator.checkSignIn()),
        getUser: () =>
            dispatch(actionCreator.getUserToModify()),
        editUser: (user) =>
            dispatch(actionCreator.editUser(user)),
        checkStudentIdDuplicate: studentId =>
            dispatch(actionCreator.checkStudentIdDuplicate(studentId)),
    }
}

export const mapStateToProps = state => {
    return {
        modifiedUser: state.usr.modifiedUser,
        studentIdDuplicate: state.usr.studentIdDuplicate,
        signIn: state.usr.signIn
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(InfoEdit));