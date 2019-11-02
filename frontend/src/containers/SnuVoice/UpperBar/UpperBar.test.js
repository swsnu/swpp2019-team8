import React from 'react';
import { shallow, mount } from 'enzyme';
import { UpperBar, mapDispatchToProps, mapStateToProps } from './UpperBar';
import { sign } from 'crypto';

describe('<UpperBar/>', () => {
    let props;
    let mocked = jest.fn();

    beforeEach(() => {
        props = {
            selectedUser: '',
            signIn: false,
            postSignIn: mocked,
            getSignOut: mocked
        }
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

    it('should crossoverButton exists, not in Main', () => {
        const component = shallow(<UpperBar {...props} />)
        component.instance().setState({ location: "!234" })
        const crossover = component.find('#crossover_button')
        expect(crossover.length).toBe(1);
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

    it('click singin Button', () => {
        const component = shallow(<UpperBar {...props} />)
        const signIn = component.find('#sign_in_button')
        signIn.simulate('click')
        component.instance().forceUpdate()
        expect(component.instance().state.modal).toBe(true)
    })

    it('click singUp Button', () => {
        let historyMock = { push: jest.fn() };
        const component = shallow(<UpperBar history={historyMock} {...props} />)
        const signUp = component.find('#sign_up_button')
        signUp.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/sign_up');
    })

    it('click singOut Button', () => {
        const component = shallow(<UpperBar {...props} signIn={true} />)
        const signOut = component.find('#sign_out_button')
        signOut.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(1);
    })

    it('click crossover Button in tell_me', () => {
        let historyMock = { push: jest.fn() };
        const component = shallow(<UpperBar history={historyMock} {...props} />)
        component.instance().setState({ location: 'tell_me' })
        const crossover = component.find('#crossover_button')
        crossover.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/hear_us');
    })

    it('click crossover Button in hear_us', () => {
        let historyMock = { push: jest.fn() };
        const component = shallow(<UpperBar history={historyMock} {...props} />)
        component.instance().setState({ location: 'hear_us' })
        const crossover = component.find('#crossover_button')
        crossover.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/tell_me');
    })

    it('click crossover Button location is main', () => {
        let historyMock = { push: jest.fn() };
        const component = shallow(<UpperBar history={historyMock} {...props} />)
        component.instance().setState({ location: '' })
        component.instance().onClickCrossOverButton()
        expect(historyMock.push).toHaveBeenCalledTimes(0);
    })

    it('onClickSignInButton works', () => {
        const component = shallow(<UpperBar {...props} />)
        component.instance().toggleModal = mocked;
        component.instance().onClickSignInButton();
        expect(mocked).toHaveBeenCalledTimes(2);
    })

    it('componeneDidMount works in tell_me', () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href : 'localhost:3000/tell_me'
            }
          });
        const component = mount(<UpperBar {...props} />)
        expect(component.instance().state.location).toBe('tell_me')
    })

    it('componeneDidMount works in hear_us', () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href : 'localhost:3000/hear_us'
            }
          });
        const component = mount(<UpperBar {...props} />)
        expect(component.instance().state.location).toBe('hear_us')
    })

    it('componeneDidMount works in main', () => {
        global.window = Object.create(window);
        Object.defineProperty(window, 'location', {
            writable: true,
            value: {
                href : 'localhost:3000/SnuVoice'
            }
          });
        const component = mount(<UpperBar {...props} />)
        expect(component.instance().state.location).toBe('')
    })




})

describe('<UpperBar/> : Dispatch to Props', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test postSignIn', () => {
        mapDispatchToProps(dispatch).postSignIn();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

    it('test getSignOut', () => {
        mapDispatchToProps(dispatch).getSignOut();
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