import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SignUp from './SignUp';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as actionCreator from '../../../store/actions/user';

describe('<SignUp/>', () => {
    const stubInitialState = {
        verifyCode: 123,
        emailDuplicate: false,
        nicknameDuplicate: false,
        studentIdDuplicate: false,
        signIn: false
    }

    const mockStore = getMockStore(stubInitialState)

    let signUp;
    let spySignUp;
    let spyGetVerifyCode
    let spyEmail;
    let spyNickname;
    let spyStudentId;
    let spyHistoryPush;
    let spyCheckSignIn;
    window.alert = jest.fn();

    beforeEach(() => {
        signUp = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SignUp} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spySignUp = jest.spyOn(actionCreator, 'postSignUp')
            .mockImplementation((user) => { return dispatch => { }; })
        spyGetVerifyCode = jest.spyOn(actionCreator, 'getVerifyCode')
            .mockImplementation((email) => { return dispatch => { }; })
        spyEmail = jest.spyOn(actionCreator, 'checkEmailDuplicate')
            .mockImplementation((email) => { return dispatch => { }; })
        spyNickname = jest.spyOn(actionCreator, 'checkNicknameDuplicate')
            .mockImplementation((nickname) => { return dispatch => { }; })
        spyStudentId = jest.spyOn(actionCreator, 'checkStudentIdDuplicate')
            .mockImplementation((studentId) => { return dispatch => { }; })
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation((path) => { });
        spyCheckSignIn = jest.spyOn(actionCreator, 'checkSignIn')
            .mockImplementation(() => { return dispatch => { }; })

    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should render without erros', async () => {
        const component = await mount(signUp);
        const wrapper = component.find('.SignUp').at(0)
        expect(spyCheckSignIn).toHaveBeenCalledTimes(2);
        expect(wrapper.length).toBe(1)
    })

    it('should buttons work', async () => {
        const component = await mount(signUp);
        const backButton = component.find('#back_button').at(0)
        backButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/')
    })

    it('should RadioButtons work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        signUpComponent.onChangeStatusRadioButton({ target: { value: 'student', checked: true } })
        expect(signUpComponent.state.statusRadio.student).toBe(true);
        signUpComponent.onChangeStatusRadioButton({ target: { value: 'alumnus', checked: true } })
        expect(signUpComponent.state.selectedDepartment).toBe('alumnus');
        signUpComponent.onChangeStatusRadioButton({ target: { value: 'faculty', checked: true } })
        expect(signUpComponent.state.selectedMajor).toBe('faculty');
        signUpComponent.onChangeStudentRadioButton({ target: { value: 'doctor', checked: true } })
        expect(signUpComponent.state.studentRadio.doctor).toBe(true);
        signUpComponent.onChangeGenderRadioButton({ target: { value: 'male', checked: true } })
        expect(signUpComponent.state.genderRadio.male).toBe(true);

    })

    it('should onChangeEmailInput works', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onChangeEmailInput({ target: { value: 'dkwanm1@snu.ac.kr' } })
        expect(spyEmail).toHaveBeenCalledTimes(1)
        expect(signUpComponent.state.formFeedbackMessage.email).toBe('');
        await signUpComponent.onChangeEmailInput({ target: { value: '' } })
        expect(spyEmail).toHaveBeenCalledTimes(1)
        expect(signUpComponent.state.checkInputResult.email).toBe(false)
        await signUpComponent.onChangeEmailInput({ target: { value: '1231' } })
        expect(signUpComponent.state.formFeedbackMessage.email).toBe('Please enter in SNU mail format.');
    })

    it('should onChangeVerifyInput works', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        signUpComponent.setState({
            verifyCode: '123'
        })
        await signUpComponent.onChangeVerifyCodeInput({ target: { value: 123 } })
        expect(signUpComponent.state.formFeedbackMessage.verifyCode).toBe('')
        await signUpComponent.onChangeVerifyCodeInput({ target: { value: '' } })
        expect(signUpComponent.state.checkInputInvalid.verifyCode).toBe(false)
        await signUpComponent.onChangeVerifyCodeInput({ target: { value: '12' } })
        expect(signUpComponent.state.formFeedbackMessage.verifyCode).toBe('The verify code does not match.')

    })

    it('should onChangePasswordInput work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onChangePasswordInput({ target: { value: '' } })
        expect(signUpComponent.state.checkInputInvalid.password).toBe(false)
        signUpComponent.setState({
            passwordConfirm: '121111111113'
        })
        await signUpComponent.onChangePasswordInput({ target: { value: '123' } })
        expect(signUpComponent.state.formFeedbackMessage.password).toBe('Password is too short. Please set it to at least eight characters.')
        expect(signUpComponent.state.formFeedbackMessage.passwordConfirm).toBe('The password does not match.')
        await signUpComponent.onChangePasswordInput({ target: { value: 'iluvswpp12!' } })
        expect(signUpComponent.state.checkInputResult.password).toBe(true)
        signUpComponent.setState({
            passwordConfirm: '121111111113'
        })
        await signUpComponent.onChangePasswordInput({ target: { value: '121111111113' } })
        expect(signUpComponent.state.formFeedbackMessage.password).toBe('Please set at least 8 characters including letters, special symbols, and numbers.')
        expect(signUpComponent.state.checkInputResult.passwordConfirm).toBe(true)
    })

    it('should onChangePasswordConfirmInput work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        signUpComponent.setState({
            password: '1212'
        })
        await signUpComponent.onChangePasswordConfirmInput({ target: { value: '1212' } })
        expect(signUpComponent.state.passwordConfirm).toBe('1212')
        await signUpComponent.onChangePasswordConfirmInput({ target: { value: '' } })
        expect(signUpComponent.state.checkInputResult.passwordConfirm).toBe(false)
        await signUpComponent.onChangePasswordConfirmInput({ target: { value: '12123' } })
        expect(signUpComponent.state.formFeedbackMessage.passwordConfirm).toBe('The password does not match.')

    })

    it('should onChangeNicknameInput work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onChangeNicknameInput({ target: { value: '' } })
        expect(signUpComponent.state.checkInputResult.nickname).toBe(false)
        await signUpComponent.onChangeNicknameInput({ target: { value: '123' } })
        expect(signUpComponent.state.checkInputResult.nickname).toBe(true)
        expect(spyNickname).toHaveBeenCalledTimes(1)

    })

    it('should onChangeStudentId work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onChangeStudentIdInput({ target: { value: '' } })
        expect(signUpComponent.state.checkInputResult.studentId).toBe(false)
        await signUpComponent.onChangeStudentIdInput({ target: { value: '1231' } })
        expect(signUpComponent.state.formFeedbackMessage.studentId).toBe('The format of the student id is not valid. Please enter in 20XX-XXXX format.')
        await signUpComponent.onChangeStudentIdInput({ target: { value: '2018-15722' } })
        expect(signUpComponent.state.checkInputResult.studentId).toBe(true)
        expect(spyStudentId).toHaveBeenCalledTimes(1)

    })

    it('should onChangework - 2', async () => {
        let mockingState = {
            verfiyCode: 123,
            emailDuplicate: true,
            nicknameDuplicate: true,
            studentIdDuplicate: true,
            signIn: true
        }
        let remockStore = getMockStore(mockingState)
        let mockSignUp = (
            <Provider store={remockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SignUp} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        const component = await mount(mockSignUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onChangeStudentIdInput({ target: { value: '2018-15722' } })
        await signUpComponent.onChangeEmailInput({ target: { value: 'dkwanm1@snu.ac.kr' } })
        await signUpComponent.onChangeNicknameInput({ target: { value: '123' } })
        expect(signUpComponent.state.formFeedbackMessage.studentId).toBe('The student id already exists.')
        expect(signUpComponent.state.formFeedbackMessage.email).toBe('This email address is already associated with the existing account. Please check again.')
        expect(signUpComponent.state.formFeedbackMessage.nickname).toBe('The nickname already exists.')
        expect(spyHistoryPush).toHaveBeenCalledTimes(4);

    })

    it('should selectWork', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        signUpComponent.onChangeDepartmentSelect({ target: { value: 'all' } })
        expect(signUpComponent.state.checkInputResult.department).toBe(false)
        signUpComponent.onChangeDepartmentSelect({ target: { value: 'l' } })
        expect(signUpComponent.state.checkInputResult.department).toBe(true)

        signUpComponent.onChangeMajorSelect({ target: { value: '-' } })
        expect(signUpComponent.state.checkInputResult.major).toBe(false)
        signUpComponent.onChangeMajorSelect({ target: { value: '112' } })
        expect(signUpComponent.state.checkInputResult.major).toBe(true)

    })

    it('should onClickAgreeToTermsCheckBox work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        const checkBox = component.find('#agree_to_terms_checkbox').at(0)
        checkBox.simulate('change')
        expect(signUpComponent.state.checkInputResult.agreeToTerms).toBe(true)
    })

    it('should onClickVerifyButton works', async () => {
        let mockingState = {
            verifyCode: '',
            emailDuplicate: true,
            nicknameDuplicate: true,
            studentIdDuplicate: true,
            signIn: true
        }
        let remockStore = getMockStore(mockingState)
        let mocked = jest.fn();
        window.alert = mocked;
        let mockSignUp = (
            <Provider store={remockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SignUp} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        const component = await mount(mockSignUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onClickVerifyButton()
        expect(spyGetVerifyCode).toHaveBeenCalledTimes(1)
        expect(true).toBe(true)
        signUpComponent.setState({
            signIn: true
        })
        expect(mocked).toHaveBeenCalledTimes(4);
        expect(spyHistoryPush).toHaveBeenCalledTimes(4);

    })

    it('should onClickVerifyButton works - 2', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onClickVerifyButton()
        expect(spyGetVerifyCode).toHaveBeenCalledTimes(1)
        expect(true).toBe(true)
    })

    it('should onClickSignUpConfirmButton worsk proper', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.setState({
            checkInputResult: {
                hi: true
            }
        })
        await signUpComponent.onClickSignUpConfirmButton()
        expect(spySignUp).toHaveBeenCalledTimes(1)


    })

    it('should onClickSignUpConfirmButton worsk not proper', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        await signUpComponent.onClickSignUpConfirmButton()
        expect(signUpComponent.state.confirmModalMessage).toBe('Please agree to the Terms of Use and Privacy Statement.\nPlease check gender, status again.');

        signUpComponent.setState({
            checkInputResult: {
                gender: true,
                agreeToTerms: true,
                status: false,
                studentId: false,
                department: false,
                major: false,
                studentStatus: false
            }
        })

        await signUpComponent.onClickSignUpConfirmButton()
        expect(signUpComponent.state.confirmModalMessage).toBe('Please check status again.');

        signUpComponent.setState({
            checkInputResult: {
                gender: false,
                agreeToTerms: true,
                status: true,
                studentId: true,
                department: true,
                major: true,
                studentStatus: true
            }
        })

        await signUpComponent.onClickSignUpConfirmButton()
        expect(signUpComponent.state.confirmModalMessage).toBe('Please check gender again.');

    })

    it('should toggleModal work', async () => {
        const component = await mount(signUp);
        const signUpComponent = component.find(SignUp.WrappedComponent).instance()
        signUpComponent.setState({
            confirmModal: true,
            confirmModalMessage: 'Thanks for signing up.'
        })
        signUpComponent.toggleConfirmModal()
        expect(spyHistoryPush).toHaveBeenCalledWith('/')
    })


})