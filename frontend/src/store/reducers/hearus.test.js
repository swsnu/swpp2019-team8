import reducer from './hearus';
import * as actionTypes from '../actions/actionTypes';

describe('HearUs Reducer', () => {
    it(`should return default state`, () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual({
            comment_list: [],
            petition_list: [],
            selectedPetition: null,
        });
    });

    it(`should get petition`, () => {
        const stubSelectedPetition = { id: 1, title: 'title', content: 'content' };
        const newState = reducer(undefined, {
            type: actionTypes.GET_PETITION,
            target: stubSelectedPetition,
        });
        expect(newState).toEqual({
            comment_list: [],
            petition_list: [],
            selectedPetition: {
                content: "content",
                id: 1,
                title: "title",
            },
        });
    });

    it(`should put petition vote`, () => {
        const stubPetition = { id: 1, votes: 0 };
        const stubInitialState = {
            petition_list: [stubPetition],
        }
        let newState = reducer(stubInitialState, {
            type: actionTypes.PUT_PETITION_VOTE,
            targetID: 0,
        });
        expect(newState).toEqual({
            petition_list: [undefined],
        });
        newState = reducer(stubInitialState, {
            type: actionTypes.PUT_PETITION_VOTE,
            targetID: 1,
        });
        expect(newState).toEqual({
            petition_list: [{ ...stubPetition, votes: 1 }],
        });
    });
});