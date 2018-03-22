import React from 'react';
import { findDOMNode } from 'react-dom';
import { EditorState, convertToRaw } from 'draft-js';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import { Editor } from 'react-draft-wysiwyg';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveIcon from 'material-ui/svg-icons/content/save';
import Dialog from 'material-ui/Dialog';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: 'Untitled',
      open: false,
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  handleOpen = () => {
    debugger
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  titleChange = (input) => {
    debugger;
    const newTitle = input[this.state.title]
    this.setState({title: newTitle})
  }

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
          id: this.props.id,
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
          this.setState({
            title: this.h1.innerText
          })
        } else if (e.key === 'Escape') {
          e.preventDefault();
          this.h1.setAttribute('contenteditable', false);
          this.h1.innerText = this.editingh1;
          this.editingh1 = '';
        }
      }
    })
    window.addEventListener('click', e => {
      if (!this.h1.contains(e.target)) {
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
            <AppBar title={this.state.title} id="my-appbar"  ref="AppBar">
              <IconButton tooltip="Save">
                <SaveIcon color='#fff' />
              </IconButton>
            </AppBar>
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
