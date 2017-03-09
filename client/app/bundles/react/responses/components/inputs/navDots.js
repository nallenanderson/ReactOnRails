import React, { Component } from 'react';

// import '../../assets/dots.css'

export default class NavDots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    const list = [];
    let i = 0;
    for (i; i < this.props.totalScreens; i++) {
      const current = i === this.props.activeQuestion ? true : false;
      const obj = {
        id: i,
        current
      };
      list.push(obj);
    }

    this.setState({ list });
  }

  render() {
    return(
      <div className="options-nav nav-dot">
        <ul id="nav-progress">
          {
            this.state.list.map(item => {
              return <li key={item.id} className={item.current ? 'current' : ''}>
                <span>{item.id}</span>
              </li>
            })
          }
        </ul>
      </div>
    );
  }
}

NavDots.defaultProps = {
  totalScreens: 8,
  activeQuestion: 3
}
