import React from 'react';
import { shallow } from 'enzyme';

import { DebateDetail, mapDispatchToProps, mapStateToProps } from './DebateDetail';

describe('<DebateDetail/>', () => {
    let props;
    let mocked = jest.fn();

    beforeEach(() => {
        props = {
            selectedDocument: {
                title: "123"
            },
            selectedDebate: {
                title: "234",
                content: "345"
            },
            debateComments: [
                {
                    id: 1,
                    comment: '123',
                    author: 'hi',
                    date: '1234'
                },
                {
                    id: 2,
                    comment: '123',
                    author: 'hi',
                    date: '1234'
                },
                {
                    id: 3,
                    comment: '123',
                    author: 'hi',
                    date: '1234'
                }
            ],
            onGetDocument: mocked,
            onGetDebate: mocked,
            onGetDebateComments: mocked,
            onPostDebateComment: mocked,
            match: {
                params: {
                    document_title: "123",
                    debate_id: "1"
                }
            }
        }
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors', () => {
        const component = shallow(<DebateDetail {...props} />);
        const top = component.find(".TopOfPage");
        expect(top.length).toBe(1);
    })

    it('render documentTitle as empty if selectedDocument does not exist', () => {
        const component = shallow(<DebateDetail selectedDocument={false} debateComments={[]}/>);
        let wrapper = component.find(".documentTitle");
        expect(wrapper.text()).toEqual(" (Debate)");
    })

    it('render debate title and content as empty if selectedDebate does not exist', () => {
        const component = shallow(<DebateDetail selectedDebate={false} debateComments={[]}/>);
        let wrapper = component.find(".debateContent");
        expect(wrapper.text()).toEqual("");
        wrapper = component.find("#debate_title_text");
        expect(wrapper.text()).toEqual("");
    })

    it('should input, button works errors', async () => {
        const component = shallow(<DebateDetail {...props} />);
        const newInput = component.find("#debate_new_comment_textarea");
        const comment = component.find("#debate_comment_confirm_button");
        newInput.simulate('change', { target: { value: "123" } });
        await comment.simulate('click');
        expect(mocked).toHaveBeenCalledTimes(2);
        expect(component.instance().state.comment).toBe('');
    })

    it ('should componentDidMountWorks', async () => {
        const component = shallow(<DebateDetail {...props} />);
        await component.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledTimes(3);
    })

})

describe('mapStateToProps', () => {
    it ('test props', () => {
        const initialState = {
            tm : {
                selectedDocument : '123',
                selectedDebate : '1',
                debateComments : [1, 3, 4]
            }
        };
        expect(mapStateToProps(initialState).selectedDocument).toBe('123');
        expect(mapStateToProps(initialState).selectedDebate).toBe('1');
        expect(mapStateToProps(initialState).debateComments).toStrictEqual([1, 3, 4]);
    })
})

describe('mapDispatchToProps', () => {
    let dispatch = jest.fn();

    afterEach(() => jest.clearAllMocks())

    it('should dispatch work', () => {
        mapDispatchToProps(dispatch).onGetDocument();
        expect(dispatch).toHaveBeenCalledTimes(1);

        mapDispatchToProps(dispatch).onGetDebate({title : 1}, 1);
        expect(dispatch).toHaveBeenCalledTimes(2);

        mapDispatchToProps(dispatch).onGetDebateComments();
        expect(dispatch).toHaveBeenCalledTimes(3);

        mapDispatchToProps(dispatch).onPostDebateComment();
        expect(dispatch).toHaveBeenCalledTimes(4);

    })
})
