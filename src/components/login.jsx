import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { withRouter } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      emailError: '',
      passwordError: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
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
          },
          body: JSON.stringify({
              email: this.state.emailInput,
              password: this.state.passwordInput
          })
        })
        .then(res => res.json())
        .then((result) => {
            // this.props.history.push('/login');
            console.log(result);
            alert("Success!");
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
                    <AppBar title="Login"/>
                  <div style={center}>
                      <div style={{margin: '190px'}}/>
                      <div>
                          <TextField
                               hintText="Enter your Email address"
                               floatingLabelText="Email"
                               onChange={(e) => this.handleEmailChange(e)}
                               value={this.state.displayNameInput}
                               errorText={this.state.emailError}
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
                           />
                          <br/>
                      </div>
                      <br/>
                      <RaisedButton label="Submit" primary={true} type="submit"/>
                      <div style={{margin: '30px'}}/>
                      <RaisedButton onClick={() => this.props.history.push('/register')} label="Register" />
                   </div>
               </form>
            </MuiThemeProvider>
        </div>
      )
  }
}

export default withRouter(Login);
