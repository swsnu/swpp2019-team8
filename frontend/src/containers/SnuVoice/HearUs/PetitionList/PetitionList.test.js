import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import PetitionList from './PetitionList'
import { history } from '../../../../store/store'
import { getMockStore } from '../../../../test-utils/mocks'
import * as actionCreator from '../../../../store/actions/hearus'

const stubInitialState = {
    match : {
        params : {
            petition_title : "!@3"
        }
    },
    selectedUser: {
        id: '1'
    },
    petition_list: [
        {
            id: 1,
            status: 'ongoing',
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
    let spyGetAllPetition;
    let spyGetPetitionByTitle;
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
        spyGetAllPetition = jest.spyOn(actionCreator, 'getAllPetitions')
            .mockImplementation(() => {return dispatch => {}; });
        spyGetPetitionByTitle = jest.spyOn(actionCreator, 'getPetitionByTitle')
            .mockImplementation((title) => {return dispatch => {}; })
    });

    afterEach(() => {
        jest.clearAllMocks();
        delete global.__mobxInstanceCount;
    })

    it('should render PetitionList', () => {
        const component = mount(petitionList)
        const top = component.find('.TopOfPage')
        expect(top.length).toBe(1)
    })

    
    it('should list_prev_button works', async () => {
        const component = await mount(petitionList);
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

    it('should petitionOrderButtonWorks',async () => {
        const component = await mount(petitionList);
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

    it('should petitionStateButtonWorks', async () => {
        const component = await mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        const ongoingButton = component.find('#ongoing_petition_button').at(0)
        const endedButton = component.find('#ended_petition_button').at(0)
        endedButton.simulate('click')
        expect(petitionListComponent.state.petitionState).toBe('end')
        petitionListComponent.forceUpdate()
        let petition = component.find('Petition')
        expect(petition.length).toBe(20)
        ongoingButton.simulate('click')
        expect(petitionListComponent.state.petitionState).toBe('ongoing')
        petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should clickCategoryButton work', async () => {
        const component = await mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickCategoryButton({ target: { value: 'welfare' } })
        const petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should clickListNumberButton work', async () => {
        const component = await mount(petitionList);
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

    it('should sort well', async () => { // something strange
        const component = await mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickPetitionTabButton('end')
        petitionListComponent.forceUpdate()
        petitionListComponent.onClickPetitionOrderButton({ target: { value: '123' } })
        petitionListComponent.forceUpdate()
        const petition = component.find('Petition')
        expect(petition.length).toBe(2)
    })

    it('should onClickDetailButtonWorks', async () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = await mount(petitionList);
        const petitionListComponent = component.find(PetitionList.WrappedComponent).instance();
        petitionListComponent.onClickDetailButton({target : {value : '1'}})
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/petition/1')


    })

    it('should clickListNextButton, listPrevButton works well', async () => {
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
        const component = await mount(
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

    it('should componentDidMount works', async () => {
        const component = await mount(petitionList);
        expect(spyGetAllPetition).toHaveBeenCalledTimes(1);

    })




})
