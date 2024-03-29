import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import PhotoUpload from './PhotoUpload';
import { getMockStore } from '../../../../test-utils/mocks';
import { history } from '../../../../store/store';

import * as actionCreator from '../../../../store/actions/tellme';

const stubInitialState = {
    photoDuplicate : false,
    signIn : false
};

const mockStore = getMockStore(stubInitialState);

describe('<PhotoUpload />', () => {
    let photoUpload;
    let spyCheckPhoto;
    window.alert = jest.fn();

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
        spyCheckPhoto = jest.spyOn(actionCreator, 'checkPhotoDuplicate')
            .mockImplementation(() => { return dispatch => { };} )
    });

    afterEach(() => {jest.clearAllMocks()})

    it(`should render PhotoUpload`, () => {
        const component = mount(photoUpload);
        const wrapper = component.find('.PhotoUpload');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on title input`, async () => {
        const photoTitle = 'TEST_TITLE';
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_title_input').at(0);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        await wrapper.simulate('change', { target: { value: photoTitle } });
        expect(photoUploadInstance.state.photoTitle).toEqual(photoTitle);
        await wrapper.simulate('change', { target: { value: "###" } });
        expect(photoUploadInstance.state.titleFormText).toEqual( "# ? % / \\ is not allowed.");
        await wrapper.simulate('change', { target: { value: "asd.jpg" } });
        expect(photoUploadInstance.state.titleFormText).toEqual("");
        expect(spyCheckPhoto).toHaveBeenCalledTimes(1);
    });

    it(`should set state properly on title input`, async () => {
        let inState = {
            photoDuplicate : true,
            signIn : false
        };
        let mocking = getMockStore(inState);
        photoUpload = (
            <Provider store={mocking}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={PhotoUpload} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        const photoTitle = 'TEST_TITLE';
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_title_input').at(0);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        await wrapper.simulate('change', { target: { value: "asd.jpg" } });
        expect(photoUploadInstance.state.titleFormText).toEqual("The photo already exists.");
        expect(spyCheckPhoto).toHaveBeenCalledTimes(1);
    });

    it(`should set state properly on content input`, () => {
        const photoContent = 'TEST_CONTENT';
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_content_textarea').at(0);
        wrapper.simulate('change', { target: { value: photoContent } });
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        expect(photoUploadInstance.state.photoContent).toEqual(photoContent);
    });

    it(`should call 'onClickPhotoCancelButton'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'goBack')
            .mockImplementation(path => { });
        const component = mount(photoUpload);
        const wrapper = component.find('#photo_cancel_button').at(0);
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

    it(`should set state properly on file input/ upload`, (done) => {
        let mocked = jest.fn();
        const spyPostPhoto = jest.spyOn(axios, 'post')
            .mockImplementation((url, tm) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 201,
                        data: stubFormdata,
                    };
                    resolve(result);
                });
            });
        const photoFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
        const component = mount(photoUpload);
        let wrapper = component.find('#photo_file_file').at(0);
        wrapper.simulate('change', { target: { files: [photoFile] } });
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        photoUploadInstance.onClickPhotoConfirmButton = mocked;
        expect(photoUploadInstance.state.photoFile).toEqual(null);
        expect(photoUploadInstance.state.photoUrl).toEqual(null);
        photoUploadInstance.setState({
            photoFile: photoFile,
            photoFileName: 'name',
            photoTitle: 'title',
            photoContent: 'content',
            canvasWidth: 100,
            canvasHeight: 100
        });
        const stubFormdata = new FormData();
        stubFormdata.append('file', photoFile, 'name');
        stubFormdata.append('title', 'title');
        stubFormdata.append('content', 'content');
        wrapper = component.find('#photo_confirm_button').at(0);
        wrapper.simulate('click');
        expect(mocked).toHaveBeenCalledTimes(1);
        done();
    });

    it(`should call 'onImgLoad'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        photoUploadInstance.onImgLoad({ target: { offsetWidth: 500, offsetHeight: 500 } });
        expect(photoUploadInstance.state.canvasWidth).toEqual(500);
        expect(photoUploadInstance.state.canvasHeight).toEqual(500);
    });

    it(`should call 'reader.onloadend'`, () => {
        let mocked = jest.fn()
        let blob = new Blob([""], { type: 'image/png' });
        blob["lastModifiedDate"] = "";
        blob["name"] = "TEST_FILE_NAME";
        const mockReader = {
            onloadend: mocked,
            readyState: 2,
            readAsDataURL: mocked,
            result: "TEST_RESULT,TEST_RESULT"
        }
        mockReader.readAsDataURL = jest.fn(() => {
            return mockReader.onloadend()
        });
        window.FileReader = jest.fn(() => {
            return mockReader
        });
        const photoFile = blob;
        const component = mount(photoUpload);
        let wrapper = component.find('#photo_file_file').at(0);
        wrapper.simulate('change', { target: { files: [photoFile] } });
    });

    it(`file size is bigger than 5MB`, () => {
        function range(count) {
            let output = "";
            for (let i = 0; i < count; i++) {
                output += "a";
            }
            return output;
        }

        let mocked = jest.fn()
        let blob = new Blob([range(6000000)], { type: 'image/png' });
        blob["lastModifiedDate"] = "";
        blob["name"] = "TEST_FILE_NAME";
        const mockReader = {
            onloadend: mocked,
            readyState: 2,
            readAsDataURL: mocked,
            result: "TEST_RESULT,TEST_RESULT"
        }
        mockReader.readAsDataURL = jest.fn(() => {
            return mockReader.onloadend()
        });
        window.FileReader = jest.fn(() => {
            return mockReader
        });
        const photoFile = blob;
        const component = mount(photoUpload);
        let wrapper = component.find('#photo_file_file').at(0);
        wrapper.simulate('change', { target: { files: [photoFile] } });
    });

    it(`should call 'fileUpload'`, async () => {
        const content = 'TEST_CONTENT';
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        try {
            await photoUploadInstance.fileUpload(content);
        } catch (e) {
            expect(true).toBe(true);
        }
    });

    it(`should call 'getPhotoInfo': The face is not recognized`, () => {
        const data = {
            responses: [{}]
        }
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        photoUploadInstance.getPhotoInfo(data);
    });

    it(`should call 'getPhotoInfo': The face is recognized`, () => {
        const data = {
            responses: [{
                faceAnnotations: [{
                    fdBoundingPoly: {
                        vertices: [{

                        }]
                    }
                }]
            }]
        }
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        photoUploadInstance.getPhotoInfo(data);
    });

    it(`if 'this.state.photoUrl && this.state.uploadEnd'`, () => {
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance()
        photoUploadInstance.setState({
            photoUrl: "TEST_PHOTO_URL",
            uploadEnd: true
        });
    });

    it(`should call 'drawInCanvas'`, async () => {
        let mocked = jest.fn();
        let mockRefCanvas = {
            current: {
                getContext: '',
                addEventListener: '',
            }
        }
        let _getContext = {
            clearRect: mocked,
            drawImage: mocked
        }
        mockRefCanvas.current.getContext = jest.fn(() => {
            return _getContext;
        });
        let event = {}
        mockRefCanvas.current.addEventListener = jest.fn(event => {
            return null;
        })
        React.createRef = jest.fn(() => {
            return mockRefCanvas;
        });
        const photoInfo = "TEST_PHOTO_INFO";
        const n = 0;
        const copiedImg = "TEST_COPIED_IMG";
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        await photoUploadInstance.drawInCanvas(photoInfo, n, copiedImg);
    });

    it(`should call 'onClickPhotoConfirmButton'`, () => {
        let mocked = jest.fn();
        let mockRefCanvas = {
            current: {
                getContext: '',
                addEventListener: '',
                toBlob: '',
            }
        }
        let _getContext = {
            clearRect: mocked,
            drawImage: mocked
        }
        mockRefCanvas.current.getContext = jest.fn(() => {
            return _getContext;
        });
        mockRefCanvas.current.addEventListener = jest.fn(() => {
            return null;
        });
        mockRefCanvas.current.toBlob = jest.fn(() => {
            return null;
        });
        React.createRef = jest.fn(() => {
            return mockRefCanvas;
        });
        const component = mount(photoUpload);
        const photoUploadInstance = component.find(PhotoUpload.WrappedComponent).instance();
        photoUploadInstance.setState({
            blurElements: [{
                blur: true
            }]
        });
        photoUploadInstance.onClickPhotoConfirmButton();
        photoUploadInstance.setState({
            blurElements: [{
                blur: false
            }]
        });
        photoUploadInstance.onClickPhotoConfirmButton();
    });
});