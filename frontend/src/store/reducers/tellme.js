import * as actionTypes from '../actions/actionTypes';

const initialState = {
    documents: [],
    selectedDocument: null,

    debates: [],
    selectedDebate: null,
    debateComments: [],
    titleDocuments : [],
    contentDocuments : []
};

const tellme = (prevState, action) => {
    let state;
    if (prevState === undefined) state = initialState;
    else state = prevState;
    switch (action.type) {
        case actionTypes.POST_DOCUMENT: {
            const newDocument = {
                id: action.id,
                title: action.title,
                content: action.content,
            };
            return { ...state, documents: state.documents.concat(newDocument) };
        }
        case actionTypes.GET_DOCUMENT: {
            if (action.unique === true) {
                return { ...state, selectedDocument: action.selectedDocument, titleDocuments : [], contentDocuments : [] };
            } else {
                return { ...state, selectedDocument : null, titleDocuments : action.titleDocuments, contentDocuments : action.contentDocuments}
            }
        }
        case actionTypes.PUT_DOCUMENT: {
            for(var i in state.documents)
            {
                if(state.documents[i].title === action.target)
                {
                    state.documents[i].content = action.content;
                }
            }
             return state;   // TODO
        }   
        // case actionTypes.POST_PHOTO: {
        //     return state;   // TODO
        // }
        // case actionTypes.GET_PHOTO: {
        //     return state;   // TODO
        // }
        // case actionTypes.PUT_PHOTO: {
        //     return state;   // TODO
        // }

        case actionTypes.GET_DEBATES: {
            return {...state, debates: action.debateList};   // TODO
        }

        case actionTypes.POST_DEBATE: {
            return {...state};   // TODO
        }

        case actionTypes.GET_DEBATE: {
            return {...state, selectedDebate: action.target};   // TODO
        }

        case actionTypes.GET_DEBATE_COMMENTS: {
            return {...state, debateComments: action.commentList};   // TODO
        }
        
        case actionTypes.POST_DEBATE_COMMENT: {
            return {...state};   // TODO
        }

        default:
            break;
    }
    return state;
};

export default tellme;