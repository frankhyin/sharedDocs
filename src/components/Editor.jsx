import React from 'react';
import { findDOMNode } from 'react-dom';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import InlineEdit from 'react-edit-inline';
import { Editor } from 'react-draft-wysiwyg';
import { CompactPicker } from 'react-color';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';

const styles = {
  alternateFormat: {
    color: '#fff',
    backgroundColor: 'rgb(0, 188, 212)',
  }
}

const checkEmail = (email) => {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return filter.test(email) ? true : false;
}

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      id: this.props.location.state.docId,
      title: '',
      author: 'N/A',
      drawerOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      dialogOpen: false,
      error: '',
      email: '',
      emailsToAdd: [],
      collaborators: [''],
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

  addEmail = () => {
    if (checkEmail(this.state.email)) {
      const emails = [...this.state.emailsToAdd, this.state.email];
      this.setState({
        email: '',
        emailsToAdd: emails,
        error: ''
      }, () => {})
    } else {
      this.setState({error: 'Invalid email'})
    }
    this.forceUpdate()
  }

  addCollaborators = () => {
    const newCollaborators = [...this.state.collaborators, this.state.emailsToAdd];
    this.setState({
      collaborators: newCollaborators,
      snackbarMessage: 'Added users',
      emailsToAdd: []
    }, () => {})
    this.handleDialogClose();
    this.handleDrawerClose();
    this.forceUpdate();
    this.handleSnackbarOpen();
  }

  remove = (email) => {
    const newEmails = this.state.emailsToAdd.filter(e => e !== email)
    this.setState({emailsToAdd: newEmails}, () => {})
    this.forceUpdate()
  }

  home = () => {
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
        this.props.history.push('/home');
      }
    })
    .catch((error) => {
      console.log("Error: ", error)
    })
  }

  save = (e) => {
    e.preventDefault();
    const contentState = convertToRaw(this.state.editorState.getCurrentContent());
    const content = JSON.stringify(contentState);
    event.preventDefault();
    fetch(`http://localhost:3000/doc/${this.state.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': global.token
      },
      body: JSON.stringify({
          title: this.state.title,
          content: content,
      })
    })
    .then(res => res.json())
    .then((result) => {
        this.setState({snackbarMessage: 'Saved!'}, () => this.handleSnackbarOpen())
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
  }

  handleLogOut = () => {
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

  componentDidMount() {
    // const contentState = convertToRaw(this.state.editorState.getCurrentContent());
    // const content = JSON.stringify(contentState);
    fetch(`http://localhost:3000/doc/${this.state.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': global.token
      },
    })
    .then(res => res.json())
    .then((result) => {
        let raw = result.doc.content ? JSON.parse(result.doc.content) : null;
        this.setState({
          title: result.doc.title,
          editorState: raw ? EditorState.createWithContent(convertFromRaw(raw)) : EditorState.createEmpty(),
          collaborators: result.doc.collaborators,
        })
    })
    .catch((error) => {
        console.log("Error: ", error)
    })
    this.h1 = findDOMNode(this.refs.AppBar).children[1];
    this.h1.addEventListener('click', e => {
      if (!this.isEditing) {
        this.h1.setAttribute('contenteditable', true);
        this.h1.focus();
        this.editingh1 = this.state.title;
        this.isEditing = true;
      }
    })
    window.addEventListener('keydown', e => {
      if (this.isEditing) {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.editingh1 = '';
          this.isEditing = false;
          this.h1.setAttribute('contenteditable', false);
          const prev = this.state.title;
          this.setState({
            title: this.h1.innerText,
            snackbarMessage: 'Title changed'
          }, () => {})
          this.handleSnackbarOpen();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.h1.setAttribute('contenteditable', false);
          this.h1.innerText = this.editingh1;
          this.editingh1 = '';
          this.isEditing = false;
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
              <IconButton tooltip="Save" onClick={ (e) => this.save(e) } style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <SaveIcon color='#fff' />
              </IconButton>
            </AppBar>
            <Drawer docked={false} width={200} open={this.state.drawerOpen} onRequestChange={ (drawerOpen) => this.setState({drawerOpen})}>
              <MenuItem style={styles.alternateFormat} onClick={this.home}>Home</MenuItem>
              <MenuItem onClick={this.handleDialogOpen}>Share</MenuItem>
              <MenuItem menuItems={this.state.collaborators.map(person => {
                return <MenuItem disabled={true} style={{color: 'black'}}>{person}</MenuItem>
              }).concat([<MenuItem>Close</MenuItem>])}>Collaborators</MenuItem>
              <MenuItem onClick={this.handleDrawerClose}>Close</MenuItem>
              <br />
              <MenuItem onClick={this.handleLogOut} style={{backgroundColor: '#f00', color: '#fff'}}>Logout</MenuItem>
            </Drawer>
            <Dialog
              title="Share"
              open={this.state.dialogOpen}
              onRequestClose={this.handleDialogClose}
              contentStyle={{width: '485px'}}
            >
              <List style={{width: '100%'}}>
                {this.state.emailsToAdd.map(email => <ListItem
                    primaryText={email}
                    disabled={true}
                    rightIconButton={
                      <IconButton tooltip="Clear" onClick={ () => this.remove(email) }>
                        <ContentClear color='#f00' />
                      </IconButton>
                    }
                  />
                )}
              </List>
              <TextField
                hintText="Email"
                floatingLabelText="Add new email"
                onChange={ (e) => this.setState({email: e.target.value}) }
                value={this.state.email}
                errorText={this.state.error}
              />
              <FlatButton label="Add" type="submit" primary={true} onClick={this.addEmail} />
              <FlatButton label="Submit" type="submit" onClick={this.addCollaborators} style={styles.alternateFormat} />
            </Dialog>
            <Snackbar
              open={this.state.snackbarOpen}
              message={this.state.snackbarMessage}
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
          toolbar={{
            colorPicker: {
              component: colorPicker,
              // icon: color
            },
            history: {options: []}
          }}
        />
      </div>
    );
  }
}



class colorPicker extends React.Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object,
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  expand = () => {
    const { color } = this.props.currentState;
    return (
      <div
        onClick={this.stopPropagation}
        style={{position: 'absolute', top: '100%', right: '0px', zIndex: 2}}
      >
        <CompactPicker color={color} onChangeComplete={this.onChange} />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div aria-haspopup="true" aria-expanded={expanded} aria-label="rdw-color-picker" className="rdw-colorpicker-wrapper">
        <div onClick={onExpandEvent} className="rdw-option-wrapper">
          <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjE1cHgiIGhlaWdodD0iMTVweCIgdmlld0JveD0iMCAwIDE1IDE1IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MC4zICgzMzgzOSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+Y29sb3I8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iY29sb3IiIGZpbGw9IiMwMDAwMDAiPgogICAgICAgICAgICA8ZyBpZD0iQ2FwYV8xIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJHcm91cCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE0LjQwNjM4NzEsMC41ODUyNTgwNjUgQzEzLjYyNjI5MDMsLTAuMTk0ODcwOTY4IDEyLjM2MTQ1MTYsLTAuMTk1MDk2Nzc0IDExLjU4MDgzODcsMC41ODUgTDExLjA0MTU4MDYsMS4xMjQyNTgwNiBDMTAuNzUxOTAzMiwwLjgzNDYxMjkwMyAxMC4yODI3MDk3LDAuODM0NjEyOTAzIDkuOTkzMDY0NTIsMS4xMjQyNTgwNiBDOS43MDMzNTQ4NCwxLjQxMzY3NzQyIDkuNzAzMzU0ODQsMS44ODMzODcxIDkuOTkzMDY0NTIsMi4xNzI4MDY0NSBMMTAuMTY3Nzc0MiwyLjM0NzYxMjkgTDQuMzQyMzU0ODQsOC4xNzM0NTE2MSBMNC4zNDE4Mzg3MSw4LjE3MzQ1MTYxIEwyLjMxOTc0MTk0LDEwLjE5NTc0MTkgQzIuMTU5MDMyMjYsMTAuMzU2NDUxNiAyLjA2NDI5MDMyLDEwLjU3MTQxOTQgMi4wNTQwOTY3NywxMC43OTg0NTE2IEwyLjA0OTI1ODA2LDEwLjkwNjMyMjYgTDIuMDQ5MjU4MDYsMTAuOTA3ODA2NSBMMS45Njc2Nzc0MiwxMi43MzY5Njc3IEMxLjk2NDMyMjU4LDEyLjgyMTkwMzIgMS45OTYxNjEyOSwxMi45MDQyMjU4IDIuMDU2MDMyMjYsMTIuOTY0MzIyNiBDMi4xMTI1MTYxMywxMy4wMjEwNjQ1IDIuMTg5NzQxOTQsMTMuMDUyNjQ1MiAyLjI2OTkwMzIzLDEzLjA1MjY0NTIgQzIuMjc0MjU4MDYsMTMuMDUyNjQ1MiAyLjI3ODU4MDY1LDEzLjA1MjY0NTIgMi4yODM0NTE2MSwxMy4wNTIzODcxIEwzLjI1MzI1ODA2LDEzLjAwOTQ1MTYgTDMuMjUzNzc0MTksMTMuMDA5NDUxNiBMMy44NDQ2Nzc0MiwxMi45ODMxNjEzIEw0LjExMywxMi45NzEzNTQ4IEM0LjQwOTg3MDk3LDEyLjk1ODA2NDUgNC42OTE4Mzg3MSwxMi44MzM5Njc3IDQuOTAyMzIyNTgsMTIuNjIzNzQxOSBMMTIuNjczMjI1OCw0Ljg1MzA2NDUyIEwxMi44MTg1ODA2LDQuOTk4Mzg3MSBDMTIuOTYzNDE5NCw1LjE0MzE2MTI5IDEzLjE1MzE2MTMsNS4yMTU1ODA2NSAxMy4zNDI4Mzg3LDUuMjE1NTgwNjUgQzEzLjUzMjU0ODQsNS4yMTU1ODA2NSAxMy43MjIzMjI2LDUuMTQzMTYxMjkgMTMuODY3MTI5LDQuOTk4Mzg3MSBDMTQuMTU2ODA2NSw0LjcwODkzNTQ4IDE0LjE1NjgwNjUsNC4yMzkyMjU4MSAxMy44NjcxMjksMy45NDk4Mzg3MSBMMTQuNDA2MzU0OCwzLjQxMDU0ODM5IEMxNS4xODY1MTYxLDIuNjMwNDUxNjEgMTUuMTg2NTE2MSwxLjM2NTYxMjkgMTQuNDA2Mzg3MSwwLjU4NTI1ODA2NSBMMTQuNDA2Mzg3MSwwLjU4NTI1ODA2NSBaIE04Ljc5NDgwNjQ1LDcuMzMzMjI1ODEgTDYuMDY1Nzc0MTksNy44NDgwNjQ1MiBMMTAuNTE3MzIyNiwzLjM5NjMyMjU4IEwxMS42MjQ4MDY1LDQuNTAzMjkwMzIgTDguNzk0ODA2NDUsNy4zMzMyMjU4MSBMOC43OTQ4MDY0NSw3LjMzMzIyNTgxIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yLjA4MDY0NTE2LDEzLjY3MzI5MDMgQzAuOTMxNzA5Njc3LDEzLjY3MzI5MDMgMCwxMy45NjgyOTAzIDAsMTQuMzMyNDgzOSBDMCwxNC42OTY0ODM5IDAuOTMxNzA5Njc3LDE0Ljk5MTQ1MTYgMi4wODA2NDUxNiwxNC45OTE0NTE2IEMzLjIyOTU4MDY1LDE0Ljk5MTQ1MTYgNC4xNjA4Mzg3MSwxNC42OTY1MTYxIDQuMTYwODM4NzEsMTQuMzMyNDgzOSBDNC4xNjA4Mzg3MSwxMy45NjgyNTgxIDMuMjI5NTgwNjUsMTMuNjczMjkwMyAyLjA4MDY0NTE2LDEzLjY3MzI5MDMgTDIuMDgwNjQ1MTYsMTMuNjczMjkwMyBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" />
        </div>
        {expanded ? this.expand() : undefined}
      </div>
    );
  }
}

export default TextEditor;
