import * as actionTypes from '../actions/actionTypes';

const initialState = {
    petition_list: [],
    selectedPetition: null,
    comment_list: [],
    petition_list_by_document: [],
    
};


const hearus = (prevState, action) => {
    let state;
    if (prevState === undefined) state = initialState;
    else state = prevState;
    switch (action.type) {
        case actionTypes.POST_PETITION: {
            const newPetition = {
                id: action.id,
                title: action.title,
                content: action.content,
                link: action.link,
                tag: action.tag,
            };
            return { ...state, petition_list: state.petition_list.concat(newPetition) };
        }
        case actionTypes.GET_ALL_PETITIONS:
            return { ...state, petition_list: action.petitionList };   // TODO
        case actionTypes.GET_PETITION_BY_TITLE:
            return { ...state, petition_list: action.petitionList }
        case actionTypes.GET_PETITION:
            return { ...state, selectedPetition: action.target };   // TODO
        case actionTypes.GET_PETITION_BY_DOCUMENT:
            return {...state, petition_list_by_document: action.petitionList}
        case actionTypes.GET_MY_PETITIONS:
            return { ...state, petition_list: action.myPetitionList };   // TODO
        case actionTypes.GET_PETITION_COMMENTS:
            return { ...state, comment_list: action.comment_list };
        case actionTypes.POST_PETITION_COMMENT: {
            return { ...state };
        }
        case actionTypes.PUT_PETITION_VOTE: {
            return { ...state, selectedPetition: action.target };
        }

        // Statistic에 해당하는 것은 아직 안 만듦

        default:
            break;
    }
    return state;
};

export default hearus;