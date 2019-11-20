import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SearchBar from './SearchBar';
import { history } from '../../../../store/store';
import { getMockStore } from '../../../../test-utils/mocks';
import * as actionCreator from '../../../../store/actions/tellme';

describe('<SearchBar/>', () => {
    const stubInitialState = {
        selectedDocument: {
            title: '123'
        }
    }

    const mockStore = getMockStore(stubInitialState)


    let searchBar;
    let spyGetDocument;
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
        spyGetDocument = jest.spyOn(actionCreator, 'getDocument')
            .mockImplementation(() => { return dispatch => { } })
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
    })

    afterEach(() => { jest.clearAllMocks() })

    it('should render without erros', () => {
        const component = mount(searchBar)
        const search = component.find('.SearchBar').at(0)
        expect(search.length).toBe(1)
    })

    it('should onClickCreateBButton work', () => {
        const component = mount(searchBar)
        const searchBarComponent = component.find(SearchBar.WrappedComponent).instance()
        searchBarComponent.onClickCreateButton()
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/create')
    })

    it('should onClickConfirmButton work', async () => {
        const component = mount(searchBar)
        const searchBarComponent = component.find(SearchBar.WrappedComponent).instance()
        searchBarComponent.setState({
            searchInput: 'hi   '
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyGetDocument).toHaveBeenCalledWith('hi')
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/documents/123')
    })

    it('should onClickConfirmButton work', async () => {
        let mockState = {
            selectedDocument: null
        }
        let remockStore = getMockStore(mockState)
        searchBar = (
            <Provider store={remockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={SearchBar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        const component = mount(searchBar)
        const searchBarComponent = component.find(SearchBar.WrappedComponent).instance()
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyHistoryPush).toHaveBeenCalledTimes(0)
    })

    it('should onClickConfirmButton work', async () => {
        let mocked = jest.fn();
        const component = mount(searchBar)
        const searchBarComponent = component.find(SearchBar.WrappedComponent).instance()
        searchBarComponent.onClickSearchConfirmButton = mocked
        searchBarComponent.onKeyPress({ key: 'Entr' })
        expect(mocked).toHaveBeenCalledTimes(0)
        searchBarComponent.setState({
            searchInput : '123'
        })
        searchBarComponent.onKeyPress({ key: 'Enter' })
        expect(mocked).toHaveBeenCalledTimes(1)

    })

    it('should onClickConfirmButton work', async () => {
        const component = mount(searchBar)
        const searchBarComponent = component.find(SearchBar.WrappedComponent).instance()
        searchBarComponent.onChangeSearchInput({ target: { value: 1 } })
        expect(searchBarComponent.state.searchInput).toBe(1)

    })


})