import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import PetitionDetail from './PetitionDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';

const stubInitialState = {
    selectedPetition: {
        title: 'SELECTED_PETITION_TEST_TITLE',
        content: 'SELECTED_PETITION_TEST_CONTENT',
    },
}

const mockStore = getMockStore(stubInitialState);

describe('<PetitionDetail />', () => {
    let petitionDetail;
    beforeEach(() => {
        petitionDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it(`should render PetitionDetail`, () => {
        const component = mount(petitionDetail);
        const wrapper = component.find('.PetitionDetail');
        expect(wrapper.length).toBe(1);
    });

    it(`should render SELECTED_PETITION`, () => {
        const component = mount(petitionDetail);
        const wrapperTitle = component.find('.petitionsView_title');
        const wrapperContent = component.find('.View_write');
        expect(wrapperTitle.at(0).text()).toBe('SELECTED_PETITION_TEST_TITLE');
        expect(wrapperContent.at(0).text()).toBe('SELECTED_PETITION_TEST_CONTENT');
    });

    it(`should not render SELECTED_PETITION`, () => {
        const mockInitialStore = getMockStore({ selectedPetition: null });
        const component = mount(
            <Provider store={mockInitialStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const wrapperTitle = component.find('.petitionsView_title');
        const wrapperContent = component.find('.View_write');
        expect(wrapperTitle.at(0).text()).toBe('');
        expect(wrapperContent.at(0).text()).toBe('');
    });
});