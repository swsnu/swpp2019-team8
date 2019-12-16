import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import TellMeSearchBar from './TellMeSearchBar';
import { history } from '../../../../store/store';
import { getMockStore } from '../../../../test-utils/mocks';
import * as actionCreator from '../../../../store/actions/tellme';

describe('<SearchBar/>', () => {
    const stubInitialState = {
        selectedDocument: {
            title: '123'
        },
        selectedPhoto : 1,
        signIn : false
    }

    const mockStore = getMockStore(stubInitialState)


    let searchBar;
    let spyGetDocument;
    let spyHistoryPush;
    let spyGetPhoto;

    beforeEach(() => {
        searchBar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TellMeSearchBar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyGetDocument = jest.spyOn(actionCreator, 'getDocument')
            .mockImplementation(() => { return dispatch => { } })
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
        spyGetPhoto = jest.spyOn(actionCreator, 'getPhoto')
            .mockImplementation(() => {return dispatch => { }})
    })

    afterEach(() => { jest.clearAllMocks() })

    it('should render without erros', () => {
        const component = mount(searchBar)
        const search = component.find('.searchBar').at(0)
        expect(search.length).toBe(1)
    })

    it('should onClickConfirmButton work', async () => {
        let mocked = jest.fn();
        window.alert = mocked;
        const component = mount(searchBar)
        const searchBarComponent = component.find(TellMeSearchBar.WrappedComponent).instance()
        searchBarComponent.setState({
            searchInput: 'hi   '
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyGetDocument).toHaveBeenCalledWith('hi')
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/documents/hi')
        searchBarComponent.setState({
            searchInput: 'hi.jpg'
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyHistoryPush).toHaveBeenCalledTimes(2)
        searchBarComponent.setState({
            searchInput: '////////'
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(mocked).toHaveBeenCalledTimes(1)
    })

    it('should onClickConfirmButton work', async () => {
        let mockState = {
            selectedDocument: null,
            selectedPhoto: null,
            signIn : false
        }
        let remockStore = getMockStore(mockState)
        searchBar = (
            <Provider store={remockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TellMeSearchBar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        const component = mount(searchBar)
        const searchBarComponent = component.find(TellMeSearchBar.WrappedComponent).instance()
        searchBarComponent.setState({
            searchInput : "hi.jpg"
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/search_fail/hi.jpg')
        searchBarComponent.setState({
            searchInput : "hi"
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyHistoryPush).toHaveBeenCalledTimes(2)
        searchBarComponent.setState({
            searchInput : "            "
        })
        await searchBarComponent.onClickSearchConfirmButton()
        expect(spyHistoryPush).toHaveBeenCalledTimes(2)
    })

    it('should onClickConfirmButton work', async () => {
        let mocked = jest.fn();
        const component = mount(searchBar)
        const searchBarComponent = component.find(TellMeSearchBar.WrappedComponent).instance()
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
        const searchBarComponent = component.find(TellMeSearchBar.WrappedComponent).instance()
        searchBarComponent.onChangeSearchInput({ target: { value: 1 } })
        expect(searchBarComponent.state.searchInput).toBe(1)

    })


})