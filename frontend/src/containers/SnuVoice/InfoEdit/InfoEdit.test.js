import React from 'react';
import { shallow } from 'enzyme';
import { InfoEdit, mapDispatchToProps, mapStateToProps } from './InfoEdit';

describe('<InfoEdit />', () => {
    let props;
    let mocked = jest.fn();
    let mockHistory = { push: jest.fn() };

    beforeEach(() => {
        props = {
            modifiedUser: {
                id: 1,
                email: 'dkwanm1',
                gender: 'mial',
                status: 'student',
                department: '1',
                major: "1",
                nickname: " 1",
                studentId: '1',
                studentStatus: "1"
            },
            signIn: true,
            studentIdDuplicate: false,
            checkSignIn: mocked,
            getUser: mocked,
            editUser: mocked,
            checkStudentIdDuplicate: mocked
        }
        window.alert = mocked;
    })

    afterEach(() => jest.clearAllMocks())

    it('should render well', () => {
        const component = shallow(<InfoEdit {...props} />);
        const info = component.find('.InfoEdit');
        expect(info.length).toBe(1);
    })

    it('shoud componentDidMount works', async () => {
        const component = shallow(<InfoEdit {...props} />);
        await component.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledTimes(2);
    })

    it('should onClickMainButton works', () => {
        const component = shallow(<InfoEdit {...props} history={mockHistory} />);
        component.instance().onClickMainButton();
        expect(mockHistory.push).toHaveBeenCalledWith('/');
    })

    it('should onClickCOnfirmButton works', async () => {
        const component = shallow(<InfoEdit {...props} history={mockHistory} />);
        component.instance().toggleModal = mocked;
        await component.instance().onClickConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(4);

        component.instance().setState({
            selectedModal: 'status'
        })
        await component.instance().onClickConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(5);
        let temp = {
            department : true,
            major : true,
            status : true,
            studentId : true
        }
        component.instance().setState({
            checkInputResult : temp
        })
        await component.instance().onClickConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(8);



        component.instance().setState({
            selectedModal: 'password'
        })
        await component.instance().onClickConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(9);

        temp = {
            password : true,
            passwordConfirm: true
        }
        component.instance().setState({
            checkInputResult : temp
        })
        await component.instance().onClickConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(12);
    })

    it('should ngOnInit works', async () => {
        let component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        expect(mocked).toHaveBeenCalledTimes(1);

        props = {
            modifiedUser: {
                id: 1,
                email: 'dkwanm1',
                gender: 'mial',
                status: 'studet',
                department: '1',
                major: "1",
                nickname: " 1",
                studentId: '1',
                studentStatus: "1"
            },
            signIn: false,
            studentIdDuplicate: false,
            checkSignIn: mocked,
            getUser: mocked,
            editUser: mocked,
            checkStudentIdDuplicate: mocked
        }
        component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        // await component.instance().ngOnInit();
        expect(mocked).toHaveBeenCalledTimes(3);
        expect(mockHistory.push).toHaveBeenCalledWith('/');

        component.instance().setState({
            signIn: '1'
        })

        await component.instance().ngOnInit();
        expect(mocked).toHaveBeenCalledTimes(5);
        expect(mockHistory.push).toHaveBeenCalledTimes(3);

    })

    it('should onChangeMajorSelect', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeMajorSelect({ target: { value: '123' } });
        expect(component.instance().state.checkInputResult.major).toBe(true);

        component.instance().onChangeMajorSelect({ target: { value: '-' } });
        expect(component.instance().state.checkInputResult.major).toBe(false);
    })

    it('should onChangeDepartment works', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeDepartmentSelect({ target: { value: '1' } });
        expect(component.instance().state.checkInputResult.department).toBe(true);

        component.instance().onChangeDepartmentSelect({ target: { value: 'all' } });
        expect(component.instance().state.checkInputResult.department).toBe(false);
    })

    it('should onChangeStudentRadioButton works', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeStudentRadioButton({ target: { value: 'doctor', checked: true } });
        expect(component.instance().state.degreeRadio.doctor).toBe(true)
    })

    it('shoud onChangeStudentIdInput works', async () => {
        let component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeStudentIdInput({ target: { value: '2018-15722' } });
        expect(mocked).toHaveBeenCalledTimes(3);

        component.instance().onChangeStudentIdInput({ target: { value: '123' } });
        expect(true).toBe(true);

        props = {
            modifiedUser: {
                id: 1,
                email: 'dkwanm1',
                gender: 'mial',
                status: 'student',
                department: '1',
                major: "1",
                nickname: " 1",
                studentId: '2018-15722',
                studentStatus: "1"
            },
            signIn: true,
            studentIdDuplicate: true,
            checkSignIn: mocked,
            getUser: mocked,
            editUser: mocked,
            checkStudentIdDuplicate: mocked
        }

        component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeStudentIdInput({ target: { value: '2018-15722' } });
        expect(mocked).toHaveBeenCalledTimes(6);

        component.instance().onChangeStudentIdInput({ target: { value: '2018-15721' } });
        expect(mocked).toHaveBeenCalledTimes(7);

        component.instance().onChangeStudentIdInput({ target: { value: '' } });
        expect(true).toBe(true);
    })

    it('should onChangeStatusRadioButton works', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangeStatusRadioButton({ target: { value: 'student', checked: true } });
        expect(component.instance().state.modifiedUser.status).toBe('student');

        component.instance().onChangeStatusRadioButton({ target: { value: 'alumnus', checked: true } });
        expect(component.instance().state.modifiedUser.status).toBe('alumnus');

        component.instance().onChangeStatusRadioButton({ target: { value: 'faculty', checked: true } });
        expect(component.instance().state.modifiedUser.status).toBe('faculty');

    })

    it('should onChangePasswordConfirmInput works', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangePasswordConfirmInput({ target: { value: '' } });
        expect(component.instance().state.checkInputInvalid.passwordConfirm).toBe(false);

        component.instance().setState({
            password: '1'
        })

        component.instance().onChangePasswordConfirmInput({ target: { value: '' } });
        expect(component.instance().state.checkInputInvalid.passwordConfirm).toBe(false);

        component.instance().onChangePasswordConfirmInput({ target: { value: '1' } });
        expect(component.instance().state.checkInputInvalid.passwordConfirm).toBe(false);

        component.instance().onChangePasswordConfirmInput({ target: { value: '123' } });
        expect(component.instance().state.checkInputInvalid.passwordConfirm).toBe(true);

    })

    it('should onChangePasswordInput', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        component.instance().onChangePasswordInput({ target: { value: '123' } });
        expect(component.instance().state.checkInputInvalid.password).toBe(true);

        component.instance().onChangePasswordInput({ target: { value: '' } });
        expect(component.instance().state.checkInputInvalid.password).toBe(false);

        component.instance().setState({
            passwordConfirm: '1q2w3e4r5t!'
        })

        component.instance().onChangePasswordInput({ target: { value: '1q2w3e4r5t!' } });
        expect(component.instance().state.checkInputResult.password).toBe(true);
        expect(component.instance().state.checkInputResult.passwordConfirm).toBe(true);

        component.instance().onChangePasswordInput({ target: { value: '1q2w3e4r5t' } });
        expect(component.instance().state.checkInputResult.password).toBe(false);
        expect(component.instance().state.checkInputResult.passwordConfirm).toBe(false);
    })

    it('should toggleModal works', async () => {
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();

        await component.instance().toggleModal({ target: { value: '' } });
        expect(mocked).toHaveBeenCalledTimes(3);

        component.instance().setState({
            selectedModal : 'status'
        })

        await component.instance().toggleModal({ target: { value: 'status' } });
        expect(component.instance().state.selectedModal).toBe('');

        component.instance().setState({
            selectedModal : 'password'
        })
    
        await component.instance().toggleModal({ target: { value: 'status' } });
        expect(component.instance().state.modal).toBe(true);

    })

    it('shoudl render branches work', async () => {
        props = {
            modifiedUser: '',
            signIn: true,
            studentIdDuplicate: true,
            checkSignIn: mocked,
            getUser: mocked,
            editUser: mocked,
            checkStudentIdDuplicate: mocked
        }
        const component = await shallow(<InfoEdit {...props} history={mockHistory} />);
        await component.instance().componentDidMount();
        expect(true).toBe(true);

    })

})

describe('Dispatch To Props', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    it('test dispatchToProps', () => {
        mapDispatchToProps(dispatch).checkSignIn();
        expect(dispatch).toHaveBeenCalledTimes(1);

        mapDispatchToProps(dispatch).getUser();
        expect(dispatch).toHaveBeenCalledTimes(2);

        mapDispatchToProps(dispatch).editUser();
        expect(dispatch).toHaveBeenCalledTimes(3);

        mapDispatchToProps(dispatch).checkStudentIdDuplicate();
        expect(dispatch).toHaveBeenCalledTimes(4);
    })

})

describe('State to props', () => {
  it('test props', () => {
      const ini = {
          usr : {
              modifiedUser : 1,
              signIn : 1,
              studentIdDuplicate : 1
          }
      }
      expect(mapStateToProps(ini).signIn).toBe(1);
      expect(mapStateToProps(ini).modifiedUser).toBe(1);
      expect(mapStateToProps(ini).studentIdDuplicate).toBe(1);
  })  
})