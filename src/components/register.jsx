import React from 'react';
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
      password2Error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleDisplayNameChange = this.handleDisplayNameChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePassword2Change = this.handlePassword2Change.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault();
    var success = true;

    if (!this.state.emailInput) {
        this.setState({emailError: "Please enter your email"});
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
        alert("Registered!");

      this.props.history.push('/login');
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
    return (
      <form
        onSubmit={(e) => this.handleSubmit(e)}
       >
        <div>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => this.handleEmailChange(e)}
              value={this.state.emailInput}
            />
            <span>{this.state.emailError}</span>
        </div>

        <div>
            <input
              type="text"
              placeholder="Display name"
              onChange={(e) => this.handleDisplayNameChange(e)}
              value={this.state.displayNameInput}
            />
            <span>{this.state.displayNameError}</span>
        </div>

        <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => this.handlePasswordChange(e)}
              value={this.state.passwordInput}
             />
             <span>{this.state.passwordError}</span>
         </div>

         <div>
             <input
               type="password"
               placeholder="Verify your password"
               onChange={(e) => this.handlePassword2Change(e)}
               value={this.state.password2Input}
              />
              <span>{this.state.password2Error}</span>
          </div>
        <input
          type="submit"
          value="Register"
         />
      </form>
    )
  }
}

export default withRouter(Register);
