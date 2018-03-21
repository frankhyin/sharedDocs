import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import { Editor } from 'react-draft-wysiwyg';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import SaveIcon from 'material-ui/svg-icons/content/save';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: 'Untitled',
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  titleChange = input => {
    debugger;
    const newTitle = input[this.state.title]
    this.setState({title: newTitle})
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <AppBar title="My AppBar" id="my-appbar" onTitleClick={}>
            <IconButton tooltip="Save">
              <SaveIcon color='#fff' />
            </IconButton>
          </AppBar>
        </MuiThemeProvider>
          {/* <InlineEdit
            text={this.state.title}
            paramName={this.state.title}
            change={this.titleChange}
          /> */}
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="home-toolbar"
          wrapperClassName="home-wrapper"
          editorClassName="home-editor"
          onEditorStateChange={this.onChange}
          // uploadCallback={uploadImageCallBack}
        />
      </div>
    );
  }
}

export default TextEditor;
