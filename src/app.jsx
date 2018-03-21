import React from 'react';
import Login from './components/login';
import Register from './components/register'
import TextEditor from './components/Editor'
import {Route, HashRouter, Switch} from 'react-router-dom';


export default class App extends React.Component {
  render() {
    return (<div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/Editor" exact component={TextEditor}/>
        </Switch>
      </HashRouter>
    </div>);
  }
}
