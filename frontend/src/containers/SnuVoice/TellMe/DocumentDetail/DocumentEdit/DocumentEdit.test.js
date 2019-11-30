import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentEdit from './DocumentEdit';
import { highlightCode } from './DocumentEdit';
import { getMockStore } from '../../../../../test-utils/mocks';
import { history } from '../../../../../store/store';
import * as actionCreators from '../../../../../store/actions/tellme';
import hljs from 'highlight.js';

const stubInitialState = {
    selectedDocument: {
        title: 'SELECTED_DOCUMENT_TEST_TITLE',
        content: 'SELECTED_DOCUMENT_TEST_CONTENT',
    },

    documentConflict: true,
};

const mockStore = getMockStore(stubInitialState);

describe('<DocumentEdit />', () => {
    let documentEdit;
    let spyOnGetDocument;
    window.alert = jest.fn();


    beforeEach(() => {
        documentEdit = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentEdit} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyOnGetDocument = jest.spyOn(actionCreators, 'getDocument')
            .mockImplementation(td => { return dispatch => { }; });
    });

    afterEach(() => jest.clearAllMocks());

    it(`should render DocumentEdit`, async () => {
        const component = await mount(documentEdit);
        expect(spyOnGetDocument).toHaveBeenCalledTimes(1);
        const wrapper = component.find('.DocumentEdit');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on content input`, () => {
        const documentContent = 'TEST_CONTENT';
        const component = mount(documentEdit);
        const wrapper = component.find('#document_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: documentContent } });
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance();
        expect(documentEditInstance.state.newDocumentContent).toEqual(documentContent);
    });

    it(`should call 'putDocument'`,  async () => {
        const spyPutDocument = jest.spyOn(actionCreators, 'putDocument')
            .mockImplementation(td => { return dispatch => { }; });
        const component = await mount(documentEdit);
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance()
        documentEditInstance.setState({
            newDocumentContent: 'TEST_CONTENT',
        });
        const wrapper = component.find('#document_confirm_button').at(0);
        await wrapper.simulate('click');

        expect(spyPutDocument).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickDocumentCancelButton'`, async () => {
        const spyHistoryPush = jest.spyOn(history, 'goBack')
            .mockImplementation(path => { });
        const component = await mount(documentEdit);
        const wrapper = component.find('#document_cancel_button').at(0);
        await wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);//must to fix
    });

    it(`should call 'onClickPhotoButton'`, async () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = await mount(documentEdit);
        const wrapper = component.find('#photo_button').at(0);
        await wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/photo');
    });

    it(`should set state properly: 'write' -> 'preview'`, async () => {
        const component = await mount(documentEdit);
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance()
        documentEditInstance.setState({ documentState: 'write', });
        let wrapper = component.find('#preview_tab_button').at(0);
        await wrapper.simulate('click');
        expect(documentEditInstance.state.documentState).toEqual('preview');
        wrapper = component.find('#write_tab_button').at(0);
        await wrapper.simulate('click');
        expect(documentEditInstance.state.documentState).toEqual('write');
    });

})

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
