import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import HearUsSearchBar from './HearUsSearchBar';
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
                        <Route path='/' exact component={HearUsSearchBar} />
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
        expect(search.length).toBe(1)
    })

    it('should search works', () => {
        let mocked = jest.fn();
        window.alert = mocked;
        const component = mount(searchBar)
        const searchBarInstance = component.find(HearUsSearchBar.WrappedComponent).instance()
        const searchInput = component.find('#search_input').at(0)
        const searchButton = component.find('#search_confirm_button').at(0)
        searchInput.simulate('change', { target: { value: '12   ' } })
        expect(searchBarInstance.state.searchInput).toBe('12   ')
        searchButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us/search/12')
        searchBarInstance.setState({
            searchInput : '///'
        });
        searchButton.simulate('click');
        expect(mocked).toHaveBeenCalledTimes(1);
        searchBarInstance.setState({
            searchInput : '    '
        });
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);

    })

    it('should onKeyPress works', () => {
        let mocked = jest.fn()
        const component = mount(searchBar)
        const searchBarInstance = component.find(HearUsSearchBar.WrappedComponent).instance()
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