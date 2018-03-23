import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
// import Divider from 'material-ui/Divider';
// import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router';

const jwt = require('jsonwebtoken');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        titleInput: 'Untitled',
        open: false, //dialogue open
        drawerOpen: false, //drawer open
        documents: []
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleNewDoc = this.handleNewDoc.bind(this)
    this.handleDocumentOpen = this.handleDocumentOpen.bind(this)
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

  handleDocumentOpen(docId){
    this.props.history.push({
      pathname: '/editor',
      state: {docId}
    });
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
          this.setState({
            documents: result.documents
          });
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
      const style = {
          marginLeft: 20,
      };
      return (
          <div>
              <MuiThemeProvider>
                  <div>
                  <AppBar
                      style={appBar}
                      title={`Welcome, ${global.displayName}.`}
                      onLeftIconButtonClick={this.handleDrawerOpen}
                      >
                      <div>
                        <IconButton tooltip="New Document"
                            label="Dialog"
                            onClick={this.handleOpen}
                            >
                          <ContentAdd color='#fff' />
                        </IconButton>
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
                      </div>
                  </AppBar>
                  <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
                    <MenuItem onClick={this.handleLogOut}>Log Out</MenuItem>
                  </Drawer>
                  {/* <Card>
                    <CardHeader title="Title" subtitle="By Author"/>
                    <CardActions>
                      <FlatButton label="Open" />
                      <FlatButton label="Delete" />
                    </CardActions>
                  </Card> */}

                  {this.state.documents.map((document) => <Card>
                      <CardHeader title={document.title}/>
                      <CardActions>
                        <FlatButton label="Open" onClick={() => this.handleDocumentOpen(document._id)}/>
                        <FlatButton label="Delete" />
                      </CardActions>
                    </Card>
                  )}

                  {console.log(this.state.documents)}


                  </div>
              </MuiThemeProvider>
          </div>
      );
  };
}

export default withRouter(Home);
