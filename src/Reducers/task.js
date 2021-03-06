import * as types from './../Constants/ActionTypes';

//random id 
let generateID = () => {
    let randomstring = require("random-string");
    return randomstring({ length: 20 });
}

let findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((item, index) => {
        if (item.id === id) {
            result = index;
        }
    });
    return result;
}

const data = JSON.parse(localStorage.getItem('TASK_ID'));
let initialState = data ? data : [];

const myReducer = (state = initialState, action) => {
    let id = '';
    let index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            let todoItem = { ...state[index]};
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
        case types.ADDTASK2 : 
            let newTask ={
                id : generateID(),
                txtName : action.task2.txtName,
                txtStatus: (action.task2.txtStatus === 'true' || action.task2.txtStatus === true) ? true : false
            }
            state.push(newTask);
            localStorage.setItem('TASK_ID', JSON.stringify(state));
            return [...state];
        case types.UPDATETASK2 : 
            let task_update = {
                id: action.task2.id,
                txtName: action.task2.txtName,
                txtStatus: (action.task2.txtStatus === 'true' || action.task2.txtStatus === true) ? true : false
            };
            index = findIndex(state, task_update.id);
            if(task_update.txtName === "")
            {
                state.splice(index, 1);
            }else{
                state[index] = task_update;
            }
            localStorage.setItem('TASK_ID', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}
export default myReducer;

