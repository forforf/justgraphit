
import React, { Component } from 'react';
import Edit from 'EditorView/Edit';

class Editor extends Component {

  constructor(props) {
    super(props);
    console.log('EditorView props', this.props);
  }

  render() {
    return (
        <Edit storage={this.props.storage}/>
    );
  }
}


export default Editor;