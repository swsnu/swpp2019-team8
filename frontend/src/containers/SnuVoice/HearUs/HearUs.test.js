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
                    votes: 123
                },
                {
                    id: 2,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    votes: 1
                },
                {
                    id: 3,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    votes: 1
                },
                {
                    id: 4,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    votes: 125
                },
                {
                    id: 5,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    votes: 125
                },
                {
                    id: 6,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
                    votes: 125
                },
                {
                    id: 7,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    end_date: '2019-12-08',
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
        

    it('should myPetiion button work', () => {        
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        const myPetitionButton = component.find('#my_petition_button')
        myPetitionButton.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/hear_us/my_petition/1')
    })

    it('should create button work', () => {
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        const createButton = component.find('#create_button')
        createButton.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/hear_us/create')
    })

    it('should serachConfirm button work', () => {
        Storage.prototype.setItem = jest.fn(() => { })
        const component = shallow(<HearUs {...props} history={historyMock}/>)
        const searchConfirmButton = component.find('#search_confirm_button')
        searchConfirmButton.simulate('click')
        expect(historyMock.push).toHaveBeenCalledWith('/hear_us/search')
    })

    it('should searchInput change work', () => {
        Storage.prototype.setItem = jest.fn(() => { })
        let temp = '123'
        const component = shallow(<HearUs {...props}/>)
        const searchInput = component.find('#search_input')
        searchInput.simulate('change', { target: { value: temp } })
        expect(component.instance().state.search).toBe(temp)
    })

    it('should make list well', () => {
        const component = shallow(<HearUs {...props}/>)
        const petitionList = component.find('Petition')
        expect(petitionList.length).toBe(10)
    })

    it('should make list well', () => {
        const component = shallow(<HearUs {...props}/>)
        component.instance().setState({ selectedCategory : 'human rights'})
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

    // it('should componentDidMount Works', () => {
    //     Storage.prototype.removeItem = mocked
    //     const component = mount(hearUs)
    //     expect(mocked).toHaveBeenCalledTimes(1)
    // })
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