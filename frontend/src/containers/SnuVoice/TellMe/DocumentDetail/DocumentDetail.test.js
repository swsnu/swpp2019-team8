import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentDetail from './DocumentDetail';
import { highlightCode } from './DocumentDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';

import * as actionCreator from '../../../../store/actions/tellme';
import * as actionCreators from '../../../../store/actions/hearus';


import hljs from 'highlight.js';
import PetitionDetail from '../../HearUs/PetitionDetail/PetitionDetail';

const stubInitialState = {
    selectedDocument: {
        title: 'SELECTED_DOCUMENT_TEST_TITLE',
        content: 'SELECTED_DOCUMENT_TEST_CONTENT',
    },
    petition_list_by_document: [{
        id: 1,
        url : 1
    }]
};

const mockStore = getMockStore(stubInitialState);

describe('<DocumentDetail />', () => {
    let spyOnGetDocument;
    let spyOnGetPetitionList;
    let spyHistoryPush;

    let documentDetail;
    beforeEach(() => {
        documentDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnGetDocument = jest.spyOn(actionCreator, 'getDocument')
            .mockImplementation(() => {return dispatch => { };});
        spyOnGetPetitionList = jest.spyOn(actionCreators, 'getPetitionByDocument')
            .mockImplementation(() => {return dispatch => { };});
        spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
    });

    afterEach(() => jest.clearAllMocks())

    it(`should render DocumentDetail`, async () => {
        const component = await mount(documentDetail);
        const wrapper = component.find('.DocumentDetail');
        expect(wrapper.length).toBe(1);
        expect(spyOnGetPetitionList).toHaveBeenCalledTimes(1);
        expect(spyOnGetDocument).toHaveBeenCalledTimes(1);
    });

    it(`should render SELECTED_DOCUMENT`, async () => {
        const component = await mount(documentDetail);
        const wrapperTitle = component.find('.document_detail_title');
        const wrapperContent = component.find('.content');
        expect(wrapperTitle.at(0).text()).toBe('SELECTED_DOCUMENT_TEST_TITLE');
        // expect(wrapperContent.at(0).props().value).toBe('SELECTED_DOCUMENT_TEST_CONTENT');
    });

    it(`should not render SELECTED_DOCUMENT`, async () => {
        const mockInitialStore = getMockStore({
            selectedDocument: null,
            petition_list_by_document: []
        });
        const component = await mount(
            <Provider store={mockInitialStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const wrapperTitle = component.find('.document_detail_title');
        const wrapperContent = component.find('.content');
        expect(wrapperTitle.at(0).text()).toBe('');
        // expect(wrapperContent.at(0).props().value).toBe('');
    });

    it(`should call 'onClickDocumentCancelButton'`, async () => {
        const component = await mount(documentDetail);
        const wrapper = component.find('#document_cancel_button').at(0);
        const edit = component.find('#document_edit_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me');
        edit.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
    });

    it(`should call 'prev, next buttons work'`, async () => {
        const component = await mount(documentDetail);
        const prev = component.find('#prev_button').at(0);
        const next = component.find('#next_button').at(0);
        const instance = component.find(DocumentDetail.WrappedComponent).instance();
        instance.setState({
            selectedNumber: -1
        });
        next.simulate('click');
        expect(instance.state.selectedNumber).toBe(0);
        prev.simulate('click');
        expect(instance.state.selectedNumber).toBe(-1);        
    });

    it('should onClickDocumentDebateButton works', async () => {
        const component = await mount(documentDetail);
        const instance = component.find(DocumentDetail.WrappedComponent).instance();
        instance.onClickDocumentDebateButton();
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    })
});

describe('highLightCode', () => {
    let spyGetLang;
    let spyHighLight;
    let spyAuto;

    beforeEach(() => {
        spyGetLang = jest.spyOn(hljs, 'getLanguage')
            .mockImplementation(id => { return true; })
        spyHighLight = jest.spyOn(hljs, 'highlight')
            .mockImplementation(() => { })
        spyAuto = jest.spyOn(hljs, 'highlightAuto')
            .mockImplementation(() => { })
    })

    afterEach(() => jest.clearAllMocks())

    it('shoudl work', () => {
        highlightCode('1,', '1');
        expect(spyGetLang).toHaveBeenCalledTimes(1);
        expect(spyHighLight).toHaveBeenCalledTimes(1);
        expect(spyAuto).toHaveBeenCalledTimes(1);
    })

    it('should work at error', () => {
        spyGetLang = jest.spyOn(hljs, 'getLanguage')
            .mockImplementation(id => { return false; })
        highlightCode('1,', '1');
        expect(spyHighLight).toHaveBeenCalledTimes(0);
    })

})