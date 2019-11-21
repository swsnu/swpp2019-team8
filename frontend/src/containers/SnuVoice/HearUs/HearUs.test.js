import React from 'react';
import { shallow, mount } from 'enzyme';

import { HearUs, mapDispatchToProps, mapStateToProps } from './HearUs';

describe('<HearUs/>', () => {
    let props;
    let mocked = jest.fn();
    let historyMock = {push : jest.fn()}

    beforeEach(() => {
        props = {
            petitionList: [
                {
                    id: 1,
                    status: 'OnGoing',
                    title: 'Iluvswpp',
                    category: 'welfare',
                    end_date: '2019-12-07',
                    start_date: 1,
                    votes: 123
                },
                {
                    id: 2,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    start_date: 32,
                    votes: 1
                },
                {
                    id: 3,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: 123,
                    start_date: 21,
                    votes: 1
                },
                {
                    id: 4,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    start_date: 123,
                    votes: 125
                },
                {
                    id: 5,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    start_date: 1,
                    votes: 125
                },
                {
                    id: 6,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    start_date: 123,
                    votes: 125
                },
                {
                    id: 7,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    start_date: 123,
                    votes: 125
                },
            ],
            selectedUser: { id: 1 },
            getAllPetitions: mocked
        }
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without errors', () => {
        const component = shallow(<HearUs {...props}/>)
        const top = component.find('.TopOfPage')
        expect(top.length).toBe(1);
    })

    it('should + button work', () => {
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        const petitionListButton = component.find('#petition_list_button')
        petitionListButton.simulate('click')
        expect(historyMock.push).toHaveBeenCalledTimes(1)
    })
        
    it('should make list well', () => {
        const component = shallow(<HearUs {...props}/>)
        const petitionList = component.find('Petition')
        expect(petitionList.length).toBe(10)
    })

    it('should make list well', () => {
        const component = shallow(<HearUs {...props}/>)
        component.instance().setState({ selectedCategory : 'human rights'})
        component.instance().forceUpdate()
        const petitionList = component.find('Petition')
        expect(petitionList.length).toBe(10)
    })

    it ('should onClickDetailButton works', () => {
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        component.instance().onClickDetailButton({target : {value : '1'}})
        expect(historyMock.push).toHaveBeenCalledWith('/hear_us/1')
    })

    it ('should onClickCategoryButtons works', () => {
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        component.instance().onClickCategoryButton({target : {value : '1'}})
        expect(component.instance().state.selectedCategory).toBe('1')
    })

    it('should componentDidMount Works', () => {
        Storage.prototype.removeItem = mocked
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        component.instance().componentDidMount();
        expect(mocked).toHaveBeenCalledTimes(1)
    })
})

describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test getAllPetitions', () => {
        mapDispatchToProps(dispatch).getAllPetitions();
        expect(dispatch).toHaveBeenCalledTimes(1)
    })

})

describe('mapStateToProps', () => {
    
    it('test props', () => {
        const initialState = {
            hu: {
                petition_list: [
                    {
                        id: 1,
                        status: 'OnGoing',
                        title: 'Iluvswpp',
                        category: 'welfare',
                        end_date: '2019-12-07',
                        votes: 123
                    },
                    {
                        id: 2,
                        status: 'end',
                        title: 'Ihateswpp',
                        category: 'welfare',
                        end_date: '2019-12-08',
                        votes: 1
                    }
                ],
            },
            usr: {
                selectedUser: '1'
            }
        }
        expect(mapStateToProps(initialState).petitionList.length).toBe(2);
        expect(mapStateToProps(initialState).selectedUser).toBe('1');
    })
})