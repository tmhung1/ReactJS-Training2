import * as types from './../Constants/ActionTypes';

//random id 
var generateID = () => {
    var randomstring = require("random-string");
    return randomstring({ length: 20 });
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    });
    return result;
}

var data = JSON.parse(localStorage.getItem('TASK_ID'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var id = '';
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.ADDTASK:
            var task = {
                id: action.task.id,
                txtName: action.task.txtName,
                txtStatus: (action.task.txtStatus === 'true' || action.task.txtStatus === true) ? true : false
            };
            if (!task.id) {
                task.id = generateID();
                state.push(task);
            } else {
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('TASK_ID', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            var todoItem = { ...state[index]};
            todoItem.txtStatus = !todoItem.txtStatus;
            state[index] = todoItem;
            localStorage.setItem('TASK_ID', JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1);
            localStorage.setItem('TASK_ID', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}
export default myReducer;

