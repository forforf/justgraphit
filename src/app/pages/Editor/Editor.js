
import React, { Component } from 'react';

class Editor extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(graphName) {
  }


  render() {
    return (
        <div className="Editor">
          <h3>Editor</h3>
          <div>
            Edit {this.props.storage.getLastKeyValue().key}
          </div>
        </div>
    );
  }
}


export default Editor;