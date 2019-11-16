import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PhotoUpload from './PhotoUpload';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';
import * as actionCreators from '../../../../store/actions/tellme';

const stubInitialState = {
};


const mockStore = getMockStore(stubInitialState);

describe('<PhotoUpload />', () => {
    let photoUpload;

    beforeEach(() => {
        photoUpload = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PhotoUpload} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it(`should render PhotoUpload`, () => {
        const component = mount(photoUpload);
        const wrapper = component.find('.PhotoUpload');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on title input`, () => {
        const photoTitle = 'TEST_TITLE';
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_title_input').at(0);
        wrapper.simulate('change', { target: { value: photoTitle } });
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        expect(photoUploadInstance.state.photoTitle).toEqual(photoTitle);
        expect(photoUploadInstance.state.photoContent).toEqual('');
    });

    it(`should set state properly on title input`, () => {
        const photoContent = 'TEST_TITLE';
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: photoContent } });
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        expect(photoUploadInstance.state.photoTitle).toEqual('');
        expect(photoUploadInstance.state.photoContent).toEqual(photoContent);
    });
    
    it(`should set state properly on file input/ upload`, (done) => {
        const spyPostphoto = jest.spyOn(axios,'post')
        .mockImplementation((url, tm) => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 201,
                    data: stubFormdata,
                };
                resolve(result);
            });
        })
        const photoFile = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'});
        const component = mount(photoUpload);
        let wrapper = component.find('#photo_file_file').at(0);
        wrapper.simulate('change', { target: { files: [photoFile] } });
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        expect(photoUploadInstance.state.photoFile).toEqual(null);
        expect(photoUploadInstance.state.photoUrl).toEqual(null);
        photoUploadInstance.setState({photoFile: photoFile, photoTitle: 'title', photoContent: 'content'});
        const stubFormdata = new FormData();
        stubFormdata.append('file', photoFile , photoFile.name);
        stubFormdata.append('title', 'title');
        stubFormdata.append('content', 'content');
        wrapper = component.find('#document_confirm_button').at(0);
        wrapper.simulate('click');
        expect(spyPostphoto).toHaveBeenCalledTimes(1);
        done();
    });
    
    it(`should call 'onClickPhotoCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'goBack')
            .mockImplementation(path => { });
        const component = mount(photoUpload);
        const wrapper = component.find('#document_cancel_button').at(0);
        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledTimes(1);
    });

    it(`should set state properly: 'write' -> 'preview'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance()
        photoUploadInstance.setState({ documentState: 'write', });
        const wrapper = component.find('#preview_content_tab_button').at(0);
        wrapper.simulate('click');
        expect(photoUploadInstance.state.documentState).toEqual('preview');
    });

    it(`should set state properly: 'preview' -> 'write'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance()
        photoUploadInstance.setState({ documentState: 'preview', });
        const wrapper = component.find('#edit_content_tab_button').at(0);
        wrapper.simulate('click');
        expect(photoUploadInstance.state.documentState).toEqual('write');
    });

    it(`should set state properly: 'photo' -> 'preview'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance()
        photoUploadInstance.setState({ phototState: 'photo', });
        const wrapper = component.find('#preview_photo_tab_button').at(0);
        wrapper.simulate('click');
        expect(photoUploadInstance.state.photoState).toEqual('preview');
    });

    it(`should set state properly: 'preview' -> 'write'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance()
        photoUploadInstance.setState({ photoState: 'preview', });
        const wrapper = component.find('#edit_photo_tab_button').at(0);
        wrapper.simulate('click');
        expect(photoUploadInstance.state.photoState).toEqual('photo');
    });

});