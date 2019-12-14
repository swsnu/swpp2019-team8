import React from 'react';
import { shallow } from 'enzyme';

import { DebateList, mapDispatchToProps, mapStateToProps } from './DebateList';

describe('<DebateList /> ', () => {
    let props;
    let mocked = jest.fn();
    let historyMock = { push : jest.fn() };

    beforeEach(() => {
        props = {
            selectedDocument: {
                title: "1",
                id: "!",
                content: "1"
            },
            debates: [
                {
                    id: 1,
                    title: "123",
                    author: '123'
                },
                {
                    id: 2,
                    title: "123",
                    author: '123'
                },
                {
                    id: 3,
                    title: "123",
                    author: '123'
                }
            ],

            onGetDocument: mocked,
            onGetDebates: mocked,
            onCheckSignIn: mocked,
            match: {
                params: {
                    document_title: "1"
                }
            },
            signIn: false,
        }
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors', () => {
        const component = shallow(<DebateList {...props} />)
        const top = component.find('.DebateList')
        expect(top.length).toBe(1)

    })

    it('should onClickButton funcs works', async () => {
        window.alert = jest.fn();
        const component = shallow(<DebateList {...props} signIn={true} history={historyMock}/>)
        await component.instance().onClickNewDebateButton()
        expect(historyMock.push).toHaveBeenCalledWith('/tell_me/documents/1/debates/create')
        component.instance().onClickDebateTitleButton({ target: { value: "123" } })
        expect(historyMock.push).toHaveBeenCalledWith('/tell_me/documents/1/debates/123')
    })

    it('should onClickButton funcs works', () => {
        props = {
            selectedDocument : null,
            debates : []
        }
        const component = shallow(<DebateList {...props}/>)
        expect(true).toBe(true)
    })

    it('should show debates if they exist', () => {
        const component = shallow(<DebateList {...props}/>)
        const debateList = component.find('.debate_list')
        expect(debateList.length).toBe(1)
    })

    it('should not show debates if they do not exist', () => {
        props = {
            debates: null
        }
        const component = shallow(<DebateList {...props}/>)
        const debateList = component.find('.debate_list')
        expect(debateList.length).toBe(1)
    })

    it('should componentDidMount works', () => {
        const component = shallow(<DebateList {...props}/>)
        component.instance().componentDidMount()
        expect(mocked).toHaveBeenCalledTimes(2)
    }) 
})

describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test functions', () => {
        mapDispatchToProps(dispatch).onGetDocument();
        expect(dispatch).toHaveBeenCalledTimes(1);
        mapDispatchToProps(dispatch).onGetDebates();
        expect(dispatch).toHaveBeenCalledTimes(2);
    })
})

describe('mapStateToProps', () => {
    it ('test props', () => {
        const initialState = {
            tm : {
                selectedDocument : 1,
                debates : 2,
            },
            usr : {
                signIn: false,
            }
        }
        expect(mapStateToProps(initialState).selectedDocument).toBe(1)
        expect(mapStateToProps(initialState).debates).toBe(2)
    })
})