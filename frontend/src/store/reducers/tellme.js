import * as actionTypes from '../actions/actionTypes';

const initialState = {
    documents: [],
    selectedDocument: null,
    selectedPhoto: null,

    debates: [],
    selectedDebate: null,
    debateComments: [],

    titleDocuments: [],
    contentDocuments: [],
    documentDuplicate: false,

    documentConflict: false
};

const tellme = (prevState, action) => {
    let state;
    if (prevState === undefined) state = initialState;
    else state = prevState;
    switch (action.type) {
        case actionTypes.POST_DOCUMENT: {
            return { ...state, documentDuplicate: action.documentDuplicate };
        }
        case actionTypes.GET_DOCUMENT: {
            if (action.unique === true) {
                return { ...state, selectedDocument: action.selectedDocument, titleDocuments: [], contentDocuments: [] };
            } else {
                return { ...state, selectedDocument: null, titleDocuments: action.titleDocuments, contentDocuments: action.contentDocuments }
            }
        }
        case actionTypes.GET_LATEST_DOCUMENTS: {
            return { ...state, documents: action.documents }
        }
        case actionTypes.PUT_DOCUMENT: {

            return { ...state, documentConflict: action.conflict }

        }
        case actionTypes.GET_PHOTO: {

            return { ...state, selectedPhoto: action.photo };   // TODO
        }
        // case actionTypes.PUT_PHOTO: {
        //     return state;   // TODO
        // }
        case actionTypes.GET_DEBATES: {
            return { ...state, debates: action.debateList };   // TODO
        }

        case actionTypes.POST_DEBATE: {
            return { ...state };   // TODO
        }

        case actionTypes.GET_DEBATE: {
            return { ...state, selectedDebate: action.target };   // TODO
        }

        case actionTypes.GET_DEBATE_COMMENTS: {
            return { ...state, debateComments: action.commentList };   // TODO
        }

        case actionTypes.POST_DEBATE_COMMENT: {
            return { ...state };   // TODO
        }

        default:
            break;
    }
    return state;
};

export default tellme;