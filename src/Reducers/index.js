import { combineReducers } from 'redux'
import task from './task';
import dform from './dform';
import task_edit from './task_edit';

const myReducer = combineReducers({
    task ,     
    dform,
    task_edit
});
export default myReducer;