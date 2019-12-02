import React from 'react';
import { shallow } from 'enzyme';

import { DebateCreate, mapDispatchToProps, mapStateToProps } from './DebateCreate';

describe('<DebateCreate />', () => {
    let props;
    let mocked = jest.fn();
    let mockHistory = { push: jest.fn() };
    window.alert = jest.fn();

    beforeEach(() => {
        props = {
            selectedDocument: {
                title: '1'
            },
            onGetDocument: mocked,
            onCreateDebate: mocked,
            onCheckSignIn: mocked,
            match : {
                params : {
                    document_title : "123"
                }
            },
            signIn: false,
        }
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors', () => {
        const component = shallow(<DebateCreate {...props} />);
        const top = component.find(".TopOfPage");
        expect(top.length).toBe(1);
    })

    it('should input changes works', () => {
        const component = shallow(<DebateCreate {...props} />);
        const title = component.find('#debate_title_input');
        const content = component.find('#debate_content_textarea');
        title.simulate('change', { target: { value: "123" } });
        content.simulate('change', { target: { value: "235" } });
        expect(component.instance().state.debateTitle).toBe("123");
        expect(component.instance().state.debateContent).toBe("235");

    })

    it('should onClickDebateConfirm works', () => {
        const component = shallow(<DebateCreate {...props}/>);
        component.instance().onClickDebateConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(1);
    })

    it('componentDidMount when user is signed in', async () => {
        const component = shallow(<DebateCreate {...props} signIn={true}/>);
        await component.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledTimes(2);
    })

    it('componentDidMount when user is not signed in', async () => {
        const component = shallow(<DebateCreate {...props} history={mockHistory}/>);
        await component.instance().componentDidMount();
        expect(mockHistory.push).toHaveBeenCalledWith('/tell_me/documents/123/debates');
    })

})

describe ('mapStateToProps', () => {
    it('test props', () => {
        const initialState = {
            tm : {
                selectedDocument : 1,
            },
            usr : {
                signIn : false,
            }
        }
        expect(mapStateToProps(initialState).selectedDocument).toBe(1);
        expect(mapStateToProps(initialState).signIn).toBe(false);
    })
})

describe ('mapDescribeToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test dispatch', () => {
        mapDispatchToProps(dispatch).onGetDocument();
        expect(dispatch).toHaveBeenCalledTimes(1);
        mapDispatchToProps(dispatch).onCreateDebate();
        expect(dispatch).toHaveBeenCalledTimes(2);
        mapDispatchToProps(dispatch).onCheckSignIn();
        expect(dispatch).toHaveBeenCalledTimes(3);
    })
})