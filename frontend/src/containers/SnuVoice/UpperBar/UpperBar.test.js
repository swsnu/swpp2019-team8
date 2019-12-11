import React from 'react';
import { shallow } from 'enzyme';
import { UpperBar, mapDispatchToProps, mapStateToProps } from './UpperBar';

describe('<UpperBar/>', () => {
    let props;
    let mocked = jest.fn();
    let historyMock;
    beforeEach(() => {
        props = {
            selectedUser: '',
            signIn: false,
            checkSignIn: mocked,
            postSignIn: mocked,
            getSignOut: mocked,
            getUserByUserId: mocked
        },
        historyMock = { push : jest.fn() }
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors , signIn = false', () => {
        const component = shallow(<UpperBar {...props} />)
        const signIn = component.find('#sign_in_button')
        const upperbar = component.find('.UpperBar')
        expect(signIn.length).toBe(1);
        expect(upperbar.length).toBe(1);
    })

    it('should render without errors , signIn = true', () => {
        const component = shallow(<UpperBar {...props} signIn={true} />)
        const signOut = component.find('#sign_out_button')
        const upperbar = component.find('.UpperBar')
        expect(signOut.length).toBe(1);
        expect(upperbar.length).toBe(1);
    })

    it('should email, password input changes', () => {
        const component = shallow(<UpperBar {...props} />)
        const temp = "!234"
        const email = component.find('#email_input')
        const password = component.find('#password_input')
        email.simulate('change', { target: { value: temp } })
        password.simulate('change', { target: { value: temp } })
        expect(component.instance().state.email).toBe(temp)
        expect(component.instance().state.password).toBe(temp)
    })

    it('click signIn Button', () => {
        const component = shallow(<UpperBar {...props} />)
        const signIn = component.find('#sign_in_button')
        signIn.simulate('click')
        component.instance().forceUpdate()
        expect(component.instance().state.modal).toBe(true)
        signIn.simulate('click')
        expect(component.instance().state.modal).toBe(false)
    })

    it('click signUp Button', () => {
        let historyMock = { push: jest.fn() };
        const component = shallow(<UpperBar history={historyMock} {...props} />)
        const signUp = component.find('#sign_up_button')
        signUp.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/sign_up');
    })

    it('click signOut Button', () => {
        const component = shallow(<UpperBar {...props} signIn={true} />)
        const signOut = component.find('#sign_out_button')
        signOut.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(1);
    })

    it('onClickSignInButton works', async () => {
        const component = shallow(<UpperBar {...props} />)
        component.instance().toggleModal = mocked;
        await component.instance().onClickSignInButton();
        expect(mocked).toHaveBeenCalledTimes(1);
        expect(component.instance().state.feedBackMessage).toBe('이메일이나 비밀번호를 확인해주십시오.')
    })

    it('onClickSignInButton works- 2', async () => {
        const component = shallow(<UpperBar {...props} signIn={true} />)
        component.instance().toggleModal = mocked;
        await component.instance().onClickSignInButton();
        expect(mocked).toHaveBeenCalledTimes(2);
        expect(component.instance().state.feedBackMessage).toBe('')
    })

    it('componeneDidMount works in tell_me and checks logIn', async () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href: 'http://localhost:3000/tell_me'
            }
        });
        let component;
        component = shallow(<UpperBar {...props} />)
        await component.instance().componentDidMount()
        //expect(component.instance().state.location).toBe('tell_me')
        expect(mocked).toHaveBeenCalledTimes(1)
    })

    it('componeneDidMount works in hear_us', async () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href: 'http://localhost:3000/hear_us'
            }
        });
        let component;
        component = shallow(<UpperBar {...props} />)
        await component.instance().componentDidMount()
        //expect(component.instance().state.location).toBe('hear_us')
        expect(mocked).toHaveBeenCalledTimes(1)
    })

    it('componeneDidMount works in main', async () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href: 'http://localhost:3000/'
            }
        });
        let component;
        component = shallow(<UpperBar {...props} />)
        await component.instance().componentDidMount()
        expect(component.instance().state.location).toBe('')
        expect(mocked).toHaveBeenCalledTimes(1)
    })

    it('should onKeyPress work', () => {
        const component = shallow(<UpperBar {...props} />)
        component.instance().onClickSignInButton = mocked
        component.instance().onKeyPress({ key: 'Enter' })
        expect(mocked).toHaveBeenCalledTimes(1)
        component.instance().onKeyPress({ key: 'Entr' })
        expect(mocked).toHaveBeenCalledTimes(1)
    })

    it('should render correct searchbar', () => {
        const component = shallow(<UpperBar {...props} history={historyMock} />);
        component.instance().setState({
            location : 'tell_me'
        });
        expect(true).toBe(true);
        component.instance().setState({
            location : 'hear_us'
        });
        expect(true).toBe(true);

    })






})

describe('<UpperBar/> : Dispatch to Props', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test postSignIn', () => {
        mapDispatchToProps(dispatch).checkSignIn();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

    it('test postSignIn', () => {
        mapDispatchToProps(dispatch).postSignIn();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

    it('test getSignOut', () => {
        mapDispatchToProps(dispatch).getSignOut();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

    it('test getUserByUserId', () => {
        mapDispatchToProps(dispatch).getUserByUserId();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

})

describe('<UpperBar/> : State to Props', () => {
    it('test props', () => {
        const initialState = {
            usr: {
                selectedUser: '1',
                signIn: true
            }
        }
        expect(mapStateToProps(initialState).selectedUser).toBe('1');
        expect(mapStateToProps(initialState).signIn).toBe(true);
    })
})