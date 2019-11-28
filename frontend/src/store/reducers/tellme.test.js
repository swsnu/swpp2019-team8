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
            documentDuplicate: false,
            titleDocuments: [],
            contentDocuments: [],
            debateComments: [],
            debates: [],
            selectedDebate: null,
            documentConflict: false,
        });
    });

    it('should post document', () => {
        const newState = reducer(undefined, {
            type: actionTypes.POST_DOCUMENT,
            id: stubDocument.id,
            title: stubDocument.title,
            content: stubDocument.content,
            documentDuplicate: false, 
        });
        expect(newState).toEqual({
            documents: [],
            documentDuplicate: false,
            selectedDocument: null,
            titleDocuments: [],
            contentDocuments: [],
            debateComments: [],
            debates: [],
            selectedDebate: null,
            documentConflict: false,
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
            documentDuplicate: false,
            titleDocuments: [],
            contentDocuments: [],
            debateComments: [],
            debates: [],
            selectedDebate: null,
            documentConflict: false,
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
            documentDuplicate: false,
            titleDocuments: stubSelectedDocument,
            contentDocuments: stubSelectedDocument,
            debateComments: [],
            debates: [],
            selectedDebate: null,
            documentConflict: false,
        });
    });

    it('should post debate comment works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.POST_DEBATE
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: [],
            selectedDebate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
        })
    });

    it('should get debate comments works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_DEBATE_COMMENTS,
            commentList : [1, 2]
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: [],
            selectedDebate: null,
            debateComments: [1, 2],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
        })
    });

    it('should get debate works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_DEBATE,
            target: 1
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: [],
            selectedDebate: 1,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
        })
    });

    it('should post debate works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.POST_DEBATE,
            target: 1
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: [],
            selectedDebate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
        })
    })

    it('should get debates works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_DEBATES,
            debateList: 1
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: 1,
            selectedDebate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
        })
    })




})