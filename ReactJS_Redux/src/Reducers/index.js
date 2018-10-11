import { combineReducers } from 'redux'
import task from './task';
import dform from './dform';
import task_edit from './task_edit';
import filter_task from './filter_task';
import search_task from './search_task';

const myReducer = combineReducers({
    task ,     
    dform,
    task_edit,
    filter_task,
    search_task
  
});
export default myReducer;