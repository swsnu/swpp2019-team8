import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentDetail from './DocumentDetail';
import { highlightCode } from './DocumentDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';

import hljs from 'highlight.js';

const stubInitialState = {
    selectedDocument: {
        title: 'SELECTED_DOCUMENT_TEST_TITLE',
        content: 'SELECTED_DOCUMENT_TEST_CONTENT',
    },
};

const mockStore = getMockStore(stubInitialState);

describe('<DocumentDetail />', () => {
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
    });

    it(`should render DocumentDetail`, () => {
        const component = mount(documentDetail);
        const wrapper = component.find('.DocumentDetail');
        expect(wrapper.length).toBe(1);
    });

    it(`should render SELECTED_DOCUMENT`, () => {
        const component = mount(documentDetail);
        const wrapperTitle = component.find('.title');
        const wrapperContent = component.find('.content');
        expect(wrapperTitle.at(0).text()).toBe('SELECTED_DOCUMENT_TEST_TITLE');
        // expect(wrapperContent.at(0).props().value).toBe('SELECTED_DOCUMENT_TEST_CONTENT');
    });

    it(`should not render SELECTED_DOCUMENT`, () => {
        const mockInitialStore = getMockStore({ selectedDocument: null });
        const component = mount(
            <Provider store={mockInitialStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const wrapperTitle = component.find('.title');
        const wrapperContent = component.find('.content');
        expect(wrapperTitle.at(0).text()).toBe('');
        // expect(wrapperContent.at(0).props().value).toBe('');
    });

    it(`should call 'onClickDocumentCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(documentDetail);
        const wrapper = component.find('#document_cancel_button').at(0);
        const edit = component.find('#document_edit_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me');
        edit.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(2);
    });
});

describe('highLightCode', () => {
    let spyGetLang;
    let spyHighLight;
    let spyAuto;

    beforeEach(() => {
        spyGetLang = jest.spyOn(hljs, 'getLanguage')
            .mockImplementation(id => {return true ;})
        spyHighLight = jest.spyOn(hljs, 'highlight')
            .mockImplementation(() => {})
        spyAuto = jest.spyOn(hljs, 'highlightAuto')
            .mockImplementation(() => {})
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
            .mockImplementation(id => {return false ;})
        highlightCode('1,', '1');
        expect(spyHighLight).toHaveBeenCalledTimes(0);
    })

})