import axios from 'axios';

import * as actionCreators from './hearus';
import store from '../store';

const stubPetition = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
}

const stubComment = {
    id: 0,
    comment: 'comment 1',
}

describe('ActionCreators', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`'postPetition' should post petition correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, hu) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetition,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.postPetition()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getAllPetitions' should fetch petitions correctly`, (done) => {
        const stubPetitionList = [stubPetition];

        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetitionList,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getAllPetitions()).then(() => {
            const newState = store.getState();
            expect(newState.hu.petition_list).toBe(stubPetitionList);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getPetition' should fetch petition correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetition,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getPetition()).then(() => {
            const newState = store.getState();
            expect(newState.hu.selectedPetition).toBe(stubPetition);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getPetitionByTitle' should fetch petition correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetition,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getPetitionByTitle()).then(() => {
            const newState = store.getState();
            expect(newState.hu.selectedPetition).toBe(stubPetition);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'getPetitionComments' should fetch petition comments correctly`, (done) => {
        const stubPetitionCommentList = [stubComment];

        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubPetitionCommentList,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.getPetitionComments()).then(() => {
            const newState = store.getState();
            expect(newState.hu.comment_list).toBe(stubPetitionCommentList);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'postPetitionComment' should post petition comment correctly`, (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url, hu) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubComment,
                    }
                    resolve(result);
                });
            });
        store.dispatch(actionCreators.postPetitionComment(stubComment)).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it(`'putPetitionVote' should increase number of votes correctly`, (done) => {
        const spy = jest.spyOn(axios, 'put')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: null,
                    }
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.putPetitionVote()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('getCsvFile works well', (done) => {
        window.URL.createObjectURL = jest.fn();
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data : 123
                    }
                    resolve(result);
                })
            })
        
        store.dispatch(actionCreators.getCsvFile('1'))
            .then(() => {
                expect(spy).toHaveBeenCalledTimes(1)
                done();
            });
    })

    it('getCsvFile works well in error', async () => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    reject();
                })
            });

        await store.dispatch(actionCreators.getCsvFile('1'));

        expect(spy).toHaveBeenCalledTimes(1);

    })

    it(`'getDrawGraph' should draw graph correctly`, (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: null,
                    }
                    resolve(result);
                });
            })
        store.dispatch(actionCreators.getDrawGraph()).then(() => {
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
    });

});