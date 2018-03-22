import React from 'react';
import { findDOMNode } from 'react-dom';
import { EditorState, convertToRaw } from 'draft-js';
import InlineEdit from 'react-edit-inline';
import { Editor } from 'react-draft-wysiwyg';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';


class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: 'Untitled',
      drawerOpen: false,
      snackbarOpen: false,
      dialogOpen: false,
      error: '',
      email: '',
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  handleDrawerOpen = () => {
    this.setState({drawerOpen: true})
  }

  handleDrawerClose = () => {
    this.setState({drawerOpen: false})
  }

  handleDialogOpen = () => {
    this.setState({dialogOpen: true})
  }

  handleDialogClose = () => {
    this.setState({dialogOpen: false})
  }

  handleSnackbarOpen = () => {
    this.setState({snackbarOpen: true})
  }

  handleSnackbarClose = () => {
    this.setState({snackbarOpen: false})
  }

  handleRequestClose = () => {
    this.setState({snackbarOpen: false});
  };

  // This will be used to add collaborators
  // share = () => {
  //   this.setState()
  // }

  save(e) {
    e.preventDefault();
    const contentState = convertToRaw(this.state.editorState.getCurrentContent());
    console.log(this.props.id)
    console.log(this.state.title)
    console.log(contentState)
    event.preventDefault();
    fetch('http://localhost:3000/document/:id', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: this.state.title,
          content: contentState,
      })
    })
    .then(res => res.json())
    .then((result) => {
        console.log(result);
        alert("Success!");
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
  }

  componentDidMount() {
    this.h1 = findDOMNode(this.refs.AppBar).children[1];
    this.h1.addEventListener('click', e => {
      if (!this.editingh1) {
        this.h1.setAttribute('contenteditable', true);
        this.h1.focus();
        this.editingh1 = this.state.title;
      }
    })
    window.addEventListener('keydown', e => {
      if (this.editingh1) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.editingh1 = '';
          this.h1.setAttribute('contenteditable', false);
          const prev = this.state.title;
          this.setState({
            title: this.h1.innerText,
          })
          this.handleSnackbarOpen();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.h1.setAttribute('contenteditable', false);
          this.h1.innerText = this.editingh1;
          this.editingh1 = '';
        }
      }
    })
    window.addEventListener('click', e => {
      if (this.editingh1 && !this.h1.contains(e.target)) {
        e.preventDefault();
        this.h1.setAttribute('contenteditable', false);
        this.h1.innerText = this.editingh1;
        this.editingh1 = '';
      }
    })
  }

  render() {
    const oldTitle = this.state.prevTitle;
    const newTitle = this.state.title;
    const collaborators = [
      <MenuItem disabled={true} style={{color: 'black'}}>A</MenuItem>,
      <MenuItem disabled={true} style={{color: 'black'}}>B</MenuItem>,
      <MenuItem disabled={true} style={{color: 'black'}}>C</MenuItem>,
      <MenuItem>Close</MenuItem>,
    ]
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar
              title={this.state.title}
              id="my-appbar"
              ref="AppBar"
              onLeftIconButtonClick={this.handleDrawerOpen}
            >
              <IconButton tooltip="Save" onClick={ (e) => this.save(e) }>
                <SaveIcon color='#fff' />
              </IconButton>
            </AppBar>
            <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
              <MenuItem style={{color: '#fff', backgroundColor: "rgb(0, 188, 212)"}}>Home</MenuItem>
              <MenuItem onClick={this.handleDialogOpen}>Share</MenuItem>
              <MenuItem menuItems={collaborators}>Collaborators</MenuItem>
              <MenuItem onClick={this.handleDrawerClose}>Close</MenuItem>
            </Drawer>
            <Dialog
              title="Share"
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogClose}
            >
              <TextField
                hintText="Email"
                floatingLabelText="Add new email"
                onChange={ (email) => this.setState({email}) }
                errorText={this.state.error}
              />
              <FlatButton label="Add" type="submit" primary={true} onClick={this.addEmail} />
            </Dialog>
            <Snackbar
              open={this.state.snackbarOpen}
              message="Title changed!"
              autoHideDuration={3000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
        </MuiThemeProvider>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onChange}
        />
      </div>
    );
  }
}

export default TextEditor;
