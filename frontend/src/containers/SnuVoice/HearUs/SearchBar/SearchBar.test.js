import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SearchBar from './SearchBar';
import { history } from '../../../../store/store';
import { getMockStore } from '../../../../test-utils/mocks';

describe('<SearchBar />', () => {
    const stubInitialState = {
        selectedUser: {
            id: 1
        },
        signIn: true
    }

    const mockStore = getMockStore(stubInitialState)

    let searchBar;
    let spyHistoryPush;

    beforeEach(() => {
        searchBar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SearchBar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
    })

    afterEach(() => { jest.clearAllMocks() })

    it('should render without error', () => {
        const component = mount(searchBar)
        const search = component.find('.searchBar').at(0)
        const buttons = component.find('.userOptions').at(0)
        expect(search.length).toBe(1)
        expect(buttons.length).toBe(1)
    })

    it('should render without error - 2', () => {
        let mockState = {
            selectedUser: {
                id: 1
            },
            signIn: false
        }
        let reMockStore = getMockStore(mockState)
        let mockSearchBar = (
            <Provider store={reMockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SearchBar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        const component = mount(mockSearchBar)
        const buttons = component.find('.userOptions').at(0)
        expect(buttons.length).toBe(0)
    })

    it('should buttons work', () => {
        const component = mount(searchBar)
        const createButton = component.find('#create_button').at(0)
        const myPetitionButton = component.find('#my_petition_button').at(0)
        createButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/create')
        myPetitionButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledTimes(2)
    })

    it('should search works', () => {
        const component = mount(searchBar)
        const searchBarInstance = component.find(SearchBar.WrappedComponent).instance()
        const searchInput = component.find('#search_input').at(0)
        const searchButton = component.find('#search_confirm_button').at(0)
        searchInput.simulate('change', { target: { value: '12   ' } })
        expect(searchBarInstance.state.searchInput).toBe('12   ')
        searchButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/search/12')
    })

    it('should onKeyPress works', () => {
        let mocked = jest.fn()
        const component = mount(searchBar)
        const searchBarInstance = component.find(SearchBar.WrappedComponent).instance()
        searchBarInstance.onClickSearchConfirmButton = mocked;
        searchBarInstance.onKeyPress({ key: '123' })
        expect(mocked).toHaveBeenCalledTimes(0)
        searchBarInstance.setState({
            searchInput : '123'
        })
        searchBarInstance.onKeyPress({ key: 'Enter' })
        expect(mocked).toHaveBeenCalledTimes(1)
    })

})