import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        // title: 'Untitled',
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    // this.handleTitleChange = this.handleTitleChange.bind(this)
    // this.handleNewDoc = this.handleNewDoc.bind(this)
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleLogOut() {
      fetch('http://localhost:3000/logout', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Cookie': window.localStorage.getItem('cookie'),
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

  // handleTitleChange(event){
  //   this.setState({
  //     titleInput: event.target.value
  //   })
  // }
  //
  // handleNewDoc() {
  //     fetch('http://localhost:3000/home', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //           title: this.state.titleInput,
  //       })
  //     })
  //     .then(res => res.json())
  //     .then((result) => {
  //         this.props.history.push('/editor');
  //         alert("Success!")
  //     })
  //     .catch((error) => {
  //         console.log("Error: ", error)
  //     })
  // }

  render() {
      const actions = [
          <FlatButton
            label="Cancel"
            onClick={this.handleClose}
          />,
          <RaisedButton
            label="Submit"
            primary={true}
            onClick={this.handleClose}
          />,
        ];
      const center = {
          textAlign: 'center',
      }
      return (
          <div>
              <MuiThemeProvider>
                  <div>
                  <AppBar title="Home"/>
                      <div>
                        <RaisedButton label="Create a new Document" primary={true} onClick={this.handleOpen} />
                        {/* <form onSubmit={(e) => this.handleNewDoc(e)}> */}
                            <Dialog
                              title="Create a new Document"
                              actions={actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}
                            >
                              <TextField
                                   hintText="Give your Document a title"
                                   floatingLabelText="Document"
                                   // onChange={(e) => this.handleTitleChange(e)}
                                   // value={this.state.titleInput}
                                   // errorText={this.state.emailError}
                               />
                            </Dialog>
                        {/* </form> */}
                        <RaisedButton onClick={this.handleLogOut} label="Log Out" />
                      </div>
                  </div>
              </MuiThemeProvider>
          </div>
      );
  };
}

export default withRouter(Home);
