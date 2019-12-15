import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import SnuVoice from './SnuVoice'
import { history } from '../../store/store'
import { getMockStore } from '../../test-utils/mocks'

describe('<SnuVoice />', () => {

    let snuVoice;
    let stubInitialState;
    let mockStore;
    let spyHistoryPush;

    beforeEach(() => {
        stubInitialState = {
            signIn : false
        };
        mockStore = getMockStore(stubInitialState);
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(() => {})
        snuVoice = (
            <Provider store={mockStore}>
                <ConnectedRouter history = {history}>
                    <Switch>
                        <Route path='/' exact component={SnuVoice}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        )
    })

    afterEach(() => {jest.clearAllMocks})

    it('should render without errors', () => {
        const component = mount(snuVoice)
        const wrapper = component.find('.SnuVoice').at(0)
        expect(wrapper.length).toBe(1)
    })

    it('should buttons work', () => {
        const component = mount(snuVoice)
        const tellMeButton = component.find('#tell_me_button').at(0)
        const hearUsButton = component.find('#hear_us_button').at(0)
        tellMeButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me')
        hearUsButton.simulate('click')
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us')
    })
})