import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentCreate from './DocumentCreate';
import { highlightCode } from './DocumentCreate';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/tellme';
import hljs from 'highlight.js';

const stubInitialState = {
    documentDuplicate: true
};

const mockStore = getMockStore(stubInitialState);

describe('<DocumentCreate />', () => {
    let documentCreate;

    beforeEach(() => {
        documentCreate = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentCreate} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    afterEach(() => jest.clearAllMocks());

    it(`should render DocumentCreate`, () => {
        const component = mount(documentCreate);
        const wrapper = component.find('.DocumentCreate');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on title input`, () => {
        const documentTitle = 'TEST#TITLE';
        const component = mount(documentCreate);
        const wrapper = component.find('#document_title_input').at(0);
        wrapper.simulate('change', { target: { value: documentTitle } });
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance();
        expect(documentCreateInstance.state.formFeedbackMessage.title).toEqual("# ? % 는 허용되지 않습니다.");
        expect(documentCreateInstance.state.documentContent).toEqual('');
        wrapper.simulate('change', { target: { value: "1" } });
        expect(documentCreateInstance.state.documentTitle).toBe('1')
    });

    it(`should set state properly on content input`, () => {
        const documentContent = 'TEST_CONTENT';
        const component = mount(documentCreate);
        const wrapper = component.find('#document_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: documentContent } });
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance();
        expect(documentCreateInstance.state.documentTitle).toEqual('');
        expect(documentCreateInstance.state.documentContent).toEqual(documentContent);
    });

    it(`should call 'postDocument'`, () => {
        const spyPostDocument = jest.spyOn(actionCreators, 'postDocument')
            .mockImplementation(td => { return dispatch => { }; });
        const component = mount(documentCreate);
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance()
        documentCreateInstance.setState({
            documentTitle: 'TEST_TITLE',
            documentContent: 'TEST_CONTENT',
        });
        const wrapper = component.find('#document_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPostDocument).toHaveBeenCalledTimes(1);
    });

    it(`should call 'postDocument'`, () => {
        const spyPostDocument = jest.spyOn(actionCreators, 'postDocument')
            .mockImplementation(td => { return dispatch => { }; });
        let mockIn = {
            documentDuplicate: false
        }
        let mockStores = getMockStore(mockIn);
        documentCreate = (
            <Provider store={mockStores}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={DocumentCreate} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const component = mount(documentCreate);
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance()
        documentCreateInstance.setState({
            documentTitle: 'TEST_TITLE     ',
            documentContent: 'TEST_CONTENT',
        });
        const wrapper = component.find('#document_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPostDocument).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickDocumentCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(documentCreate);
        const wrapper = component.find('#document_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me');
    });

    it(`should call 'onClickPhotoButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(documentCreate);
        const wrapper = component.find('#photo_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/photo');
    });

    it(`should set state properly: 'write' -> 'preview'`, () => {
        const component = mount(documentCreate);
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance()
        documentCreateInstance.setState({
            documentState: 'write',
        });
        const wrapper = component.find('#preview_tab_button').at(0);
        wrapper.simulate('click');
        expect(documentCreateInstance.state.documentState).toEqual('preview');

    });

    it(`should set state properly: 'preview' -> 'write'`, () => {
        const component = mount(documentCreate);
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance()
        documentCreateInstance.setState({ documentState: 'preview', });
        const wrapper = component.find('#write_tab_button').at(0);
        wrapper.simulate('click');
        expect(documentCreateInstance.state.documentState).toEqual('write');
    });

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