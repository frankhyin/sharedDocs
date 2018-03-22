import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router';

const jwt = require('jsonwebtoken');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        titleInput: 'Untitled',
        open: false, //dialogue open
        drawerOpen: false, //drawer open
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleNewDoc = this.handleNewDoc.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    // this.handleNewDoc = this.handleNewDoc.bind(this)
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleDrawerOpen() {
    this.setState({drawerOpen: true})
  }

  handleDrawerClose() {
    this.setState({drawerOpen: false})
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
      const appBar = {
          display: 'flex',
          alignItems: 'center',
      }
      return (
          <div>
              <MuiThemeProvider>
                  <div>
                  <AppBar
                      style={appBar}
                      title="Home"
                      onLeftIconButtonClick={this.handleDrawerOpen}
                      >
                      <div>
                        <RaisedButton label="Create a new Document" primary={true} onClick={this.handleOpen} />
                        <FlatButton label="Create a new Document" primary={true} style={{backgroundColor: '#fff'}} onClick={this.handleOpen} />
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
                  </AppBar>
                  <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
                    <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
                  </Drawer>
                  </div>
              </MuiThemeProvider>
          </div>
      );
  };
}

export default withRouter(Home);
