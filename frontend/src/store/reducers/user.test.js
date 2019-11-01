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
            verifyCode : ''
        })
    })

    it ('should signIn', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.POST_SIGN_IN,
            selectedUser : '1234'
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode : ''
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
            verifyCode : ''
        })
    })

    it ('should getUser', () => {
        const newState = userReducer(undefined, {
            type: actionTypes.GET_USER,
            selectedUser: '123',
            verifyCode : '12'
        })
        expect(newState).toEqual({
            selectedUser: '123',
            verifyCode : '12'
        })
    })

    it ('not allowed actionTypes', () => {
        const beforState = {
            selectedUser : '1234',
            verifyCode : '123'
        }
        const newState = userReducer(beforState, {
            type: actionTypes.POST_PETITION,
        })
        expect(newState).toEqual({
            selectedUser: '1234',
            verifyCode : '123'
        })
    })
})