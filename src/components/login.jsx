import React from 'react';

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
        this.setState({emailError: "Please enter your email"});
        success = false;
    }

    if (!this.state.passwordInput) {
        this.setState({passwordError: "Please enter your password"});
        success = false;
    }
    if (success) {
    alert("Logged In!");
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
              type="password"
              placeholder="Password"
              onChange={(e) => this.handlePasswordChange(e)}
              value={this.state.passwordInput}
             />

             <span>{this.state.passwordError}</span>
         </div>

        <input
          type="submit"
          value="Login"
         />
      </form>
    )
  }
}

export default Login;