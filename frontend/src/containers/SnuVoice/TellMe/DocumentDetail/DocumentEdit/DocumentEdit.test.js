import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentEdit from './DocumentEdit';
import { getMockStore } from '../../../../../test-utils/mocks';
import { history } from '../../../../../store/store';
import * as actionCreators from '../../../../../store/actions/tellme';

const stubInitialState = {
    selectedDocument: {
        title: 'SELECTED_DOCUMENT_TEST_TITLE',
        content: 'SELECTED_DOCUMENT_TEST_CONTENT',
    },

};

const mockStore = getMockStore(stubInitialState);

describe('<DocumentEdit />', () => {
    let documentEdit;

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
    });

    it(`should render DocumentEdit`, () => {
        const component = mount(documentEdit);
        const wrapper = component.find('.DocumentEdit');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on content input`, () => {
        const documentContent = 'TEST_CONTENT';
        const component = mount(documentEdit);
        const wrapper = component.find('#document_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: documentContent } });
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance();
        expect(documentEditInstance.state.documentContent).toEqual(documentContent);
    });

    it(`should call 'putDocument'`, () => {
        const spyPutDocument = jest.spyOn(actionCreators, 'putDocument')
            .mockImplementation(td => { return dispatch => { }; });
        const component = mount(documentEdit);
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance()
        documentEditInstance.setState({
            documentContent: 'TEST_CONTENT',
        });
        const wrapper = component.find('#document_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPutDocument).toHaveBeenCalledTimes(1);
    });

    it(`should call 'onClickDocumentCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'goBack')
            .mockImplementation(path => { });
        const component = mount(documentEdit);
        const wrapper = component.find('#document_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);//must to fix
    });

    it(`should call 'onClickPhotoButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push')
            .mockImplementation(path => { });
        const component = mount(documentEdit);
        const wrapper = component.find('#photo_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/tell_me/photo');
    });

    it(`should set state properly: 'write' -> 'preview'`, () => {
        const component = mount(documentEdit);
        const documentEditInstance = component.find(DocumentEdit.WrappedComponent).instance()
        documentEditInstance.setState({ documentState: 'write', });
        let wrapper = component.find('#preview_tab_button').at(0);
        wrapper.simulate('click');
        expect(documentEditInstance.state.documentState).toEqual('preview');
        wrapper = component.find('#write_tab_button').at(0);
        wrapper.simulate('click');
        expect(documentEditInstance.state.documentState).toEqual('write');
    });
})

