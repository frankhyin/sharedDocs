import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router';

const jwt = require('jsonwebtoken');


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      emailError: '',
      passwordError: '',
      drawerOpen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
  }

  handleDrawerOpen() {
    this.setState({drawerOpen: true})
  }

  handleDrawerClose() {
    this.setState({drawerOpen: false})
  }

  handleSubmit(event) {
    event.preventDefault();
    var success = true;

    if (!this.state.emailInput) {
        this.setState({emailError: "Please enter your email address"});
        success = false;
    }

    if (!this.state.passwordInput) {
        this.setState({passwordError: "Please enter your password"});
        success = false;
    }
    if (success) {
        global.token = `Bearer ${jwt.sign({
            email: this.state.emailInput,
            password: this.state.passwordInput
        }, process.env.JWT_SECRET)}`;
        window.localStorage.setItem('token', global.token);
        this.login();
    }
  }
  login() {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': global.token,
      }
    })
    .then(res => res.json())
    .then((result) => {
        console.log("Result: ", result)
        global.displayName = result.displayName;

        this.props.history.push('/home');
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
  }
  componentDidMount() {
    global.token = window.localStorage.getItem('token');
    if (global.token)
      this.login();
  }

  handleEmailChange(event){
    this.setState({
      emailInput: event.target.value
    })
  }

  handlePasswordChange(event){
    this.setState({
      passwordInput: event.target.value
    })
  }


  render() {
      const center = {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
      }
      return (
        <div>
            <MuiThemeProvider>
                <form onSubmit={(e) => this.handleSubmit(e)} style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
                    <AppBar
                        title="Login"
                        onLeftIconButtonClick={this.handleDrawerOpen}
                    />
                    <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
                      <MenuItem onClick={() => this.props.history.push('/register')} style={{marginTop: '15px'}}>Go to Register</MenuItem>
                    </Drawer>
                  <div style={center}>
                    <div style={{marginTop: -40, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div>
                          <TextField
                               hintText="Enter your Email address"
                               floatingLabelText="Email"
                               onChange={(e) => this.handleEmailChange(e)}
                               value={this.state.emailInput}
                               errorText={this.state.emailError}
                           />
                          <br/>
                      </div>

                      <div>
                          <TextField
                               hintText="Enter your Password"
                               floatingLabelText="Password"
                               onChange={(e) => this.handlePasswordChange(e)}
                               value={this.state.passwordInput}
                               errorText={this.state.passwordError}
                               type="password"
                           />
                          <br/>
                      </div>
                      <br/>
                      <RaisedButton label="Submit" primary={true} type="submit"/>
                   </div>
                 </div>
               </form>
            </MuiThemeProvider>
        </div>
      )
  }
}

export default withRouter(Login);
