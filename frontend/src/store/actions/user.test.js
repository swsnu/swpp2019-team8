import axios from 'axios'
import * as actionCreators from './user'
import store from '../store'

describe('Axios User test', () => {
    const stubUser = {
        selectedUser: {
            id: '1',
            email: 'dkwanm1@naver.com',
            password: '123',
            nickname: '123',
            studentId: '12'
        },
        verifyCode: '1',
        signIn : true
    }
    const blank = {
        selectedUser: '',
        verifyCode: '',
        signIn : false
    }

    let spyGetUser;
    beforeEach(() => {
        spyGetUser = jest.spyOn(axios, 'get')
            .mockImplementation(url => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubUser
                    };
                    resolve(result);
                });
            })
    })
    afterEach(() => { jest.clearAllMocks() })

    it('signUp should done correctly', (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: ''
                    }
                    resolve(result);
                })
            })
        store.dispatch(actionCreators.postSignUp(stubUser)).then(() => {
            const newState = store.getState();
            expect(newState.usr).toStrictEqual(blank);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        })
    })

    it('signIn should done correctly', (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 201,
                        data: stubUser
                    }
                    resolve(result);
                })
            })
        store.dispatch(actionCreators.postSignIn(stubUser)).then(() => {
            const newState = store.getState();
            expect(newState.usr.selectedUser).toStrictEqual(stubUser.selectedUser);
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        })
    })

    it('signIn with noneUser should done correctly', (done) => {
        const spy = jest.spyOn(axios, 'post')
            .mockImplementation((url) => {
                return new Promise((resolve, reject) => {
                    resolve(reject);
                })
            })
        const alert = jest.spyOn(window, 'alert').mockImplementation(() => {})
        store.dispatch(actionCreators.postSignIn(stubUser)).then(() => {
            const newState = store.getState();
            expect(newState.usr.selectedUser).toStrictEqual('');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(alert).toHaveBeenCalledTimes(1);
            done();
        })
    })

    it('signOut should done correctly', (done) => {
        const spy = jest.spyOn(axios, 'get')
            .mockImplementation((url) => {
                return new Promise((resolve, reject) => {
                    const result = {
                        status: 200,
                        data: stubUser
                    }
                    resolve(result);
                })
            })
        store.dispatch(actionCreators.getSignOut()).then(() => {
            const newState = store.getState();
            expect(newState.usr.selectedUser).toStrictEqual('');
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        })
    })



    it('getUser by email should fetch User correctly', (done) => {

        store.dispatch(actionCreators.getUserByEmail(stubUser.email))
            .then(() => {
                const newState = store.getState();
                expect(newState.usr.selectedUser).toBe(stubUser.selectedUser);
                expect(spyGetUser).toHaveBeenCalledTimes(1);
                done();
            })
    });

    it('getUser by id should fetch User correctly', (done) => {

        store.dispatch(actionCreators.getUserByUserId(stubUser.selectedUser.id))
            .then(() => {
                expect(spyGetUser).toHaveBeenCalledTimes(1);
                done();
            })
    });

    it('getUser by studentId should fetch User correctly', (done) => {

        store.dispatch(actionCreators.getUserByStudentId(stubUser.selectedUser.studentId))
            .then(() => {
                expect(spyGetUser).toHaveBeenCalledTimes(1);
                done();
            })
    });

    it('getUser by nickname should fetch User correctly', (done) => {

        store.dispatch(actionCreators.getUserByNickname(stubUser.selectedUser.nickname))
            .then(() => {
                const newState = store.getState();
                expect(newState.usr.selectedUser).toBe(stubUser.selectedUser);
                done();
            })
    });


})