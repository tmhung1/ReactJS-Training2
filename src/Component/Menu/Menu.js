import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
  {
    label: 'All',
    to: '/',
    exact: true
  },
  {
    label: 'Active',
    to: '/active',
    exact: false
  },
  {
    label: 'Completed',
    to: '/completed',
    exact: false
  }
];
const Mylink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      var active = match ? 'active' : '';
      return (
        <li className={active}>
          <Link
            to={to}
            className="my-link"
          >{label}
          </Link>
        </li>
      )
    }}>
    </Route>
  )
}
class Menu extends Component {
  render() {
    return (
        <ul className="filters">
          {this.showMenu(menus)}
        </ul>
    );
  }
  showMenu = (menus) => {
    var result = null;
    if (menus.length > 0) { 
      result = menus.map((item, index) => {
        return (
          <Mylink key={index} label={item.label} to={item.to} activeOnlyWhenExact={item.exact} />
        )
      });
    }
    return result;
  }
}
export default Menu;

