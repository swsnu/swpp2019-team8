import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import TellMe from './TellMe'
import { history } from '../../../store/store'
import { getMockStore } from '../../../test-utils/mocks'
import * as actionCreator from '../../../store/actions/tellme'

describe('<TellMe/>', () => {
    const stubInitialState = {};
    const mockStore = getMockStore(stubInitialState);

    let tellMe;
    let spyHistoryPush;
    let spyGetDocumentByTitle;

    beforeEach(() => {
        tellMe = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TellMe} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
        spyGetDocumentByTitle = jest.spyOn(actionCreator, 'getDocument')
            .mockImplementation((title) => { return dispatch => { }; })
    })

    afterEach(() => { jest.clearAllMocks() })

    it('should render without errors', () => {
        const component = mount(tellMe)
        const top = component.find('.TopOfPage').at(0)
        expect(top.length).toBe(1)
    })

    it('should buttons works', () => {
        const component = mount(tellMe)
        const createButton = component.find('#create_button').at(0)
        const searchButton = component.find('#search_confirm_button').at(0)
        createButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/create')
        searchButton.simulate('click')
        expect(spyGetDocumentByTitle).toHaveBeenCalledTimes(1)
    })

    it('should searchInput works', () => {
        const component = mount(tellMe)
        const searchInput = component.find('#search_input').at(0)
        const tellMeComponent = component.find(TellMe.WrappedComponent).instance();
        let temp = '2';
        searchInput.simulate('change', { target: { value: temp } })
        expect(tellMeComponent.state.search).toBe(temp)
    })


})