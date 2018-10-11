import * as types from './../Constants/ActionTypes';

var initialState = {
    filterName : '',
    filterStatus : -1    //-1: see all status
};
var myReducer = (state = initialState, action) =>{
    switch(action.type){
        case types.FILTER_TASK:
            return {
                filterName : action.filter.filterName,
                filterStatus : parseInt(action.filter.filterStatus)
            };
        default:
            return state;
    }
};

export default myReducer;