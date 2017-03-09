import React, { Component } from 'react';

// import '../../assets/backButton.css';

export default class BackButton extends Component {
  constructor() {
    super();
    this.goBack = this.goBack.bind(this);
  }

  goBack(e) {
    e.stopPropagation();
    this.props.updateActive(-1);
  }

  render() {
    const selected = this.props.optionSelected ? "arrow enter" : "arrow enter muted";
    return(
      <span className={selected} onClick={this.goBack}>←</span>
    );
  }
}

BackButton.propTypes = {
	optionSelected: React.PropTypes.bool.isRequired,
	updateActive: React.PropTypes.func.isRequired
}

BackButton.defaultProps = {
	optionSelected: false
}
