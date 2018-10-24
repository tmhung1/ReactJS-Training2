import * as types from './../Constants/ActionTypes';

export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};
export const updateStatusTask = (id) => {
    return {
        type : types.UPDATE_STATUS_TASK,
        id
    }
};
export const deleteTask = (id) => {
    return {
        type : types.DELETE_TASK,
        id
    }
};
export const addTask2 = (task2) => {
    return {
        type : types.ADDTASK2,
        task2
    }
};
export const updateTask2 = (task2) => {
    return {
        type : types.UPDATETASK2,
        task2
    }
};










