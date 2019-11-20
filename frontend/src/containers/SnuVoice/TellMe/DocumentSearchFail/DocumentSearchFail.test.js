import React from 'react';
import { shallow, mount } from 'enzyme';

import { DocumentSearchFail, mapDispatchToProps, mapStateToProps } from './DocumentSearchFail';

jest.mock('../../UpperBar/UpperBar', () => {
    return jest.fn(props => {
        return <div/>
    })
})
jest.mock('../SearchBar/SearchBar', () => {
    return jest.fn(props => {
        return <div/>
    })
})
describe('<DocumentSearchFail/>', () => {
    let props;
    let mocked = jest.fn();
    let historyMock = {push : jest.fn()}

    beforeEach(() => {
        props = {
            selectedDocument : null,
            titleDocuments : [
                {
                    id : 1,
                    title : '123'
                },
                {
                    id : 2,
                    title : '123'
                },
                {
                    id : 3,
                    title : '123'
                },
                {
                    id : 4,
                    title : '123'
                },
            ],
            contentDocuments : [
                {
                    id : 5,
                    title : '123'
                },
                {
                    id : 6,
                    title : '123'
                },
                {
                    id : 7,
                    title : '123'
                },
                {
                    id : 8,
                    title : '123'
                },
            ],
            getDocument : mocked,
            match : {
                params : {
                    document_title : '1'
                }
            }
        }
        
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors', () => {
        const component = shallow(<DocumentSearchFail {...props} history={historyMock}/>)
        const buttons = component.find('Button')
        const fail = component.find('.DocumentSearchFail')
        expect(buttons.length).toBe(8)
        expect(fail.length).toBe(1)
    })

    it('should onClickDetailButton works', () => {
        const component = shallow(<DocumentSearchFail {...props} history={historyMock}/>)
        component.instance().onClickDetailButton({ target : {value : '123'}})
        expect(historyMock.push).toHaveBeenCalledWith('/tell_me/documents/123')
    })

    it('should componentDidMount works', async () => {
        const component = shallow(<DocumentSearchFail {...props} history={historyMock}/>)
        await component.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledWith('1')
        expect(historyMock.push).toHaveBeenCalledTimes(0)
    })

    it('should componentDidMount works at selectedDocument is null', async () => {
        props = {
            selectedDocument : {
                title : '123'
            },
            getDocument : mocked,
            titleDocuments : [],
            contentDocuments : [],
            match : {
                params :{
                    document_title : '123'
                }
            }
            
        }
        const component = shallow(<DocumentSearchFail {...props} history={historyMock}/>)
        await component.instance().componentDidMount();
        expect(historyMock.push).toHaveBeenCalledWith('/tell_me/documents/123')
    }) 

})

describe('mapDispathToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it ('test getDocument', () => {
        mapDispatchToProps(dispatch).getDocument();
        expect(dispatch).toHaveBeenCalledTimes(1);
    })

})

describe('mapStateToProps', () => {
    it('test props', () => {
        const initialState = {
            tm : {
                selectedDocument : 123,
                titleDocuments : [
                    {
                        id : 1
                    },
                    {
                        id : 2
                    }
                ],
                contentDocuments : [
                    {
                        id: 3
                    }
                ]
            }
        }
        expect(mapStateToProps(initialState).titleDocuments.length).toBe(2)
        expect(mapStateToProps(initialState).contentDocuments.length).toBe(1)
        expect(mapStateToProps(initialState).selectedDocument).toBe(initialState.tm.selectedDocument)
    })
})