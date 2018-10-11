import {createStore} from 'redux';
import {status,sort} from './Action/action.js';
import myReducer from './Reducers/index';

const store = createStore(myReducer);
console.log("default state: " ,store.getState());

//var action = {type : 'toggle status'};
store.dispatch(status());
console.log("toggle status : " , store.getState());
// var sort_action = {
//     type : 'sort status',
//     sort : {
//         by : 'name',
//         value : -1
//     }    
// }
store.dispatch(sort({
    by: 'name',
    value : -1
}));

console.log("sort status : " , store.getState());



