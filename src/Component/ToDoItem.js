import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../Action/index';

class ToDoItem extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtStatus: false
        };
    }
    onUpdateStatus = () => 
    {
       this.props.onUpdateStatus(this.props.task.id);
    }
    onDeleteItem = () =>
    {
        this.props.onDeleteItem(this.props.task.id);
    }
    onDoubleClick = (e) =>{
        const { task } = this.props;  
        e.preventDefault();
        let t= document.getElementById("namDB" +`${task.id}`);
        let t2= document.getElementById("namDB2" +`${task.id}`);
        t.style.display = 'none';
        t2.style.display = 'block'; 
    }
    keyPress = (e) =>{
        const { task } = this.props;  
        let t= document.getElementById("namDB" +`${task.id}`);
        let t2= document.getElementById("namDB2" +`${task.id}`);
        if(e.keyCode === 13)
        {
          this.setState({
            id : t2.getAttribute("data-id"),
            txtName : e.target.value,
            txtStatus : t.getAttribute("data-status")
          },function(){this.props.onUpdateTask(this.state)});
          t.style.display = 'block';
          t2.style.display = 'none';
        }  
      }
    render() {
        const { task, index } = this.props;  
        return (
            <tr>
                <td>{index}</td>
                <td>
                    <p data-status={task.txtStatus}  id={"namDB" +`${task.id}`} onDoubleClick={this.onDoubleClick} className={task.txtStatus ? 'complete' : ''}>{task.txtName}</p>
                    <input className="namDB2" data-id={task.id} type="text" id={"namDB2" + `${task.id}` } onKeyDown={this.keyPress} ></input>
                </td>
                <td className="text-center">
                    <span
                        onClick={this.onUpdateStatus}
                        className={task.txtStatus === true ? 'label-success' : 'label-danger'}>
                        {task.txtStatus === true ? 'Completed' : 'Active'}</span>
                </td>
                <td className="text-center">
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
        onUpdateTask : (task2) =>{
            dispatch(actions.updateTask2(task2));
        }
        }
    };
    export default connect(mapStatetoProps,mapDispatchToProps)(ToDoItem);