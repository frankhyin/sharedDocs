import React from 'react';
import Login from './components/login';
import Register from './components/register';
import Editor from './components/editor';
import Home from './components/home'
import { HashRouter, Switch, Route } from 'react-router-dom';

const collaborators = ['a@a.com', 'b@a.com', 'c@a.com']

export default class App extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/editor" component={Editor}/>
            </Switch>
        </HashRouter>
        {/* <TextEditor title={'Untitled'} author={'Matt'} id={1} collaborators={collaborators} /> */}
      </div>
    );
  }
}
