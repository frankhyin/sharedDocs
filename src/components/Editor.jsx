import React from 'react';
import { Editor, EditorState, RichUtils, StyleButton } from 'draft-js';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import InlineEdit from 'react-edit-inline';
import createStyles from 'draft-js-custom-styles';
const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color'], 'PREFIX')

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      textAlignment: 'left',
      title: 'Untitled',
    };
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    this.titleChange = this.titleChange.bind(this)
  }

  titleChange(input) {
    const newTitle = input[this.state.title]
    this.setState({title: newTitle})
  }

  // _toggleColor(color) {
  //   const {editorState} = this.state;
  //   const selection = editorState.getSelection();
  //
  //   const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
  //     return Modifier.removeInlineStyle(contentState, selection, color)
  //   }, editorState.getCurrentContent());
  //   let nextEditorState = EditorState.push(
  //     editorState,
  //     nextContentState,
  //     'change-inline-style'
  //   );
  //   const currentStyle = editorState.getCurrentInlineStyle();
  //   // Unset style override for current color.
  //   if (selection.isCollapsed()) {
  //     nextEditorState = currentStyle.reduce((state, color) => {
  //       return RichUtils.toggleInlineStyle(state, color);
  //     }, nextEditorState);
  //   }
  //   // If the color is being toggled on, apply it.
  //   if (!currentStyle.has(color)) {
  //     nextEditorState = RichUtils.toggleInlineStyle(
  //       nextEditorState,
  //       color
  //     );
  //   }
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

  bulletPoints() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'))
  }

  numberedList() {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'))
  }

  render() {
    return (
      <div>
        <h2 id='title'>
          <InlineEdit
            text={this.state.title}
            paramName={this.state.title}
            change={this.titleChange}
          />
        </h2>
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
          <DropdownButton
            bsSize="xs"
            title="Font Size"
            className="dropdown-btn"
            id="font-size"
          >
            {fontSizes.map((size) => {
              return <MenuItem
                  eventKey={size}
                >
                  {size}
                </MenuItem>
            })}
          </DropdownButton>
          <DropdownButton
            bsSize="xs"
            title="Font Color"
            className="dropdown-btn"
            id="font-color"
          >
            {colors.map((color) => {
              return <MenuItem eventKey={color.style}>{color.label}</MenuItem>
            })}
          </DropdownButton>
          <button
            onMouseDown={ () => {this.bulletPoints()} }
            className="toolbar-btn">
            <strong>*</strong>
          </button>
          <button
            onMouseDown={ () => {this.numberedList()} }
            className="toolbar-btn">
            <strong>1</strong>
          </button>
        </div>
        {/* <ColorControls
          editorState={this.state.editorState}
          onToggle={this.toggleColor}
        /> */}
        <Editor
          customStyleMap={colorStyleMap}
          editorState={this.state.editorState}
          onChange={this.onChange}
          textAlignment={this.state.textAlignment}
        />
      </div>
    );
  }
}

// const ColorControls = (props) => {
//   const currentStyle = props.editorState.getCurrentInlineStyle();
//   return (
//     <div style={styles.controls}>
//       {COLORS.map(type =>
//         <StyleButton
//           active={currentStyle.has(type.style)}
//           label={type.label}
//           onToggle={props.onToggle}
//           style={type.style}
//         />
//       )}
//     </div>
//   );
// };

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72];

const colors = [
  {label: 'Black', style: 'black'},
  {label: 'White', style: 'white'},
  {label: 'Gray', style: 'gray'},
  {label: 'Red', style: 'red'},
  {label: 'Orange', style: 'orange'},
  {label: 'Yellow', style: 'yellow'},
  {label: 'Green', style: 'green'},
  {label: 'Blue', style: 'blue'},
  {label: 'Indigo', style: 'indigo'},
  {label: 'Violet', style: 'violet'},
];

const colorStyleMap = {
  black: {
    color: 'rgba(0, 0, 0, 1.0)',
  },
  white: {
    color: 'rgba(255, 255, 255, 1.0)',
  },
  gray: {
    color: 'rgba(128, 128, 128, 1.0)',
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
