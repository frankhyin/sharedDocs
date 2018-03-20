import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.emailInput.split("@").length <= 1){
      alert("Email Must Include @");
      return;
    }
    var emailBeforeAt = this.state.emailInput.split("@")[0];
    if (emailBeforeAt.length < 3){
      alert("Length before @ must be at least 3 characters");
      return;
    }
    if (this.state.passwordInput.length < 4){
      alert("Password must be at least 4 characters")
      return;
    }
    if (!this.state.passwordInput.match(/.*[0-9].*/)){
      alert("Password must contain a number");
      return;
    }
    if (!this.state.passwordInput.match(/[a-z]/i)){
      alert("Password must contain a letter");
      return;
    }
    alert("Form Submitted!");
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
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => this.handleEmailChange(e)}
          value={this.state.emailInput}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => this.handlePasswordChange(e)}
          value={this.state.passwordInput}
         />
        <input
          type="submit"
          value="Submit"
         />
      </form>
    )
  }
}

export default Login;
