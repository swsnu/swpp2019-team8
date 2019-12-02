import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import hljs from 'highlight.js';

import PhotoDetail from './PhotoDetail';
import { highlightCode } from './PhotoDetail';
import { history } from '../../../../store/store';
import { getMockStore } from '../../../../test-utils/mocks';

import * as actionCreator from '../../../../store/actions/tellme';

const stubInitialState = {
    selectedPhoto: {
        photo: '123',
        title: 'SELECTED_DOCUMENT_TEST_TITLE',
        content: 'SELECTED_DOCUMENT_TEST_CONTENT',
    }

};

const mockStore = getMockStore(stubInitialState);

describe('<PhotoDetail />', () => {
    let photoDetail;
    let spyGetPhoto;

    beforeEach(() => {
        photoDetail = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PhotoDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetPhoto = jest.spyOn(actionCreator, 'getPhoto')
            .mockImplementation(td => { return dispatch => { }; });
    })

    afterEach(() => jest.clearAllMocks());

    it('should render without errors', async () => {
        const historyMock = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
        const component = await mount(photoDetail);
        const photoInstance = component.find(PhotoDetail.WrappedComponent).instance();
        expect(spyGetPhoto).toHaveBeenCalledTimes(1);
        const top = component.find('.TopOfPage').at(0);
        expect(top.length).toBe(1);
        photoInstance.onClickPhotoCancelButton();
        expect(historyMock).toHaveBeenCalledWith('/tell_me');

    })

    it('shoudl done well int null', async () => {
        let stubsInitialState = {
            selectedPhoto: null
        };
        let remockStore = getMockStore(stubsInitialState);
        photoDetail = (
            <Provider store={remockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PhotoDetail} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const historyMock = jest.spyOn(history, 'push')
            .mockImplementation(() => { })
        const component = await mount(photoDetail);
        expect(historyMock).toHaveBeenCalledTimes(1)


    })


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
