import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import { connect } from 'react-redux';
import * as actions from './../Action/index';
class ListToDo extends Component {
    
    constructor(props) 
    {
        super(props);
    }
    render() {
        let { task_props } = this.props;
        const path_name = this.props.match.path;
        task_props = task_props.filter((todoItem)=>{
            if(path_name === "/")
            {
                return todoItem;
            }else {
                return todoItem.txtStatus === (path_name === "/active" ? false : true);
            }
        });
        var elmtask = task_props.map((task_item, index) => {
            return <ToDoItem
                key = { task_item.id }
                index = { index }
                task = { task_item }
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
                    {elmtask}
                </tbody>
            </table>
        );
    }
}
    const mapStateToProps = (state) => {
        return {
            task_props : state.task,
        }
    };
    const mapDispatchToProps = (dispatch, props) => {
        return {
        }
    };
    export default connect(mapStateToProps, mapDispatchToProps)(ListToDo);