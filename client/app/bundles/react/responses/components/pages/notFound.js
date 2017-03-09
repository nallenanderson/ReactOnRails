import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="outer">
        <div className="main-beav">
            <img src={this.props.beaver} />
            <h1>404</h1>
            <p>
              A fucking beaver probably stole this page.
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
