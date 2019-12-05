import reducer from './hearus';
import * as actionTypes from '../actions/actionTypes';

describe('HearUs Reducer', () => {
    it(`should return default state`, () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual({
            comment_list: [],
            petition_list: [],
            petition_list_by_document:[],
            selectedPetition: null,
            petition_list_by_comment:[]
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
            petition_list_by_document:[],
            selectedPetition: {
                content: "content",
                id: 1,
                title: "title",
            },
            petition_list_by_comment:[]
        });
    });
});