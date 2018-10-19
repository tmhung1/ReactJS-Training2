import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../Action/index';

class ToDoItem extends Component {

    onUpdateStatus = () => 
    {
       this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () =>
    {
        this.props.onDeleteItem(this.props.task.id);
    }
    onUpdateItem = () =>
    {
        this.props.onOpenForm();
        this.props.onUpdateItem(this.props.task);
    }
    render() {
        var { task, index } = this.props;  
        return (
            <tr>
                <td>{index}</td>
                <td className={task.txtStatus ? 'complete' : ''}>{task.txtName}</td>
                <td className="text-center">
                    <span
                        onClick={this.onUpdateStatus}
                        className={task.txtStatus === true ? 'label label-success' : 'label label-danger'}>
                        {task.txtStatus === true ? 'Completed' : 'Active'}</span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick = {this.onUpdateItem}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button
                        onClick={this.onDeleteItem}
                        type="button" 
                        className="btn btn-danger">
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
    const mapStatetoProps = (state) => {
        return {}
    };
    const mapDispatchToProps = (dispatch, props) => {
        return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatusTask(id));
        },
        onDeleteItem : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onUpdateItem : (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        }
        }
    };
    export default connect(mapStatetoProps,mapDispatchToProps)(ToDoItem);