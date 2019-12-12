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
    const stubInitialState = {
        documents : [
            {
                title: "1",
                edit_date: "!235124"
            }
        ]
    };
    const mockStore = getMockStore(stubInitialState);

    let tellMe;
    let spyHistoryPush;
    let spyGetDocuments;

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
        spyGetDocuments = jest.spyOn(actionCreator, 'getLatestDocuments')
            .mockImplementation(() => { return dispatch => { }; })
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => { });
    })

    afterEach(() => { jest.clearAllMocks() })

    it('should render without errors', async () => {
        const component = await mount(tellMe)
        const top = component.find('.TellMe').at(0)
        expect(top.length).toBe(1)
        expect(spyGetDocuments).toHaveBeenCalledTimes(1)
    })

    it('should buttons works', async () => {
        const component = await mount(tellMe)
        const createButton = component.find('#create_button').at(0)
        createButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/create')
    })

    it(`should call 'onClickPhotoButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(tellMe);
        const wrapper = component.find('#photo_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/photo');
    });

})