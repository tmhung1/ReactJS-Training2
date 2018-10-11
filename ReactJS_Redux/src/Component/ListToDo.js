import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import { connect } from 'react-redux';
import * as actions from './../Action/index';
class ListToDo extends Component {
    constructor(props) {
        super(props);
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
       
        var filter = {
            filterName: name === 'filter_name' ? value : this.props.filterTask.filterName,
            filterStatus: name === 'filter_status' ? value : this.props.filterTask.filterStatus
        }
        this.props.onFilterTask(filter);
    }
    render() {

        var { task_props, filterTask ,searchTask ,sort} = this.props;
        //filter
        //filter ---name
        if (filterTask) {
            if (filterTask.filterName) {
                task_props = task_props.filter((todoItem) => {
                    return todoItem.txtName.toLowerCase().indexOf(filterTask.filterName.toLowerCase()) !==-1;
                });
            }
        }
        //filter ---status
        task_props = task_props.filter((todoItem)=>{
            if(filterTask.filterStatus === -1)
            {
                return todoItem;
            }else{
                return todoItem.txtStatus === (filterTask.filterStatus === 1 ? true : false);
            }
        });
        //search ---task
        if(searchTask)
        {
            task_props = task_props.filter((todoItem)=>{
                return todoItem.txtName.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1;
            })
        }

        var elmtask = task_props.map((task_item, index) => {
            return <ToDoItem
                key={task_item.id}
                index={index}
                task={task_item}
            />;
        });
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Filter</td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filter_name"
                                value={filterTask.filterName}
                                onChange={this.onChange}
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filter_status"
                                value={filterTask.filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>All</option>
                                <option value={0}>Active</option>
                                <option value={1}>Completed</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmtask}

                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        task_props: state.task,
        filterTask: state.filter_task,
        searchTask : state.search_task,
    }

};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTask: (filter) => {
            dispatch(actions.filterTask(filter));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListToDo);