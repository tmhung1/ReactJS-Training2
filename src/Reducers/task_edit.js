import * as types from './../Constants/ActionTypes';

let initialState = {
    id : '',
    txtName : '',
    txtStatus : false
};
const myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
};

export default myReducer;