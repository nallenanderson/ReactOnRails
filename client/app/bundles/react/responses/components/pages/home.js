import React, { Component } from 'react';
import { Link } from 'react-router';

import { getResponse } from '../../libs/helpers';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: []
    };
  }

  componentDidMount() {
    getResponse('surveys').then(surveys => {
      this.setState({ surveys });
    });
  }

  render() {
    return(
      <div>
        <h1>Great Home</h1>
        {
          this.state.surveys.map(item => {
            return <Link to={`/survey/${item.id}`} key={item.id}>
              <span>{item.name}</span>
            </Link>
          })
        }
      </div>

    );
  }
}
