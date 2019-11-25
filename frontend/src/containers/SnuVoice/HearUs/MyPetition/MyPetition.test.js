import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps } from '../../UpperBar/UpperBar';



describe('mapDispatchToProps', () => {
    let dispatch;

    beforeEach(() => {
        dispatch = jest.fn();
    })

    afterEach(() => jest.clearAllMocks())

    it('test functions', () => {
        mapDispatchToProps
    })
    
})

describe('mapStateToProps', () => {
    it ('test props', () => {
        const initialState = {
            hu : {
                //TODO
            }
        }
    })
})