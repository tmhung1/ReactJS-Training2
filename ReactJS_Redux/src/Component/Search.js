import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../Action/index';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }
    onSearch = () => {
        this.props.onSearchTask(this.state.name);
    }
    onChange = (event) => {
        this.setState({
            name: event.target.value
        });
    }
    render() {

        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input
                        name="keyword"
                        type="text"
                        className="form-control"
                        placeholder="..."
                        value={this.state.name}
                        onChange={this.onChange}
                    />
                    <span className="input-group-btn">
                        <button onClick={this.onSearch} className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>Search
                    </button>
                    </span>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = (state) => {
    return {
       
    }

};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearchTask: (name) => {
            dispatch(actions.searchTask(name));
        }
    }
};

export default connect(mapStatetoProps, mapDispatchToProps)(Search);