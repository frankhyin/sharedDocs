import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
          <div>Hello</div>
      )
  }

}

export default withRouter(Home);
