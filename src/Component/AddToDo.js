import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../Action/index';
class AddToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtStatus: false
        };
    }
    //when click the first button Add to do 
    componentWillMount() {
        if (this.props.task_edit && this.props.task_edit.id !== null) {
            this.setState({
                id: this.props.task_edit.id,
                txtName: this.props.task_edit.txtName,
                txtStatus: this.props.task_edit.txtStatus
            });
        } else {
            this.onClear();
        }
    }
    //when display form add to do , allow click button edit item
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task_edit) {
            this.setState({
                id: nextProps.task_edit.id,
                txtName: nextProps.task_edit.txtName,
                txtStatus: nextProps.task_edit.txtStatus
            });
        } else {
            this.onClear();
        }
    }
    onClear = () => {
        this.setState({
            txtName: '',
            txtStatus: false
        });
    }
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    handleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'txtStatus') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }
    onSubmitToDo = (event) => {
        event.preventDefault();
        this.props.onAddTask(this.state);
        //when submit is cancel and close form
        this.onClear();
        this.onCloseForm();
    }
    onClearForm = () => {
        this.props.onCloseForm();
    }
    render() {
        var { id , txtName , txtStatus } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Update todo item' : 'Add to do '}
                        <span className="fa fa-close mr-20" onClick={ this.onCloseForm }></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmitToDo } >
                        /** input : name */
                        <div className="form-group">
                            <label> Name :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="txtName"
                                value={txtName}
                                onChange={this.handleChange} 
                            />
                        </div>
                        <label> Status :</label>
                        <select
                            className="form-control"
                            name="txtStatus"
                            value={ txtStatus }
                            onChange={ this.handleChange }
                        >
                            <option value={true}>Completed</option>
                            <option value={false}>Active</option>
                        </select><br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Save
                            </button>&nbsp;
                            <button type="button" onClick={ this.onClear } className="btn btn-danger">
                                    <span className="fa fa-close mr-5"></span>Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
    const mapStatetoProps = (state) => {
        return {
            task_edit: state.task_edit
        }
    };
    const mapDispatchToProps = (dispatch, props) => {
        return {
            onAddTask: (task) => {
                dispatch(actions.addTask(task));
            },
            onCloseForm: () => {
                dispatch(actions.closeForm());
            }
        }
    };
    export default connect(mapStatetoProps, mapDispatchToProps)(AddToDo);
