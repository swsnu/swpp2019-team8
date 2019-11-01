import reducer from './tellme';
import * as actionTypes from '../actions/actionTypes';

describe('TellMe Reducer', () => {
    it(`should return default state`, () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual({
            selectedDocument: null
        });
    });

    it(`should get document`, () => {
        const stubSelectedDocument = { id: 1, title: 'title', content: 'content' };
        const newState = reducer(undefined, {
            type: actionTypes.GET_DOCUMENT,
            target: stubSelectedDocument,
        });
        expect(newState).toEqual({
            selectedDocument: stubSelectedDocument
        });
    });
})