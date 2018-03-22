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
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
      const actions = [
          <FlatButton
            label="Cancel"
            onClick={this.handleClose}
          />,
          <FlatButton
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
                               // onChange={(e) => this.handleEmailChange(e)}
                               // value={this.state.emailInput}
                               // errorText={this.state.emailError}
                           />
                        </Dialog>
                      </div>
                  </div>
              </MuiThemeProvider>
          </div>
      );
  };
}

export default withRouter(Home);
