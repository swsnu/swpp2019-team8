import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import PetitionDetail from './PetitionDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/hearus';

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
    comment_list: [
        { id: 1, comment: 'COMMENT_TEST_COMMENT_1' },
        { id: 2, comment: 'COMMENT_TEST_COMMENT_2' },
        { id: 3, comment: 'COMMENT_TEST_COMMENT_3' },
    ],
}

const mockStore = getMockStore(stubInitialState);

describe('<PetitionDetail />', () => {
    let petitionDetail;
    const { reload } = window.location;

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

    beforeAll(() => {
        Object.defineProperty(window.location, 'reload', {
            configurable: false,
        });
        window.location.reload = jest.fn();
    });

    afterAll(() => {
        window.location.reload = reload;
    });

    it('mocks reload function', () => {
        expect(jest.isMockFunction(window.location.reload)).toBe(true);
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
        // expect(wrapperPetitioner.at(0).text()).toBe('Petitioner: ');
        // expect(wrapperLink.at(0).text()).toBe('Link 1 : ');
    });

    it(`should render STORED_PETITION_COMMENTS`, () => {
        const component = mount(petitionDetail);
        const wrapper = component.find('.R_R_contents_txt');
        expect(wrapper.length).toBe(3);
        expect(wrapper.at(0).text()).toBe('COMMENT_TEST_COMMENT_1');
        expect(wrapper.at(1).text()).toBe('COMMENT_TEST_COMMENT_2');
        expect(wrapper.at(2).text()).toBe('COMMENT_TEST_COMMENT_3');
    });

    it(`should set state properly on comment input`, () => {
        const petitionComment = 'TEST_COMMENT';
        const component = mount(petitionDetail);
        const wrapper = component.find('#tw_contents').at(0);
        wrapper.simulate('change', { target: { value: petitionComment } });
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        expect(petitionCommentInstance.state.comment).toEqual(petitionComment);
    });

    it(`should call 'onClickCommentConfirmButton'`, () => {
        const spyPostPetitionComment = jest.spyOn(actionCreators, 'postPetitionComment')
            .mockImplementation(id => { return dispatch => { }; });
        const component = mount(petitionDetail);
        const wrapper = component.find('#comment_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPostPetitionComment).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickPetitionCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(petitionDetail);
        const wrapper = component.find('#petition_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us');
    });

    it(`should call 'onClickListPrevButton'`, () => {
        const component = mount(petitionDetail);
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        const wrapper = component.find('#list_prev_button').at(0);
        wrapper.simulate('click');
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([1, 2, 3, 4, 5]);
        petitionCommentInstance.setState({
            listNumber: [6, 7, 8, 9, 10]
        });
        wrapper.simulate('click');
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([1, 2, 3, 4, 5]);
    });

    it(`should call 'onClickListNumberButton'`, () => {
        const component = mount(petitionDetail);
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        petitionCommentInstance.onClickListNumberButton({ target: { value: 23 } });
        petitionCommentInstance.forceUpdate();
        expect(petitionCommentInstance.state.selectedNumber).toBe(23);
    });

    it(`should call 'onClickListNextButton'`, () => {
        const component = mount(petitionDetail);
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        const wrapper = component.find('#list_next_button').at(0);
        wrapper.simulate('click');
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([1, 2, 3, 4, 5]);
        petitionCommentInstance.setState({
            listNumber: [-11, -12, -13, -14, -15]
        });
        wrapper.simulate('click');
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([-6, -7, -8, -9, -10]);
    });
});