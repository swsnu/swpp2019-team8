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
        votes: 'SELECTED_PETITION_TEST_VOTES',
        category: 'SELECTED_PETITION_TEST_CATEGORY',
        start_date: '0000-00-00T00:00:00.000',
        end_date: '0000-00-00T00:00:00.000',
        author: 1,
        link: 'SELECTED_PETITION_TEST_LINK',
    },
    selectedUser: {
        nickname: 'SELECTED_PETITION_TEST_NICKNAME',
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
        const wrapperVotes = component.find('.petitionsView_count');
        const wrapperCategory = component.find('.petitionsView_category');
        const wrapperStartDate = component.find('.petitionsView_start_date');
        const wrapperEndDate = component.find('.petitionsView_end_date');
        const wrapperPetitioner = component.find('.petitionsView_petitioner');
        const wrapperLink = component.find('.View_write_link');
        expect(wrapperTitle.at(0).text()).toBe('SELECTED_PETITION_TEST_TITLE');
        expect(wrapperContent.at(0).text()).toBe('SELECTED_PETITION_TEST_CONTENT');
        expect(wrapperVotes.at(0).text()).toBe('Votes: [ SELECTED_PETITION_TEST_VOTES ]');
        expect(wrapperCategory.at(0).text()).toBe('Category: SELECTED_PETITION_TEST_CATEGORY');
        expect(wrapperStartDate.at(0).text()).toBe('Start: 0000-00-00');
        expect(wrapperEndDate.at(0).text()).toBe('End: 0000-00-00');
        expect(wrapperPetitioner.at(0).text()).toBe('Petitioner: SELECTED_PETITION_TEST_NICKNAME');
        // expect(wrapperLink.at(0).text()).toBe('Link 1 : SELECTED_PETITION_TEST_LINK');
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
        const wrapperVotes = component.find('.petitionsView_count');
        const wrapperCategory = component.find('.petitionsView_category');
        const wrapperStartDate = component.find('.petitionsView_start_date');
        const wrapperEndDate = component.find('.petitionsView_end_date');
        const wrapperPetitioner = component.find('.petitionsView_petitioner');
        const wrapperLink = component.find('.View_write_link');
        expect(wrapperTitle.at(0).text()).toBe('');
        expect(wrapperContent.at(0).text()).toBe('');
        expect(wrapperVotes.at(0).text()).toBe('Votes: [  ]');
        expect(wrapperCategory.at(0).text()).toBe('Category: ');
        expect(wrapperStartDate.at(0).text()).toBe('Start: ');
        expect(wrapperEndDate.at(0).text()).toBe('End: ');
        expect(wrapperPetitioner.at(0).text()).toBe('Petitioner: ');
        // expect(wrapperLink.at(0).text()).toBe('Link 1 : ');
    });
});