import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import HearUs from './HearUs';
import { history } from '../../../store/store';
import { getMockStore } from '../../../test-utils/mocks';
import * as actionCreator from '../../../store/actions/hearus';

const stubInitialState = {
    petition_list: [
        {
            id: 1,
            status: 'ongoing',
            title: 'Iluvswpp',
            category: 'welfare',
            end_date: '2019-12-07',
            start_date: 1,
            votes: 123
        },
        {
            id: 2,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: '2019-12-08',
            start_date: 32,
            votes: 1
        },
        {
            id: 3,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: 123,
            start_date: 21,
            votes: 1
        },
        {
            id: 4,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: '2019-12-08',
            start_date: 123,
            votes: 125
        },
        {
            id: 5,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: '2019-12-08',
            start_date: 1,
            votes: 125312
        },
        {
            id: 6,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: '2019-12-08',
            start_date: 123,
            votes: 12
        },
        {
            id: 7,
            status: 'ongoing',
            title: 'Ihateswpp',
            category: 'human rights',
            end_date: '2019-12-08',
            start_date: 123,
            votes: 12
        }
    ],
    selectedUser: { id: 1 },
}

const mockStore = getMockStore(stubInitialState);

describe('<HearUs/>', () => {
    let hearus;
    let spyGetPetitions;
    let spyHistoryPush;

    beforeEach(() => {
        hearus = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={HearUs} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyGetPetitions = jest.spyOn(actionCreator, 'getAllPetitions')
            .mockImplementation(() => { return dispatch => { }; })
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });


    })


    afterEach(() => jest.clearAllMocks())

    it('should render without errors', async () => {
        const component = await mount(hearus)
        const top = component.find('.TopOfPage').at(0)
        expect(top.length).toBe(1);
    })

    it('should + button work', async () => {
        const component = await mount(hearus)
        const petitionListButton = component.find('#petition_list_button').at(0)
        petitionListButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledTimes(1)
    })

    it('should make list well', async () => {
        const component = await mount(hearus)
        const petitionList = component.find('Petition')
        expect(petitionList.length).toBe(10)
    })

    it('should make list well', async () => {
        const component = await mount(hearus)
        const hearUsComponent = component.find(HearUs.WrappedComponent).instance();
        hearUsComponent.setState({ selectedCategory: 'human rights' })
        hearUsComponent.forceUpdate()
        const petitionList = component.find('Petition')
        expect(petitionList.length).toBe(10)
    })

    it('should onClickDetailButton works', async () => {
        const component = await mount(hearus)
        const hearUsComponent = component.find(HearUs.WrappedComponent).instance();
        hearUsComponent.onClickDetailButton({ url: '1' })
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/petition/1')
    })

    it('should onClickCategoryButtons works', async () => {
        const component = await mount(hearus)
        const hearUsComponent = component.find(HearUs.WrappedComponent).instance();
        hearUsComponent.onClickCategoryButton({ target: { value: '1' } })
        expect(hearUsComponent.state.selectedCategory).toBe('1')
    })

    it('should componentDidMount Works', async () => {
        const component = await mount(hearus)
        expect(spyGetPetitions).toHaveBeenCalledTimes(1)
    })

    it('shoud  mount works', async () => {
        let mocked = jest.fn();
        const component = await mount(hearus)
        let petition = component.find('Petition').at(0);
        const hearUsComponent = component.find(HearUs.WrappedComponent).instance();
        hearUsComponent.onClickDetailButton = mocked;
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(1);
        petition = component.find('Petition').at(7);
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(2);
        hearUsComponent.setState({
            selectedCategory : 'human rights'
        })
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(3);
        petition = component.find('Petition').at(0);
        petition.simulate('click')
        expect(mocked).toHaveBeenCalledTimes(4);


    })
})
