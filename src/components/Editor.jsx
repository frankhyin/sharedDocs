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
          <AppBar title="My AppBar" id="my-appbar">
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
// const { styles, customStyleFn, exporter } = createStyles(['font-size', 'color'], 'PREFIX')
// import { OrderedSet } from 'immutable';
//
// class TextEditor extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     editorState: EditorState.createEmpty(),
  //     textAlignment: 'left',
  //     title: 'Untitled',
  //     fontSize: 14,
  //   };
  //   this.onChange = (editorState) => {
  //     this.setState({ editorState });
  //   };
  //   this.titleChange = this.titleChange.bind(this)
  //   this.toggleColor = (toggledColor) => this._toggleColor(toggledColor);
  //   this.save.bind(this);
  // }
  //
  //
  // titleChange(input) {
  //   const newTitle = input[this.state.title]
  //   this.setState({title: newTitle})
  // }
  //
  // _onBoldClick(e) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  // }
  //
  // _onItalicsClick(e) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  // }
  //
  // _onUnderlineClick(e) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  // }
  //
  // _onColorClick(e, colorLabel) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, colorLabel));
  //   window.EditorState = EditorState
  //   window.OrderedSet = OrderedSet
  //   // debugger;
  //   const newState = RichUtils.toggleInlineStyle(this.state.editorState, colorLabel);
  //   this.setState({
  //     editorState: EditorState.setInlineStyleOverride(newState, newState.getCurrentInlineStyle().add(colorLabel))
  //   }, () => {
  //     window.state = this.state;
  //   })
  // }
  //
  // _onSizeClick(e, size) {
  //   e.preventDefault();
  //   this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, size));
  //   this.setState({
  //     editorState: EditorState.setInlineStyleOverride(this.state.editorState, this.state.editorState.getCurrentInlineStyle().add(size))
  //   }, () => {
  //     window.state = this.state;
  //   })
  // }
  //
  // _onLeftAlignClick(e) {
  //   e.preventDefault();
  //   this.setState({textAlignment: "left"})
  // }
  //
  // _onRightAlignClick(e) {
  //   e.preventDefault();
  //   this.setState({textAlignment: "right"})
  // }
  //
  // _onCenterAlignClick(e) {
  //   e.preventDefault();
  //   this.setState({textAlignment: "center"})
  // }
  //
  // bulletPoints() {
  //   this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'))
  // }
  //
  // numberedList() {
  //   this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'))
  // }
  //
  // save(e) {
  //   e.preventDefault();
  //   const contentState = convertToRaw(this.state.editorState.getCurrentContent());
  //   console.log(this.props.id)
  //   console.log(this.state.title)
  //   console.log(contentState)
  //   event.preventDefault();
  //   fetch('http://localhost:3000/document/:id', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //         id: this.props.id,
  //         title: this.state.title,
  //         content: contentState,
  //     })
  //   })
  //   .then(res => res.json())
  //   .then((result) => {
  //       console.log(result);
  //       alert("Success!");
  //   })
  //   .catch((error) => {
//         console.log("Error: ", error)
//     })
//   }
//
//   render() {
//     return (
//       <div style={{textAlign: 'center'}}>
//         <h2 id='title'>
//           <InlineEdit
//             text={this.state.title}
//             paramName={this.state.title}
//             change={this.titleChange}
//           />
//         </h2>
//         <div id='toolbar'>
//           <button
//             onMouseDown={ (e) => {this._onBoldClick(e)} }
//             className="toolbar-btn">
//             <b><strong>B</strong></b>
//           </button>
//           <button
//             onMouseDown={ (e) => {this._onItalicsClick(e)} }
//             className="toolbar-btn">
//             <b><i>I</i></b>
//           </button>
//           <button
//             onMouseDown={ (e) => {this._onUnderlineClick(e)} }
//             className="toolbar-btn">
//             <b><u>U</u></b>
//           </button>
//           <button
//             onMouseDown={ (e) => {this._onLeftAlignClick(e)} }
//             className="toolbar-btn">
//             <strong>L</strong>
//           </button>
//           <button
//             onMouseDown={ (e) => {this._onCenterAlignClick(e)} }
//             className="toolbar-btn">
//             <strong>C</strong>
//           </button>
//           <button
//             onMouseDown={ (e) => {this._onRightAlignClick(e)} }
//             className="toolbar-btn">
//             <strong>R</strong>
//           </button>
//           <DropdownButton
//             bsSize="xs"
//             title="Font Size"
//             className="dropdown-btn"
//             id="font-size"
//             onMouseDown={ (e) => e.preventDefault() }>
//             {fontSizes.map((size) => {
//               return <MenuItem
//                 eventKey={size}
//                 onMouseDown={ (e) => this._onSizeClick(e, size) }>
//                 {size}
//               </MenuItem>
//             })}
//           </DropdownButton>
//           <DropdownButton
//             bsSize="xs"
//             title="Font Color"
//             className="dropdown-btn"
//             id="font-color"
//             onMouseDown={ (e) => e.preventDefault() }>
//             {colors.map((color) => {
//               return <MenuItem
//                 eventKey={color.style}
//                 onClick={ (e) => this._onColorClick(e, color.label) }>
//                 {color.label}
//               </MenuItem>
//             })}
//           </DropdownButton>
//           <button
//             onMouseDown={ () => {this.bulletPoints()} }
//             className="toolbar-btn">
//             <strong>*</strong>
//           </button>
//           <button
//             onMouseDown={ () => {this.numberedList()} }
//             className="toolbar-btn">
//             <strong>1</strong>
//           </button>
//         </div>
//         <Editor
//           customStyleMap={Object.assign({}, {
//             colorStyleMap,
//             fontSizeStyleMap,
//           })}
//           editorState={this.state.editorState}
//           onChange={this.onChange}
//           textAlignment={this.state.textAlignment}
//         />
//         <Button bsStyle='info' id='save' onClick={ (e) => this.save(e) }>
//           Save
//         </Button>
//       </div>
//     );
//   }
// }

// const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 48, 72];
//
// const fontSizeStyleMap = {
//   8: {fontSize: 8},
//   9: {fontSize: 9},
//   10: {fontSize: 10},
//   11: {fontSize: 11},
//   12: {fontSize: 12},
//   14: {fontSize: 14},
//   16: {fontSize: 16},
//   18: {fontSize: 18},
//   20: {fontSize: 20},
//   22: {fontSize: 22},
//   24: {fontSize: 24},
//   28: {fontSize: 28},
//   32: {fontSize: 32},
//   36: {fontSize: 36},
//   48: {fontSize: 48},
//   72: {fontSize: 72},
// };
//
// const colors = [
//   {label: 'Black', style: 'black'},
//   {label: 'White', style: 'white'},
//   {label: 'Gray', style: 'gray'},
//   {label: 'Red', style: 'red'},
//   {label: 'Orange', style: 'orange'},
//   {label: 'Yellow', style: 'yellow'},
//   {label: 'Green', style: 'green'},
//   {label: 'Blue', style: 'blue'},
//   {label: 'Indigo', style: 'indigo'},
//   {label: 'Violet', style: 'violet'},
// ];
//
// const colorStyleMap = {
//   Black: {color: 'rgba(0, 0, 0, 1.0)',},
//   White: {color: 'rgba(255, 255, 255, 1.0)',},
//   Gray: {color: 'rgba(127, 127, 127, 1.0)',},
//   Red: {color: 'rgba(255, 0, 0, 1.0)',},
//   Orange: {color: 'rgba(255, 127, 0, 1.0)',},
//   Yellow: {color: 'rgba(180, 180, 0, 1.0)',},
//   Green: {color: 'rgba(0, 180, 0, 1.0)',},
//   Blue: {color: 'rgba(0, 0, 255, 1.0)',},
//   Indigo: {color: 'rgba(75, 0, 130, 1.0)',},
//   Violet: {color: 'rgba(127, 0, 255, 1.0)',},
//
// };
