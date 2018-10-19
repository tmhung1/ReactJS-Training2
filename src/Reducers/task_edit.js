import * as types from './../Constants/ActionTypes';

var initialState = {
    id : '',
    txtName : '',
    txtStatus : false
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
};

export default myReducer;