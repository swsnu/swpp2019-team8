import axios from 'axios';

import * as actionCreators from './tellme';
import store from '../store';

const stubDocument = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
};

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`'postDocument' should post document correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, tm) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubDocument,
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.postDocument(stubDocument)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'putDocument' should post document correctly`, (done) => {
        const spy = jest.spyOn(axios, 'put')
            .mockImplementation((url, tm) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 201,
                        data: stubDocument,
                    };
                    resolve(result);
                });
            })

        store.dispatch(actionCreators.putDocument(stubDocument)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getDocument' should fetch document correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubDocument,
                    };
                    resolve(result);
                });
            });

        store.dispatch(actionCreators.getDocument()).then(() => {
            const newState = store.getState();
            expect(newState.tm.selectedDocument).toBe(stubDocument);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getDocument' should work well`, async (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject()
                });
            });

        await store.dispatch(actionCreators.getDocument())

        const newState = store.getState();
        expect(newState.tm.selectedDocument).toBe(null);
        done()
    });
});