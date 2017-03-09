import React, { Component } from 'react';

export default class ScaleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovering: false,
      selected: false,
      id: props.id
    };

    this.setStar = this.setStar.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.unhandleHover = this.unhandleHover.bind(this);
  }

  setStar() {
    if(this.state.selected) {
      this.props.selectItem(this.props, this.state.selected);
    } else {
      this.setState({ selected: true });
      setTimeout(() => this.props.selectItem(this.props, this.state.selected), 100);
    }
  }

  handleHover() {
    this.setState({ hovering: true });
    this.props.hoverSiblings(this.state);
  }

  unhandleHover() {
    this.setState({ hovering: false });
    this.props.unhoverSiblings(this.state);
  }

  render() {
    let icon;

    if(this.state.hovering || this.state.selected) {
      icon = `zmdi zmdi-${this.props.icon}`
    } else {
      icon = `zmdi zmdi-${this.props.icon}-outline`
    }

    return(
      <span onMouseOver={this.handleHover} onMouseOut={this.unhandleHover} onClick={this.setStar}>
        <i className={icon}></i>
      </span>
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.selected,
      hovering: nextProps.hovering
    });
  }
}

ScaleItem.propTypes = {
	hoverSiblings: React.PropTypes.func.isRequired,
	unhoverSiblings: React.PropTypes.func.isRequired,
  selectItem: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired
}
