import React, { Component } from 'react';
import './App.css';
import * as actions from './../../Action/index'
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch , HashRouter} from 'react-router-dom';
import Menu from './../Menu/Menu';
import routes from './../../routes';

class App extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          id: '',
          txtName: '',
          txtStatus: false
      };
    }
    //add todo item
    keyPress = (e) =>{
      if(e.keyCode ===13)
      {
        this.setState({
          id : '',
          txtName : e.target.value,
          txtStatus : false
        },function(){this.props.onAddTask2(this.state)});
      }
    }
    render() {
      return (
        <HashRouter>
          <div className="container">
              <div className="text-center">
                  <hr></hr>
              </div>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <input onKeyDown={this.keyPress} type="text" placeholder="What needs to be done? " class="form-control class_input" id="addTask"/>
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
    return {}
  };
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onAddTask2 : (task2) =>{
        dispatch(actions.addTask2(task2));
      }
    }
  };
  export default connect(mapStatetoProps, mapDispatchToProps)(App);
