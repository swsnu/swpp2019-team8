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
    selectedUser: {
        id: '1',
    },
    selectedPetition: {
        title: 'SELECTED_PETITION_TEST_TITLE',
        content: 'SELECTED_PETITION_TEST_CONTENT',
        votes: 'SELECTED_PETITION_TEST_VOTES',
        category: 'SELECTED_PETITION_TEST_CATEGORY',
        start_date: '0000-00-00T00:00:00.000',
        end_date: '0000-00-00T00:00:00.000',
        author: 1,
        link: 'SELECTED_PETITION_TEST_LINK',
        url: 1,
    },
    comment_list: [
        { id: 1, comment: 'COMMENT_TEST_COMMENT_1', date: '1' },
        { id: 2, comment: 'COMMENT_TEST_COMMENT_2', date: '2' },
        { id: 3, comment: 'COMMENT_TEST_COMMENT_3', date: '3' },
    ],
    signIn: true
}

const mockStore = getMockStore(stubInitialState);

describe('<PetitionDetail />', () => {
    let petitionDetail;
    let spyPostPetitionComment;
    let spyGetPetitionComment;
    let spyGetPetition;
    let spyPutPetitionVote;
    let spyLocation;

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
        spyPostPetitionComment = jest.spyOn(actionCreators, 'postPetitionComment')
            .mockImplementation(id => { return dispatch => { }; });
        spyGetPetitionComment = jest.spyOn(actionCreators, 'getPetitionComments')
            .mockImplementation(id => { return dispatch => { }; });
        spyGetPetition = jest.spyOn(actionCreators, 'getPetition')
            .mockImplementation(id => { return dispatch => { }; });
        spyPutPetitionVote = jest.spyOn(actionCreators, 'putPetitionVote')
            .mockImplementation(id => { return dispatch => { }; });
        spyLocation = jest.spyOn(window.location, 'reload')
            .mockImplementation(() => {});
    });

    afterEach(() => jest.clearAllMocks())

    it('mocks reload function', async () => {
        expect(jest.isMockFunction(window.location.reload)).toBe(true);
    });

    it(`should render PetitionDetail`, async () => {
        const component = await mount(petitionDetail);
        const wrapper = component.find('.PetitionDetail');
        expect(wrapper.length).toBe(1);
    });

    it(`should render SELECTED_PETITION`, async () => {
        const component = await mount(petitionDetail);
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

    it(`should not render SELECTED_PETITION`, async () => {
        const mockInitialStore = getMockStore({ selectedPetition: null, comment_list: null });
        const component = await mount(
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

    it('should branch work well', async () => {
        const mockInitialStore = getMockStore({
            selectedPetition: null,
            comment_list: [{
                id: 1,
                date: parseInt('12312'),
                time: parseInt('123')
            }]
        });
        const component = await mount(
            <Provider store={mockInitialStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PetitionDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        expect(true).toBe(true);
    })

    it(`should render STORED_PETITION_COMMENTS`, async () => {
        const component = await mount(petitionDetail);
        const wrapper = component.find('.R_R_contents_txt');
        expect(wrapper.length).toBe(3);
        expect(wrapper.at(0).text()).toBe('COMMENT_TEST_COMMENT_1');
        expect(wrapper.at(1).text()).toBe('COMMENT_TEST_COMMENT_2');
        expect(wrapper.at(2).text()).toBe('COMMENT_TEST_COMMENT_3');
    });

    it(`should set state properly on comment input`, async () => {
        const petitionComment = 'TEST_COMMENT';
        const component = await mount(petitionDetail);
        const wrapper = component.find('#tw_contents').at(0);
        wrapper.simulate('change', { target: { value: petitionComment } });
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        expect(petitionCommentInstance.state.comment).toEqual(petitionComment);
    });

    it(`should call 'onClickCommentConfirmButton'`, async () => {
        const component = await mount(petitionDetail);
        const wrapper = component.find('#comment_confirm_button').at(0);
        await wrapper.simulate('click');
        expect(spyPostPetitionComment).toHaveBeenCalledTimes(1);
        expect(spyPutPetitionVote).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickDrawGraphButton'`, async () => {
        
        spyGetDrawGraph = jest.spyOn(actionCreators, 'getDrawGraph')
            .mockImplementation(id => { return dispatch => { };});
        const component = await mount(petitionDetail);
        const wrapper = component.find('#more-statistics-button').at(0);
        await wrapper.simulate('click');
        expect(spyGetDrawGraph).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickPetitionCancelButton'`, async () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = await mount(petitionDetail);
        const wrapper = component.find('#petition_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/hear_us');
    });


    it ('should onClickDownload csvbutton works', () => {
        const spyGetCsvFile = jest.spyOn(actionCreators, 'getCsvFile')
            .mockImplementation(petition_id => { return dispatch => { };});
        const comment = mount(petitionDetail);
        const wrapper = comment.find(PetitionDetail.WrappedComponent).instance();
        wrapper.onClickDownloadCsvButton();
        expect(spyGetCsvFile).toHaveBeenCalledTimes(1);
    })
  
    it(`should call 'onClickListPrevButton'`, async () => {
        const component = await mount(petitionDetail);
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

    it(`should call 'onClickListNumberButton'`, async () => {
        const component = await mount(petitionDetail);
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        petitionCommentInstance.onClickListNumberButton({ target: { value: 23 } });
        petitionCommentInstance.forceUpdate();
        expect(petitionCommentInstance.state.selectedNumber).toBe(23);
    });

    it(`should call 'onClickListNextButton'`, async () => {
        const component = await mount(petitionDetail);
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

    it('shoud componentDidMount works', async () => {
        const component = await mount(petitionDetail);
        expect(spyGetPetitionComment).toHaveBeenCalledTimes(1);
        expect(spyGetPetition).toHaveBeenCalledTimes(1);

    })

    it('shoud branches work', async () => {
        const component = await mount(petitionDetail);
        const petitionCommentInstance = component.find(PetitionDetail.WrappedComponent).instance();
        petitionCommentInstance.setState({
            listNumber : [-5]
        })
        petitionCommentInstance.onClickListPrevButton();
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([-5]);
        petitionCommentInstance.setState({
            listNumber : [100]
        })
        petitionCommentInstance.onClickListNextButton();
        expect(petitionCommentInstance.state.listNumber).toStrictEqual([100]);
        

    })
});