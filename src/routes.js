import React, { Component } from 'react';
import ListToDo from './Component/ListToDo';


const routes = [
 
  {
    path: '/',
    exact: true,
    main: ({match}) => <ListToDo match={match} />
  },
  
  {
    path: '/active',
    exact: false,
    main: ({match}) => <ListToDo match={match} />
  },
  
  {
    path: '/completed',
    exact: false,
    main: ({match}) => <ListToDo match={match} />
  }
 
]

export default routes;
