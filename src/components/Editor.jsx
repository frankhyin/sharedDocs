import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { RIEInput } from 'riek';
// import createStyles from 'draft-js-custom-styles';

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      textAlignment: "left",
      title: 'New Document',
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    // this.toggleColor = color => this._toggleColor.(color);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'Handled';
    }
    return 'Not handled';
  }

  // _toggleColor(color) {
  //   const state = this.state
  //   const selection = state.getSelection();
  //
  //   const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
  //     return Modifier.removeInlineStyle(contentState, selection, color)
  //   }, state.getCurrentContent());
  //
  //   let nextEditorState = EditorState.push(state, nextContentState, 'change-inline-style');
  //   const currentStyle = editorState.getCurrentInlineStyle();
  //
  //   if (selection.isCollapsed()) {
  //     nextEditorState = currentStyle.reduce((state, color) => {
  //       return RichUtils.toggleInlineStyle(state, color);
  //     }, nextEditorState);
  //   }
  //
  //   if (!currentStyle.has(color)) {
  //     nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, color);
  //   }
  //
  //   this.onChange(nextEditorState);
  // }

  _onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicsClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  _onUnderlineClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  _onLeftAlignClick(e) {
    e.preventDefault();
    this.setState({textAlignment: "left"})
  }

  _onRightAlignClick(e) {
    e.preventDefault();
    this.setState({textAlignment: "right"})
  }

  _onCenterAlignClick(e) {
    e.preventDefault();
    this.setState({textAlignment: "center"})
  }

  render() {
    return (
      <div>
        <h2
          id='title'
          // onMouseDown={ (e) => {this._editTitle(e)} }
          >{this.state.title}</h2>
        <div id='toolbar'>
          <button
            onMouseDown={ (e) => {this._onBoldClick(e)} }
            className="toolbar-btn">
            <b><strong>B</strong></b>
          </button>
          <button
            onMouseDown={ (e) => {this._onItalicsClick(e)} }
            className="toolbar-btn">
            <b><i>I</i></b>
          </button>
          <button
            onMouseDown={ (e) => {this._onUnderlineClick(e)} }
            className="toolbar-btn">
            <b><u>U</u></b>
          </button>
          <button
            onMouseDown={ (e) => {this._onLeftAlignClick(e)} }
            className="toolbar-btn">
            <strong>L</strong>
          </button>
          <button
            onMouseDown={ (e) => {this._onCenterAlignClick(e)} }
            className="toolbar-btn">
            <strong>C</strong>
          </button>
          <button
            onMouseDown={ (e) => {this._onRightAlignClick(e)} }
            className="toolbar-btn">
            <strong>R</strong>
          </button>
        </div>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          textAlignment={this.state.textAlignment}
        />
      </div>
    );
  }
}

const colorStyleMap = {
  black: {
    color: 'rgba(0, 0, 0, 1.0)'
  },
  white: {
    color: 'rgba(255, 255, 255, 1.0)'
  },
  gray: {
    color: 'rgba(128, 128, 128, 1.0)'
  },
  red: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  orange: {
    color: 'rgba(255, 127, 0, 1.0)',
  },
  yellow: {
    color: 'rgba(180, 180, 0, 1.0)',
  },
  green: {
    color: 'rgba(0, 180, 0, 1.0)',
  },
  blue: {
    color: 'rgba(0, 0, 255, 1.0)',
  },
  indigo: {
    color: 'rgba(75, 0, 130, 1.0)',
  },
  violet: {
    color: 'rgba(127, 0, 255, 1.0)',
  },
};

export default TextEditor;
