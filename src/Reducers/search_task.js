import * as types from './../Constants/ActionTypes';

var initialState = '';
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.SEARCH_TASK:
            return action.name;
        default:
            return state;
    }
};

export default myReducer;