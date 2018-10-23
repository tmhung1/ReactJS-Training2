import React, { Component } from 'react';
import './App.css';
import AddToDo from './../AddToDo';
import * as actions from './../../Action/index'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch , HashRouter} from 'react-router-dom';
import Menu from './../Menu/Menu';
import routes from './../../routes';

class App extends Component {
  
    constructor(props) {
      super(props);
    }
    //toggle add todo form 
    onClickAddToDo = () => {
      const { task_edit } = this.props;
      if (task_edit && task_edit.id !== '') {
        this.onOpenForm();
      }
      else {
        this.props.onToggleForm();
      }
      this.props.onClearTask
        ({
          id: '',
          txtName: '',
          txtStatus: false
        });
    }
    onOpenForm = () => {
      this.props.isFormdisplay;
    }
    render() {
      const { isFormdisplay } = this.props;
      const elmAddToDo = isFormdisplay ? <AddToDo /> : '';
      return (
        <HashRouter>
          <div className="container">
              <div className="text-center">
                  <hr></hr>
              </div>
              <div className="row">
                  <div className={isFormdisplay ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 ' : ''}>
                      {elmAddToDo}
                  </div>
                  <div className={isFormdisplay ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                      <button className="btn btn-primary" onClick={this.onClickAddToDo}>Add to do</button>  
                      <Menu/>
                      <Switch>
                        {this.showRoute(routes)}
                      </Switch>
                  </div>
              </div>
          </div>
        </HashRouter>
      );
    }
    showRoute = (routes) => {
      let result = null;
      if (routes.length > 0) {
        result = routes.map((item, index) => {
          return (
            <Route key={index} path={item.path} component={item.main} exact={item.exact}></Route>
          )
        });
      }
      return result;
    }
}
  const mapStatetoProps = (state) => {
    return {
      isFormdisplay: state.dform,
      task_edit: state.task_edit
    }
  };
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onToggleForm: () => {
        dispatch(actions.toggleForm());
      },
      onCloseForm: () => {
        dispatch(actions.closeForm());
      },
      onOpenForm: () => {
        dispatch(actions.openForm());
      },
      onClearTask: (task) => {
        dispatch(actions.editTask(task));
      }
    }
  };
  export default connect(mapStatetoProps, mapDispatchToProps)(App);
