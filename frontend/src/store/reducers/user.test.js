import React from 'react'
import userReducer from './user'
import * as actionTypes from '../actions/actionTypes'

describe('user reducer', () => {

    afterEach(() => { jest.clearAllMocks() })

    it('should signUp', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.POST_SIGN_UP
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: '',
            signIn: false
        })
    })

    it('should signIn', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.POST_SIGN_IN,
            selectedUser: '1234',
            signIn: true
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode: '',
            signIn: true
        })
    })

    it('should signOut', () => {
        const beforState = {
            selectedUser: '1234',
            verifyCode: '123'
        }
        const newState = userReducer(beforState, {
            type: actionTypes.GET_SIGN_OUT,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: '',
            signIn: false
        })
    })

    it('should getUser not logged In', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.GET_USER,
            selectedUser: '123',
            verifyCode: '12',
            emailDuplicate: false,
            nicknameDuplicate: false,
            studentIdDuplicate: false
        })
        expect(newState).toEqual({
            selectedUser: '123',
            verifyCode: '',
            signIn: false,
            emailDuplicate: false,
            nicknameDuplicate: false,
            studentIdDuplicate: false
        })
    })


    it('should getUser not logged In', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.GET_USER,
            selectedUser: '123',
            verifyCode: '12'
        })
        expect(newState).toEqual({
            selectedUser: '123',
            verifyCode: '',
            signIn: false,
            emailDuplicate: false,
            nicknameDuplicate: false,
            studentIdDuplicate: false
        })
    })

    it('not allowed actionTypes', () => {
        const beforState = {
            selectedUser: '1234',
            verifyCode: '123',
            signIn: false
        }
        const newState = userReducer(beforState, {
            type: actionTypes.POST_PETITION,
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode: '123',
            signIn: false
        })
    })

    it('should Check Duplicates works', () => {
        let newState = userReducer(undefined, {
            type: actionTypes.CHECK_EMAIL_DUPLICATE,
            emailDuplicate: true,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: '',
            signIn: false,
            emailDuplicate: true,
            nicknameDuplicate: false,
            studentIdDuplicate: false
        })

        newState = userReducer(undefined, {
            type: actionTypes.CHECK_NICKNAME_DUPLICATE,
            nicknameDuplicate: true,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: '',
            signIn: false,
            emailDuplicate: false,
            nicknameDuplicate: true,
            studentIdDuplicate: false
        })

        newState = userReducer(undefined, {
            type: actionTypes.CHECK_STUDENT_ID_DUPLICATE,
            studentIdDuplicate: true,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: '',
            signIn: false,
            emailDuplicate: false,
            nicknameDuplicate: false,
            studentIdDuplicate: true
        })

    })

    it('should getVerifyCode works', () => {
        let newState = userReducer(undefined, {
            type: actionTypes.GET_VERIFY_CODE,
            verifyCode: 123,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode: 123,
            signIn: false,
            emailDuplicate: false,
            nicknameDuplicate: false,
            studentIdDuplicate: false
        })
    })

    it('should checkSignIn works', () => {
        let newState = userReducer(undefined, {
            type: actionTypes.CHECK_SIGN_IN,
            signIn : true,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode : '',
            signIn : true,
            emailDuplicate : false,
            nicknameDuplicate : false,
            studentIdDuplicate : false
        })
    } )
})