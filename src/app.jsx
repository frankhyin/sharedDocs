import React from 'react';
import Login from './components/login';
import Register from './components/register';
import TextEditor from './components/editor';
import Home from './components/home'
import { HashRouter, Switch, Route } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TextEditor />
      </div>
    );
  }
}
