import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';

const jwt = require('jsonwebtoken');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        titleInput: 'Untitled',
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleNewDoc = this.handleNewDoc.bind(this)
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleLogOut() {
      fetch('http://localhost:3000/logout', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': global.token
          }
      })
      .then(res => res.json())
      .then((result) => {
          if (result.success) {
              this.props.history.push('/login');
          }
      })
      .catch((error) => {
          console.log("Error: ", error)
      })
  }

  handleTitleChange(event){
    this.setState({
      titleInput: event.target.value
    })
  }

  handleNewDoc() {
      fetch('http://localhost:3000/doc/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': global.token
        },
        body: JSON.stringify({
            title: this.state.titleInput,
        })
      })
      .then(res => res.json())
      .then((result) => {
          console.log(result);
          // alert("Success!");
          this.handleClose();
          this.props.history.push('/editor');
      })
      .catch((error) => {
          console.log("Error: ", error)
      })
  }

  componentDidMount(){
    console.log('mount')
    fetch('http://localhost:3000/home', {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': global.token
          }
      })
      .then(res => res.json())
      .then((result) => {
          if (result.success) {
            console.log('/home', result);
          }
      })
      .catch((error) => {
          console.log("Error: ", error)
      })
  }

  render() {
      const actions = [
          <FlatButton
            label="Cancel"
            onClick={this.handleClose}
          />,
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.handleNewDoc}
            type="submit"
          />,
        ];
      const center = {
          textAlign: 'center',
      }
      return (
          <div>
              <MuiThemeProvider>
                  <div>
                  <AppBar title={`Welcome, ${global.displayName || '?'}`}/>
                      <div>
                        <RaisedButton label="Create a new Document" primary={true} onClick={this.handleOpen} />
                            <Dialog
                              title="Create a new Document"
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}>
                              <TextField
                                   hintText="Give your Document a title"
                                   floatingLabelText="Document"
                                   onChange={(e) => this.handleTitleChange(e)}
                                   // value={this.state.titleInput}
                                   // errorText={this.state.emailError}
                               />
                            </Dialog>
                        <RaisedButton onClick={this.handleLogOut} label="Log Out" />
                      </div>
                  </div>
              </MuiThemeProvider>
          </div>
      );
  };
}

export default withRouter(Home);
