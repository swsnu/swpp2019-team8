import axios from 'axios';

import * as actionCreators from './tellme';
import store from '../store';

const stubDocument = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
    documentDuplicate : false
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

    it(`'postDocument' should post document correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, tm) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: {
                            documentDuplicate : true
                        },
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
                        data: {
                            unique: false,
                            selectedDocument: stubDocument,
                            titleDocuments: [1],
                            contentDocuments: [1],
                        },
                    };
                    resolve(result);
                });
            });

        store.dispatch(actionCreators.getDocument()).then(() => {
            const newState = store.getState();
            expect(newState.tm.selectedDocument).toBe(null);
            expect(newState.tm.titleDocuments).toStrictEqual([1]);
            expect(newState.tm.contentDocuments).toStrictEqual([1]);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getDocument' should work well`, async (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject();
                });
            });

        await store.dispatch(actionCreators.getDocument())

        const newState = store.getState();
        expect(newState.tm.selectedDocument).toBe(null);
        done()
    });

    it('postDebateComment works', (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: 1
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.postDebateComment(1, 2)).then(() => {
            const newState = store.getState();
            expect(newState.tm.debates).toStrictEqual([]);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    })

    it('getDebateComment works', (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: 1
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.getDebateComments(1, 2)).then(() => {
            const newState = store.getState();
            expect(newState.tm.debateComments).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    })


    it('getDebate works', (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: 1
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.getDebate("!", "@")).then(() => {
            const newState = store.getState();
            expect(newState.tm.selectedDebate).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('postDebate works', (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: {
                            id: 1
                        }
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.postDebate({ title: "!" }, 1)).then(() => {
            const newState = store.getState();
            expect(newState.tm.debateComments).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getDebates works', (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: 1
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.getDebates("!")).then(() => {
            const newState = store.getState();
            expect(newState.tm.debates).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getPhoto works', (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: 1
                    };
                    resolve(result);
                })
            })

        store.dispatch(actionCreators.getPhoto(1)).then(() => {
            const newState = store.getState();
            expect(newState.tm.selectedPhoto).toBe(1);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    })

    it('should errors work', async () => {
        const spyGet = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject();
                })
            })

        const spyPost = jest.spyOn(axios, 'post')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject();
                })
            })

        const spyPut = jest.spyOn(axios, 'put')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject();
                })
            })

        await store.dispatch(actionCreators.postDocument());
        expect(spyPost).toHaveBeenCalledTimes(1);
        
        await store.dispatch(actionCreators.putDocument({target : "1"}));
        expect(spyPut).toHaveBeenCalledTimes(1);

        await store.dispatch(actionCreators.getDebates("1"));
        expect(spyGet).toHaveBeenCalledTimes(1);

        await store.dispatch(actionCreators.postDebate({title : "1"}, 1));
        expect(spyPost).toHaveBeenCalledTimes(2);

        await store.dispatch(actionCreators.getDebate("1", "2"));
        expect(spyGet).toHaveBeenCalledTimes(2);

        await store.dispatch(actionCreators.getDebateComments("2"));
        expect(spyGet).toHaveBeenCalledTimes(3);

        await store.dispatch(actionCreators.postDebateComment("!", "2"));
        expect(spyPost).toHaveBeenCalledTimes(3);

        await store.dispatch(actionCreators.getPhoto(1));
        expect(spyGet).toHaveBeenCalledTimes(4);


    })
});