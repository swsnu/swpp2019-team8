import React, { Component } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actionCreator from "../../../store/actions/index";

import terms from "./term";

import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	InputGroup,
	FormFeedback,
	Col,
	Row,
	Container,
	Modal,
	ModalBody,
	ModalFooter
} from "reactstrap";

import UpperBar from "../UpperBar/UpperBar";
import "./SignUp.css";

class SignUp extends Component {
	state = {
		signIn : '',
		email: "",
		verifyCode: "",
		password: "",
		passwordConfirm: "",
		nickname: "",
		studentId: "",
		selectedDepartment: "-",
		selectedMajor: "", // ex) 컴퓨터공학부...
		selectedGender: "",
		selectedStatus: "",
		selectedStudentStatus: "",
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
		], // ex() 공대, 농생대
		majorList: {
			all: [{ value: "-" }],
			agricultureAndLifeSciences: [
				{ value: "agricultureAndLifeSciences" }
			],
			businessAdministration: [{ value: "businessAdministration" }],
			education: [
				{ value: "education", label: "Education" },
				{
					value: "koreanLanguageEducation",
					label: "Korean Language Education"
				},
				{ value: "englishEducation", label: "English Education" },
				{
					value: "germanLanguageEducation",
					label: "German Language Education"
				},
				{
					value: "frenchLanguageEducation",
					label: "French Language Education"
				},
				{
					value: "socialStudiesEducation",
					label: "Social Studies Education"
				},
				{ value: "historyEducation", label: "History Education" },
				{ value: "geographyEducation", label: "Geography Education" },
				{ value: "ethicsEducation", label: "Ethics Education" },
				{ value: "mathematicsEducation", label: "Mathematics Education" },
				{ value: "physicsEducation", label: "Physics Education" },
				{ value: "chemistryEducation", label: "Chemistry Education" },
				{ value: "biologyEducation", label: "Biology Education" },
				{
					value: "earthScienceEducation",
					label: "Earth Science Education"
				},
				{ value: "physicalEducation", label: "Physical Education" }
			],
			engineering: [{ value: "-" }, { value: "engineering" }],
			fineArts: [
				{ value: "orientalPainting", label: "Oriental Painting" },
				{ value: "painting", label: "Painting" },
				{ value: "sculpture", label: "Sculpture" },
				{ value: "craftsAndDesign", label: "Crafts and Design" },
			],
			humanities: [
				{ value: "koreanLanguageAndLiterature", label: "Korean Language and Literature" },
				{ value: "chineseLanguageAndLiterature", label: "Chinese Language and Literature" },
				{ value: "englishLanguageAndLiterature", label: "English Language and Literature" },
				{ value: "frenchLanguageAndLiterature", label: "French Language and Literature" },
				{ value: "germanLanguageAndLiterature", label: "German Language and Literature" },
				{ value: "russianLanguageAndLiterature", label: "Russian Language and Literature" },
				{ value: "hispanicLanguageAndLiterature", label: "Hispanic Language and Literature" },
				{ value: "linguistics", label: "Linguistics" },
				{ value: "asianLanguagesAndCivilizations", label: "Asian Languages and Civilizations" },
				{ value: "koreanHistory", label: "Korean History" },
				{ value: "asianHistory", label: "Asian History" },
				{ value: "westernHistory", label: "Western History" },
				{ value: "archaeologyAndArtHistory", label: "Archaeology and Art History" },
				{ value: "philosophy", label: "Philosophy" },
				{ value: "religiousStudies", label: "Religious Studies" },
				{ value: "aesthetics", label: "Aesthetics" },
			],
			humanEcology: [
				{ value: "consumerAndChildStudies", label: "Consumer and Child Studies" },
				{ value: "foodAndNutrition", label: "Food and Nutrition" },
				{ value: "textilesMerchandisingAndFashionDesign", label: "Textiles, Merchandising and Fashion Design" },
			],
			liberalStudies: [{ value: "liberalStudies" }],
			medicine: [
				{ value: "preliminaryMedicine", label: "Preliminary Medicine" },
				{ value: "medicine", label: "Medicine" }
			],
			music: [
				{ value: "vocalMusic", label: "Vocal Music" },
				{ value: "composition", label: "Composition" },
				{ value: "instrumentalMusic", label: "Instrumental Music" },
				{ value: "koreanMusic", label: "Korean Music" }
			],
			naturalSciences: [
				{ value: "mathematicalSciences", label: "Mathematical Sciences" },
				{ value: "statistics", label: "Statistics" },
				{ value: "physicsAndAstronomy", label: "Physics and Astronomy" },
				{ value: "chemistry", label: "Chemistry" },
				{ value: "biologicalSciences", label: "Biological Sciences" },
				{ value: "earthAndEnvironmentalSciences", label: "Earth and Environmental Sciences" },
			],
			nursing: [
				{ value: "nursing", label: "Nursing" },
			],
			socialSciences: [
				{ value: "politicalScienceAndInternationalRelations", label: "Political Science and International Relations" },
				{ value: "economics", label: "Economics" },
				{ value: "sociology", label: "Sociology" },
				{ value: "anthropology", label: "Anthropology" },
				{ value: "psychology", label: "Psychology" },
				{ value: "geography", label: "Geography" },
				{ value: "socialWelfare", label: "Social Welfare" },
				{ value: "communication", label: "Communication" },
			],
			pharmacy: [{ value: "pharmacy" }],
			veterinaryMedicine: [
				{ value: "preliminaryVeterinaryMedicine", label: "Preliminary Veterinary Medicine" },
				{ value: "veterinaryMedicine", label: "Veterinary Medicine" },
			],
		},
		checkInputResult: {
			// 회원가입을 위한 정보들이 알맞게 들어왔는지 확인
			agreeToTerms: false,
			email: false,
			verifyCode: true,
			password: false,
			passwordConfirm: false,
			nickname: false,
			studentId: false,
			department: false,
			major: false,
			gender: false,
			status: false,
			studentStatus: false
		},
		checkInputInvalid: {
			// input이 invalid한 상태이어야 하는지 확인
			email: false,
			verifyCode: false,
			password: false,
			passwordConfirm: false,
			nickname: false,
			studentId: false
		},
		formFeedbackMessage: {
			email: "",
			verifyCode: "",
			password: "",
			passwordConfirm: "",
			nickname: "",
			studentId: ""
		},
		verifyModal: false,
		verifyModalMessage: "",
		confirmModal: false,
		confirmModalMessage: ""
	};

	toggleVerifyModal = () => {
		this.setState({ verifyModal: !this.state.verifyModal });
	};

	toggleConfirmModal = () => {
		if (
			this.state.confirmModal === true &&
			this.state.confirmModalMessage === "회원 가입이 완료되었습니다."
		) {
			this.props.history.push("/");
		}
		this.setState({ confirmModal: !this.state.confirmModal });
	};

	onChangeEmailInput = async event => {
		let email = event.target.value;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		let inputResult = this.state.checkInputResult;
		let inputInvalid = this.state.checkInputInvalid;
		if (/@snu\.ac\.kr$/.exec(email)) {
			// 성공
			//중복체크?
			await this.props.checkEmailDuplicate(email);
			if (this.props.emailDuplicate === true) {
				inputResult.email = false;
				inputInvalid.email = true;
				formFeedbackMessage.email =
					"이미 가입된 스누메일입니다. 다시 확인하시기 바랍니다.";
			} else {
				inputResult.email = true;
				inputInvalid.email = false;
				formFeedbackMessage.email = "";
			}
		} else if (email === "") {
			inputResult.email = false;
			inputInvalid.email = false;
			formFeedbackMessage.email = "";
		} else {
			// 실패
			inputResult.email = false;
			inputInvalid.email = true;
			formFeedbackMessage.email = "스누메일 형식으로 입력해주세요.";
		}

		this.setState({
			email: email,
			checkInputInvalid: inputInvalid,
			checkInputResult: inputResult,
			formFeedbackMessage: formFeedbackMessage
		});
	};

	onChangeVerifyCodeInput = event => {
		let inputResult = this.state.checkInputResult;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		let inputInvalid = this.state.checkInputInvalid;
		if (
			event.target.value === this.props.verifyCode &&
			this.props.verifyCode !== ""
		) {
			//성공
			inputResult.verifyCode = true;
			inputInvalid.verifyCode = false;
			formFeedbackMessage.verifyCode = "";
		} else if (event.target.value === "") {
			inputResult.verifyCode = false;
			inputInvalid.verifyCode = false;
			formFeedbackMessage.verifyCode = "";
		} else {
			//실패
			inputResult.verifyCode = false;
			inputInvalid.verifyCode = true;
			formFeedbackMessage.verifyCode = "인증번호가 일치하지 않습니다.";
		}
		this.setState({
			verifyCode: event.target.value,
			checkInputInvalid: inputInvalid,
			checkInputResult: inputResult,
			formFeedbackMessage: formFeedbackMessage
		});
	};

	onChangePasswordInput = event => {
		//정규표현식 추가
		let inputResult = this.state.checkInputResult;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		let inputInvalid = this.state.checkInputInvalid;
		if (event.target.value.length < 8) {
			if (event.target.value === "") {
				inputResult.password = false;
				inputInvalid.password = false;
				formFeedbackMessage.password = "";
			} else {
				inputResult.password = false;
				inputInvalid.password = true;
				formFeedbackMessage.password =
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
				formFeedbackMessage.password = "";
			} else {
				inputResult.password = false;
				inputInvalid.password = true;
				formFeedbackMessage.password =
					"영문자, 특수기호, 숫자를 포함한 8자 이상으로 설정해주십시오.";
			}
		}
		if (
			event.target.value !== this.state.passwordConfirm &&
			this.state.passwordConfirm !== ""
		) {
			inputResult.passwordConfirm = false;
			inputInvalid.passwordConfirm = true;
			formFeedbackMessage.passwordConfirm =
				"비밀번호와 일치하지 않습니다.";
		} else if (this.state.passwordConfirm !== "") {
			inputResult.passwordConfirm = true;
			inputInvalid.passwordConfirm = false;
			formFeedbackMessage.passwordConfirm = "";
		}
		this.setState({
			password: event.target.value,
			checkInputInvalid: inputInvalid,
			checkInputResult: inputResult,
			formFeedbackMessage: formFeedbackMessage
		});
	};

	onChangePasswordConfirmInput = event => {
		let inputResult = this.state.checkInputResult;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		let inputInvalid = this.state.checkInputInvalid;
		if (this.state.password === event.target.value) {
			//성공
			inputResult.passwordConfirm = true;
			inputInvalid.passwordConfirm = false;
			formFeedbackMessage.passwordConfirm = "";
		} else if (event.target.value === "") {
			//실패
			inputResult.passwordConfirm = false;
			inputInvalid.passwordConfirm = false;
			formFeedbackMessage.passwordConfirm = "";
		} else {
			inputResult.passwordConfirm = false;
			inputInvalid.passwordConfirm = true;
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

	onChangeNicknameInput = async event => {
		let nickname = event.target.value;
		let inputResult = this.state.checkInputResult;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		let inputInvalid = this.state.checkInputInvalid;
		if (nickname !== "") await this.props.checkNicknameDuplicate(nickname);
		if (nickname === "") {
			inputResult.nickname = false;
			inputInvalid.nickname = false;
			formFeedbackMessage.nickname = "";
		} else if (this.props.nicknameDuplicate === true) {
			inputResult.nickname = false;
			inputInvalid.nickname = true;
			formFeedbackMessage.nickname = "이미 존재하는 닉네임입니다.";
		} else {
			inputResult.nickname = true;
			inputInvalid.nickname = false;
			formFeedbackMessage.nickname = "";
		}
		//중복체크만 확인
		this.setState({
			nickname: nickname,
			checkInputInvalid: inputInvalid,
			checkInputResult: inputResult,
			formFeedbackMessage: formFeedbackMessage
		});
	};

	onChangeGenderRadioButton = event => {
		let inputResult = this.state.checkInputResult;
		let selectedGender = this.state.genderRadio;
		for (let i in selectedGender) {
			if (i === event.target.value) {
				inputResult.gender = true;
				selectedGender[i] = event.target.checked;
			} else selectedGender[i] = false;
		}
		this.setState({
			genderRadio: selectedGender,
			selectedGender: event.target.value,
			checkInputResult: inputResult
		});
	};

	onChangeStatusRadioButton = event => {
		let inputResult = this.state.checkInputResult;
		let selectedStatus = this.state.statusRadio;
		let studentId = '';
		let selectedDepartment = 'all';
		let selectedMajor = '-';
		let selectedStudentStatus = '';
		for (let i in selectedStatus) {
			if (i === event.target.value) {
				inputResult.status = true;
				selectedStatus[i] = event.target.checked;
			} else selectedStatus[i] = false;
		}
		if (selectedStatus.student === false) {
			if (selectedStatus.alumnus === true) {
				studentId = '-';
				selectedDepartment = 'alumnus';
				selectedMajor = 'alumnus'
				selectedStudentStatus = 'alumnus';
			} else {
				studentId = '-';
				selectedDepartment = 'faculty';
				selectedMajor = 'faculty'
				selectedStudentStatus = 'faculty';
			}
			inputResult.studentId = true;
			inputResult.department = true;
			inputResult.major = true;
			inputResult.studentStatus = true;
		} else {
			inputResult.studentId = false;
			inputResult.department = false;
			inputResult.major = false;
			inputResult.studentStatus = false;
		}
		this.setState({
			statusRadio: selectedStatus,
			selectedStatus: event.target.value,
			checkInputResult: inputResult,
			studentId: studentId,
			selectedDepartment: selectedDepartment,
			selectedMajor: selectedMajor,
			selectedStudentStatus: selectedStudentStatus
		});
	};

	onChangeStudentIdInput = async event => {
		let studentId = event.target.value;
		let inputResult = this.state.checkInputResult;
		let inputInvalid = this.state.checkInputInvalid;
		let formFeedbackMessage = this.state.formFeedbackMessage;
		if (/^[1-2]([0-9]){3}-([0-9]){5}$/.exec(studentId)) {
			await this.props.checkStudentIdDuplicate(studentId);
			if (this.props.studentIdDuplicate === true) {
				inputResult.studentId = false;
				inputInvalid.studentId = true;
				formFeedbackMessage.studentId = "이미 가입한 학번입니다.";
			} else {
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
			studentId: studentId,
			checkInputResult: inputResult,
			checkInputInvalid: inputInvalid,
			formFeedbackMessage: formFeedbackMessage
		});
	};

	onChangeStudentRadioButton = event => {
		let inputResult = this.state.checkInputResult;
		let selectedStudent = this.state.studentRadio;
		for (let i in selectedStudent) {
			if (i === event.target.value) {
				inputResult.studentStatus = true;
				selectedStudent[i] = event.target.checked;
			} else selectedStudent[i] = false;
		}
		this.setState({
			studentRadio: selectedStudent,
			selectedStudentStatus: event.target.value,
			checkInputResult: inputResult
		});
	};

	onChangeDepartmentSelect = event => {
		let inputResult = this.state.checkInputResult;
		if (event.target.value !== "all") {
			inputResult.department = true;
		} else {
			inputResult.department = false;
			inputResult.major = false;
		}
		this.setState({
			selectedDepartment: event.target.value,
			checkInputResult: inputResult
		});
	};

	onChangeMajorSelect = event => {
		let inputResult = this.state.checkInputResult;
		if (event.target.value !== "-") {
			inputResult.major = true;
		} else inputResult.major = false;
		this.setState({
			selectedMajor: event.target.value,
			checkInputResult: inputResult
		});
	};

	onClickAgreeToTermsCheckBox = () => {
		let inputResult = this.state.checkInputResult;
		inputResult.agreeToTerms = !this.state.checkInputResult.agreeToTerms;
		this.setState({ checkInputResult: inputResult });
	};

	onClickVerifyButton = async () => {
		await this.props.getVerifyCode(this.state.email);
		if (this.props.verifyCode === "") {
			this.setState({
				verifyModalMessage:
					"메일 발송에 실패하였습니다.\n다시 한번 시도해 주시기 바랍니다."
			});
		} else {
			this.setState({
				verifyModalMessage:
					"메일로 인증번호를 발송하였습니다.\n메일을 확인해 주시기 바랍니다."
			});
		}
		this.toggleVerifyModal();
	};

	onClickSignUpConfirmButton = async () => {
		// 회원가입 확인 + 추가 구현 예정
		let inputResult = this.state.checkInputResult;
		let signUp = true;
		for (let i in inputResult) {
			if (inputResult[i] === false) signUp = false;
		}
		if (signUp === true) {
			let user = {
				email: this.state.email,
				password: this.state.password,
				nickname: this.state.nickname,
				gender: this.state.selectedGender,
				status: this.state.selectedStatus,
				student_id: this.state.studentId,
				department: this.state.selectedDepartment,
				major: this.state.selectedMajor,
				student_status: this.state.selectedStudentStatus
			};
			await this.props.postSignUp(user);
			this.setState({
				confirmModalMessage: "회원 가입이 완료되었습니다."
			});
		} else {
			this.setState({
				confirmModalMessage: "다시 한 번 확인해주시기 바랍니다."
			});
		}
		this.toggleConfirmModal();
	};

	onClickBackButton = () => {
		this.props.history.push("/");
	};
	
	ngOnInIt = async () => {
		if (this.state.signIn === '') {
			await this.props.checkSignIn();
			if (this.props.signIn) {
				alert("You must logged out to sign up");
				this.props.history.push("/");
			} else {
				this.setState({
					signIn: true
				})
			}
		} else if (this.props.signIn) {
			alert("You must logged out to sign up");
			this.props.history.push('/')
		}

	}


	render() {
		this.ngOnInIt();

		let status_detail = null;
		if (this.state.statusRadio["student"]) {
			const departmentList = this.state.departmentList.map((v, i) => {
				return (
					<option key={i} value={v.value} label={v.label}></option>
				);
			});
			const majorList = this.state.majorList[
				this.state.selectedDepartment
			].map((v, i) => {
				return (
					<option key={i} value={v.value} label={v.value}></option>
				);
			});

			status_detail = (
				<div className="StatusDetail">
					<FormGroup>
						<Input
							type="text"
							id="student_id_input"
							placeholder="STUDENT ID"
							onChange={this.onChangeStudentIdInput}
							valid={this.state.checkInputResult.studentId}
							invalid={this.state.checkInputInvalid.studentId}
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
		}


		return (
			<div className="SignUp">
				<UpperBar />
				<h1>Sign Up</h1>
				<Modal
					isOpen={this.state.verifyModal}
					toggle={this.toggleVerifyModal}
					className="VerifyModal"
				>
					<ModalBody>{this.state.verifyModalMessage}</ModalBody>
					<ModalFooter>
						<Button onClick={this.toggleVerifyModal}>확인</Button>
					</ModalFooter>
				</Modal>
				<Modal
					isOpen={this.state.confirmModal}
					toggle={this.toggleConfirmModal}
					className="ConfirmModal"
				>
					<ModalBody>{this.state.confirmModalMessage}</ModalBody>
					<ModalFooter>
						<Button onClick={this.toggleConfirmModal}>확인</Button>
					</ModalFooter>
				</Modal>
				<Container>
					<Form>
						{terms}
						<FormGroup>
							<Input
								type="checkbox"
								id="agree_to_terms_checkbox"
								checked={this.state.agreeToTerms}
								onChange={() =>
									this.onClickAgreeToTermsCheckBox()
								}
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
										valid={
											this.state.checkInputResult.email
										}
										invalid={
											this.state.checkInputInvalid.email
										}
									></Input>
									<Button
										type="button"
										id="verify_button"
										className="float-right"
										disabled={
											!this.state.checkInputResult.email
										}
										onClick={this.onClickVerifyButton}
									>
										Verify
                                    </Button>
									<FormFeedback>
										{this.state.formFeedbackMessage.email}
									</FormFeedback>
								</InputGroup>
							</FormGroup>
							<FormGroup row>
								<Label>VERIFY CODE</Label>
								<Input
									type="text"
									id="verify_code_input"
									placeholder="VERIFY CODE"
									onChange={this.onChangeVerifyCodeInput}
									valid={
										this.state.checkInputResult.verifyCode
									}
									invalid={
										this.state.checkInputInvalid.verifyCode
									}
								></Input>
								<FormFeedback>
									{this.state.formFeedbackMessage.verifyCode}
								</FormFeedback>
							</FormGroup>
							<FormGroup row>
								<Label>PASSWORD</Label>
								<Input
									type="password"
									id="password_input"
									placeholder="PASSWORD"
									onChange={this.onChangePasswordInput}
									valid={this.state.checkInputResult.password}
									invalid={
										this.state.checkInputInvalid.password
									}
								></Input>
								<FormFeedback>
									{this.state.formFeedbackMessage.password}
								</FormFeedback>
							</FormGroup>
							<FormGroup row>
								<Label>PASSWORD-CONFIRM</Label>
								<Input
									type="password"
									id="password_confirm_input"
									placeholder="PASSWORD CONFIRMATION"
									onChange={this.onChangePasswordConfirmInput}
									valid={
										this.state.checkInputResult
											.passwordConfirm
									}
									invalid={
										this.state.checkInputInvalid
											.passwordConfirm
									}
								></Input>
								<FormFeedback>
									{
										this.state.formFeedbackMessage
											.passwordConfirm
									}
								</FormFeedback>
							</FormGroup>
							<FormGroup row>
								<Label>NICKNAME</Label>
								<Input
									type="text"
									id="nickname_input"
									placeholder="NICKNAME"
									onChange={this.onChangeNicknameInput}
									valid={this.state.checkInputResult.nickname}
									invalid={
										this.state.checkInputInvalid.nickname
									}
								></Input>
								<FormFeedback>
									{this.state.formFeedbackMessage.nickname}
								</FormFeedback>
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
											onChange={
												this.onChangeGenderRadioButton
											}
										></Input>
										MALE&emsp;
                                    </Col>
									<Col>
										<Input
											type="radio"
											name="gender_radio"
											id="gender_female_radio"
											value="female"
											onChange={
												this.onChangeGenderRadioButton
											}
										></Input>
										FEMALE
                                    </Col>
									<Col>
										<Input
											type="radio"
											name="gender_radio"
											id="gender_etc_radio"
											value="etc"
											onChange={
												this.onChangeGenderRadioButton
											}
										></Input>
										ETC
                                    </Col>
								</Row>
							</FormGroup>
							<br />
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

export const mapDispatchToProps = dispatch => {
	return {
		postSignUp: user => dispatch(actionCreator.postSignUp(user)),
		getVerifyCode: email => dispatch(actionCreator.getVerifyCode(email)),
		checkEmailDuplicate: email =>
			dispatch(actionCreator.checkEmailDuplicate(email)),
		checkNicknameDuplicate: nickname =>
			dispatch(actionCreator.checkNicknameDuplicate(nickname)),
		checkStudentIdDuplicate: studentId =>
			dispatch(actionCreator.checkStudentIdDuplicate(studentId)),
		checkSignIn: () =>
			dispatch(actionCreator.checkSignIn())

		//중복 체크를 위한 것들 추가
	};
};

export const mapStateToProps = state => {
	return {
		verifyCode: state.usr.verifyCode,
		emailDuplicate: state.usr.emailDuplicate,
		nicknameDuplicate: state.usr.nicknameDuplicate,
		studentIdDuplicate: state.usr.studentIdDuplicate,
		signIn: state.usr.signIn
		//중복 체크를 위한 것들 추가
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
