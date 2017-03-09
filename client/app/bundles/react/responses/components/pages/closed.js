import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Closed extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
      <div className="outer">
        <div className="main-beav">
            <img src={this.props.beaver} />
            <h2>It's Gone</h2>
            <p>
              This form is no longer available.
            </p>
            <div className="login">
              <a href={this.props.home} className="btn">
                Back Home
              </a>
            </div>
        </div>
      </div>
    );
  }
}
