import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import { default as TouchBackend } from 'react-dnd-touch-backend';

import Container from './container';
import BackButton from '../backButton';
import NavDots from '../navDots';

class Drag extends Component {
  constructor() {
    super();
    this.state = {
      positions: [],
      optionSelected: false
    }

    this.getPositions = this.getPositions.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.next = this.next.bind(this);
  }

  getPositions(positions) {
    positions.forEach((position, index) => {
      return position.ranking = index + 1;
    });

    this.setState({ positions });
  }

  next() {
    const positions = this.state.positions.map(option => option.id);
    const item = {
      id: this.props.id,
      positions,
      type: this.props.type
    };

    this.props.updateActive(1);
    this.props.sendState(item);
  }

  handleEnter(event) {
    if(this.state.optionSelected && event.key === 'Enter') {
      this.next();
    }
  }

  render() {
    return(
      <div className="step" onKeyPress={this.handleEnter}>
        <div className="options-top">
          <h2>{this.props.text}</h2>
          <p>{this.props.subText}</p>
        </div>
        <div className="options-body">
          <div className="options-choices" onMouseDown={() => this.setState({ optionSelected: true })}>
            <Container id="dCt9iaRT" list={this.props.options} getPositions={this.getPositions} />
          </div>
        </div>
        {
          this.props.required ?
          <div className="options-footer">
            <button className="btn big-btn" disabled={!this.state.optionSelected} onClick={this.next}>
              <BackButton optionSelected={this.state.optionSelected} updateActive={this.props.updateActive} />
              <span className={!this.state.optionSelected ? 'text muted' : 'text'}>Next</span>
            </button>
            <NavDots activeQuestion={this.props.activeQuestion} totalScreens={this.props.totalScreens} />
          </div> :
          <div className="options-footer">
            <button className="btn big-btn" onClick={this.next}>
              <BackButton optionSelected={this.state.optionSelected} updateActive={this.props.updateActive} />
              <span className="text">Next</span>
              <NavDots activeQuestion={this.props.activeQuestion} totalScreens={this.props.totalScreens} />
            </button>
          </div>
        }
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Drag);
// export default DragDropContext(TouchBackend)(Drag);
