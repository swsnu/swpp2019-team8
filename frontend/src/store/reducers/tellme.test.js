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
            selectedPhoto: null,
            titlePhotoList: [],
            photoDuplicate: null,
            contentPhotoList: []
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
            selectedPhoto: null,
            photoDuplicate: null,
            titlePhotoList: [],
            contentPhotoList: []
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
            selectedPhoto: null,
            photoDuplicate: null,
            titlePhotoList: [],
            contentPhotoList: []
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
            selectedPhoto: null,
            debates: [],
            selectedDebate: null,
            documentConflict: false,
            titlePhotoList: [],
            contentPhotoList: [],
            photoDuplicate: null
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
            selectedPhoto: null,
            selectedDebate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            titlePhotoList: [],
            photoDuplicate: null,
            contentPhotoList: []
        })
    });

    it('should get debate comments works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_DEBATE_COMMENTS,
            commentList: [1, 2]
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            selectedPhoto: null,
            debates: [],
            photoDuplicate: null,
            selectedDebate: null,
            debateComments: [1, 2],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            titlePhotoList: [],
            contentPhotoList: []
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
            selectedPhoto: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            photoDuplicate: null,
            titlePhotoList: [],
            contentPhotoList: []
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
            photoDuplicate: null,
            selectedPhoto: null,
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            titlePhotoList: [],
            contentPhotoList: []
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
            selectedPhoto: null,
            photoDuplicate: null,
            selectedDebate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            titlePhotoList: [],
            contentPhotoList: []
        })
    })

    it('should get photo works', () => {
        const newState = reducer(undefined, {
            type: actionTypes.GET_PHOTO,
            photo: 1
        })

        expect(newState).toEqual({
            documents: [],
            selectedDocument: null,
            documentDuplicate: false,
            debates: [],
            selectedPhoto: 1,
            selectedDebate: null,
            photoDuplicate: null,
            debateComments: [],
            titleDocuments: [],
            contentDocuments: [],
            documentConflict: false,
            titlePhotoList: [],
            contentPhotoList: []
        })
    })




})