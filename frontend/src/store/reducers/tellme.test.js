import reducer from './tellme';
import * as actionTypes from '../actions/actionTypes';

const stubDocument = {
    id: 0,
    title: 'title 1',
    content: 'content 1',
};

describe('TellMe Reducer', () => {
    it(`should return default state`, () => {
        const newState = reducer(undefined, {});
        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            titleDocuments: [],
            contentDocuments: []
        });
    });

    it('should post document', () => {
        const newState = reducer(undefined, {
            type: actionTypes.POST_DOCUMENT,
            id: stubDocument.id,
            title: stubDocument.title,
            content: stubDocument.content,
        });
        expect(newState).toEqual({
            documents: [stubDocument],
            selectedDocument: null,
            titleDocuments: [],
            contentDocuments: []
        });
    });

    it(`should get document unique`, () => {
        const stubSelectedDocument = { id: 1, title: 'title', content: 'content' };
        const newState = reducer(undefined, {
            type: actionTypes.GET_DOCUMENT,
            unique: true,
            selectedDocument: stubSelectedDocument,
            titleDocuments: stubSelectedDocument,    //for search fail
            contentDocuments: stubSelectedDocument
        });
        expect(newState).toEqual({
            documents: [],
            selectedDocument: stubSelectedDocument,
            titleDocuments: [],
            contentDocuments: []
        });
    });

    it(`should get document not unique`, () => {
        const stubSelectedDocument = { id: 1, title: 'title', content: 'content' };
        const newState = reducer(undefined, {
            type: actionTypes.GET_DOCUMENT,
            unique: false,
            selectedDocument: stubSelectedDocument,
            titleDocuments: stubSelectedDocument,    //for search fail
            contentDocuments: stubSelectedDocument
        });
        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            titleDocuments: stubSelectedDocument,
            contentDocuments: stubSelectedDocument
        });
    });
})