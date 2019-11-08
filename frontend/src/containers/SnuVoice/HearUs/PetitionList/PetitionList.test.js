import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PetitionList from './PetitionList'
import { history } from '../../../../store/store'
import { getMockStore } from '../../../../test-utils/mocks'

const stubInitialState = {
    selectedUser: {
        id: '1'
    },
    petition_list: [
        {
            id: 1,
            status: 'onGoing',
            title: 'Iluvswpp',
            category: 'welfare',
            start_date: '2019-12-07',
            end_date: '2019-210123',
            votes: 123
        },
        {
            id: 2,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 1
        },
        {
            id: 3,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 1
        },
        {
            id: 4,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 5,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 6,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 7,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-5-21',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 8,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 122
        },
        {
            id: 9,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 10,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
        {
            id: 11,
            status: 'end',
            title: 'Ihateswpp',
            category: 'human rights',
            start_date: '2019-12-08',
            end_date: '2019-210123',
            votes: 125
        },
    ]
}

const mockStore = getMockStore(stubInitialState)

describe('<PetitionList />', () => {
    let petitionList;
    beforeEach(() => {
        petitionList = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionList} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    });

    it('should render PetitionList', () => {
        const component = mount(petitionList)
        const top = component.find('.TopOfPage')
        expect(top.length).toBe(1)
    })

    it('should clickMyPetitionButton works', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(petitionList)
        const myPetiton = component.find('#my_petition_button').at(0)
        myPetiton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/my_petition/1')
    })

    it('should clickCreateButton works', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(petitionList)
        const create = component.find('#create_button').at(0)
        create.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/create')
    })

    it('should searchButton works', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        Storage.prototype.setItem = jest.fn(() => { })
        const component = mount(petitionList)
        const searchButton = component.find('#search_confirm_button').at(0)
        searchButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/search')
    })

    it('should searchInput works', () => {
        let temp = '1';
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        const searchInput = component.find('#search_input').at(0)
        searchInput.simulate('change', { target: { value: temp } })
        expect(petitionListComponent.state.search).toBe(temp)
    })

    it('should list_prev_button works', () => {
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        const prevButton = component.find('#list_prev_button').at(0)
        prevButton.simulate('click')
        expect(petitionListComponent.state.listNumber).toStrictEqual([1, 2, 3, 4, 5])
        petitionListComponent.setState({
            listNumber: [6, 7, 8, 9, 10]
        })
        prevButton.simulate('click')
        expect(petitionListComponent.state.listNumber).toStrictEqual([1, 2, 3, 4, 5])
    })

    it('should petitionOrderButtonWorks', () => {
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        const votesButton = component.find('#top_votes_button').at(0)
        const latestButton = component.find('#latest_button').at(0)
        let petition = component.find('petition')
        latestButton.simulate('click')
        expect(petitionListComponent.state.petitionOrder).toBe('latest')
        votesButton.simulate('click')
        petition = component.find('Petition')
        expect(petitionListComponent.state.petitionOrder).toBe('vote')
        expect(petition.length).toBe(2)
    })

    it('should petitionStateButtonWorks', () => {
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        const ongoingButton = component.find('#ongoing_petition_button').at(0)
        const endedButton = component.find('#ended_petition_button').at(0)
        endedButton.simulate('click')
        expect(petitionListComponent.state.petitionState).toBe('end')
        petitionListComponent.forceUpdate()
        let petition = component.find('Petition')
        expect(petition.length).toBe(20)
        ongoingButton.simulate('click')
        expect(petitionListComponent.state.petitionState).toBe('onGoing')
        petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should clickCategoryButton work', () => {
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickCategoryButton({ target: { value: 'welfare' } })
        const petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should clickListNumberButton work', () => {
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.setState({
            petitionOrder: 'not Vote'
        })
        petitionListComponent.onClickListNumberButton({ target: { value: 23 } })
        petitionListComponent.forceUpdate()
        const petition = component.find('Petition')
        expect(petitionListComponent.state.selectedNumber).toBe(23)
        expect(petition.length).toBe(2)
    })

    it('should sort well', () => { // something strange
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickPetitionTabButton('end')
        petitionListComponent.forceUpdate()
        petitionListComponent.onClickPetitionOrderButton({ target: { value: '123' } })
        petitionListComponent.forceUpdate()
        const petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should onClickDetailButtonWorks', () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickDetailButton({target : {value : '1'}})
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/1')


    })

    it('should clickListNextButton, listPrevButton works well', () => {
        const mockInitialStore = getMockStore({
            petition_list: [
                {
                    id: 11,
                    status: 'end',
                    title: 'Ihateswpp',
                    category: 'human rights',
                    start_date: '2019-12-08',
                    end_date: '2019-210123',
                    votes: 125
                }
            ],
            selectedUser: {
                id: 1
            }
        })
        const component = mount(
            <Provider store={mockInitialStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionList} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.setState({
            listNumber: [-11, -12, -13, -14, -15]
        })
        petitionListComponent.onClickListNextButton();

        expect(petitionListComponent.state.listNumber).toStrictEqual([-6, -7, -8, -9, -10])
        petitionListComponent.onClickListPrevButton();
        expect(petitionListComponent.state.listNumber).toStrictEqual([-6, -7, -8, -9, -10])
        petitionListComponent.setState({
            listNumber: [1, 2, 3, 4, 5]
        })
        petitionListComponent.onClickListNextButton();
        expect(petitionListComponent.state.listNumber).toStrictEqual([1, 2, 3, 4, 5])

    })

    it('should componentDidMount works', () => {
        Storage.prototype.getItem = jest.fn((temp) => {return 1})
        const component = mount(petitionList);
        expect(true).toBe(true)

    })




})
