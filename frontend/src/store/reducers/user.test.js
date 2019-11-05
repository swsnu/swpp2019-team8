import React from 'react'
import userReducer from './user'
import * as actionTypes from '../actions/actionTypes'

describe ('user reducer', () => {
    afterEach(() => {jest.clearAllMocks()})
    it ('should signUp', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.POST_SIGN_UP
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode : '',
            signIn : false
        })
    })

    it ('should signIn', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.POST_SIGN_IN,
            selectedUser : '1234',
            signIn : true
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode : '',
            signIn : true
        })
    })

    it ('should signOut', () => {
        const beforState = {
            selectedUser : '1234',
            verifyCode : '123'
        }
        const newState = userReducer(beforState, {
            type: actionTypes.GET_SIGN_OUT,
        })
        expect(newState).toEqual({
            selectedUser: '',
            verifyCode : '',
            signIn : false
        })
    })

    it ('should getUser not logged In', () => {
        Storage.prototype.getItem = jest.fn(() => {return null})
        const newState = userReducer(undefined, {
            type: actionTypes.GET_USER,
            selectedUser: '123',
            verifyCode : '12'
        })
        expect(newState).toEqual({
            selectedUser: '123',
            verifyCode : '12',
            signIn : false
        })
    })

    
    it ('should getUser not logged In', () => {
        Storage.prototype.getItem = jest.fn(() => {return '1'})
        const newState = userReducer(undefined, {
            type: actionTypes.GET_USER,
            selectedUser: '123',
            verifyCode : '12'
        })
        expect(newState).toEqual({
            selectedUser: '123',
            verifyCode : '12',
            signIn : true
        })
    })

    it ('not allowed actionTypes', () => {
        const beforState = {
            selectedUser : '1234',
            verifyCode : '123',
            signIn : false
        }
        const newState = userReducer(beforState, {
            type: actionTypes.POST_PETITION,
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode : '123',
            signIn : false
        })
    })
})