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

  handleDrawerOpen = () => {
    this.setState({drawerOpen: true})
  }

  handleDrawerClose = () => {
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
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt.sign({
                email: this.state.emailInput,
                password: this.state.passwordInput
            }, process.env.JWT_SECRET)}`
          }
        })
        .then(res => res.json())
        .then((result) => {
            console.log("Result: ", result)
            this.props.history.push('/home');
        })
        .catch((error) => {
            console.log("Error: ", error)
        })
    }
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
          textAlign: 'center',
      }
      return (
        <div>
            <MuiThemeProvider>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <AppBar
                        title="Login"
                        onLeftIconButtonClick={this.handleDrawerOpen}
                    />
                    <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
                      <MenuItem onClick={() => this.props.history.push('/register')}>Go to Register</MenuItem>
                    </Drawer>
                  <div style={center}>
                      <div style={{margin: '190px'}}/>
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
               </form>
            </MuiThemeProvider>
        </div>
      )
  }
}

export default withRouter(Login);
