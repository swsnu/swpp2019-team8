import React from 'react';
import { shallow } from 'enzyme';

import { DebateCreate, mapDispatchToProps, mapStateToProps } from './DebateCreate';

describe('<DebateCreate />', () => {
    let props;
    let mocked = jest.fn();

    beforeEach(() => {
        props = {
            selectedDocument: {
                title: '1'
            },
            onGetDocument: mocked,
            onCreateDebate: mocked,
            match : {
                params : {
                    document_title : "123"
                }
            }
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

    it('should fuctions works', () => {
        const componenet = shallow(<DebateCreate {...props}/>);
        componenet.instance().onClickDebateConfirmButton();
        expect(mocked).toHaveBeenCalledTimes(1);
        componenet.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledWith("123");

    })

})

describe ('mapStateToProps', () => {
    it('test props', () => {
        const initialState = {
            tm : {
                selectedDocument : 1
            }
        }
        expect(mapStateToProps(initialState).selectedDocument).toBe(1);
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
    })
})