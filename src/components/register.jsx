import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      displayNameInput: '',
      passwordInput: '',
      password2Input: '',
      emailError: '',
      displayNameError: '',
      passwordError: '',
      password2Error: '',
      drawerOpen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePassword2Change = this.handlePassword2Change.bind(this)
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

    if (!this.state.displayNameInput) {
        this.setState({displayNameError: "Please enter a display name"});
        success = false
    }

    if (!this.state.passwordInput) {
        this.setState({passwordError: "Please enter your password"});
        success = false;
    }

    if (!this.state.password2Input) {
        this.setState({password2Error: "Please verify your password"});
        success = false;
    }

    if (this.state.passwordInput !== this.state.password2Input) {
        this.setState({password2Error: "Passwords must match"});
        success = false;
    }
    if (success) {
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email: this.state.emailInput,
              displayName: this.state.displayNameInput,
              password: this.state.passwordInput,
              password2: this.state.password2Input
          })
        })
        .then(res => res.json())
        .then((result) => {
            this.props.history.push('/login');
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

  handleDisplayNameChange(event) {
      this.setState({
          displayNameInput: event.target.value
      })
  }

  handlePasswordChange(event){
    this.setState({
      passwordInput: event.target.value
    })
  }

  handlePassword2Change(event){
    this.setState({
      password2Input: event.target.value
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
                      title="Register"
                      onLeftIconButtonClick={this.handleDrawerOpen}
                  />
                  <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
                    <MenuItem onClick={() => this.props.history.push('/Login')} style={{marginTop: '15px'}}>Go to Login</MenuItem>
                  </Drawer>
                <div style={center}>
                    <div style={{margin: '100px'}}/>
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
                             hintText="Enter your Diplay Name"
                             floatingLabelText="Display Name"
                             onChange={(e) => this.handleDisplayNameChange(e)}
                             value={this.state.displayNameInput}
                             errorText={this.state.displayNameError}
                         />
                        <br/>
                    </div>

                    <div>
                        <TextField
                             hintText="Enter a Password"
                             floatingLabelText="Password"
                             onChange={(e) => this.handlePasswordChange(e)}
                             value={this.state.passwordInput}
                             errorText={this.state.passwordError}
                             type="password"
                         />
                        <br/>
                    </div>

                    <div>
                        <TextField
                             hintText="Verify your Password"
                             floatingLabelText="Verify your Password"
                             onChange={(e) => this.handlePassword2Change(e)}
                             value={this.state.password2Input}
                             errorText={this.state.password2Error}
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

export default withRouter(Register);
