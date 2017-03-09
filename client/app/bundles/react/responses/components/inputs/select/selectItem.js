import React, { Component } from 'react';

export default class SelectItem extends Component {
  render() {
    return(
      <button
        className={this.props.selected ? 'btn selected' : 'btn'}
        onClick={() => this.props.selectItem(this.props)}
      >
        <i className="zmdi zmdi-check"></i>
        <span className="option-text">{this.props.text}</span>
      </button>
    );
  }
}
