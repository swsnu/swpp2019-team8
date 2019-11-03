import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentCreate from './DocumentCreate';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/tellme';

const stubInitialState = {
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

    it(`should render DocumentCreate`, () => {
        const component = mount(documentCreate);
        const wrapper = component.find('.DocumentCreate');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on title input`, () => {
        const documentTitle = 'TEST_TITLE';
        const component = mount(documentCreate);
        const wrapper = component.find('#document_title_input').at(0);
        wrapper.simulate('change', { target: { value: documentTitle } });
        const documentCreateInstance = component.find(DocumentCreate.WrappedComponent).instance();
        expect(documentCreateInstance.state.documentTitle).toEqual(documentTitle);
        expect(documentCreateInstance.state.documentContent).toEqual('');
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
        documentCreateInstance.setState({ documentState: 'write', });
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