import * as actionTypes from '../actions/actionTypes';

const initialState = {
    // TODO
    selectedDocument: null,
};

const tellmeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_DOCUMENT:
            return state;   // TODO
        case actionTypes.GET_DOCUMENT:
            return { ...state, selectedDocument: action.target };
        case actionTypes.PUT_DOCUMENT:
            return state;   // TODO
        case actionTypes.POST_PHOTO:
            return state;   // TODO
        case actionTypes.GET_PHOTO:
            return state;   // TODO
        case actionTypes.PUT_PHOTO:
            return state;   // TODO
        case actionTypes.GET_DEBATES:
            return state;   // TODO
        case actionTypes.POST_DEBATE:
            return state;   // TODO
        case actionTypes.GET_DEBATE:
            return state;   // TODO
        case actionTypes.GET_DEBATE_COMMENTS:
            return state;   // TODO
        case actionTypes.POST_DEBATE_COMMENT:
            return state;   // TODO
        default:
            break;
    }
    return state;
};

export default tellmeReducer;