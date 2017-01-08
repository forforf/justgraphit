
import React, { Component } from 'react';
import Edit from 'EditorView/Edit';
import './Editor.css';

class Editor extends Component {
  
  render() {
    return (
        <Edit storage={this.props.storage}/>
    );
  }
}


export default Editor;