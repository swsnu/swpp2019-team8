import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import DocumentDetail from './DocumentDetail';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';

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

    it('should render DocumentDetail', () => {
        const component = mount(documentDetail);
        const wrapper = component.find('.DocumentDetail');
        expect(wrapper.length).toBe(1);
    });

    it('should render SELECTED_DOCUMENT - title', () => {
        const component = mount(documentDetail);
        const wrapper = component.find('.title');
        expect(wrapper.at(0).text()).toBe('SELECTED_DOCUMENT_TEST_TITLE');
    });

    it('should render SELECTED_DOCUMENT - content', () => {
        const component = mount(documentDetail);
        const wrapper = component.find('.content');
        expect(wrapper.at(0).text()).toBe('SELECTED_DOCUMENT_TEST_CONTENT');
    });
});