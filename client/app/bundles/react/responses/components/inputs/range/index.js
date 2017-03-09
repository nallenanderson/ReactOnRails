import React, { Component } from 'react';
import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';

import BackButton from '../backButton';
import NavDots from '../navDots';

export default class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: false,
      value: props.begValue
    };

    this.next = this.next.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  next() {
    const item = {
      id: this.props.id,
      value: this.state.value,
      type: this.props.type
    };

    this.props.updateActive(1);
    this.props.sendState(item);
  }

  handleEnter(event) {
    if(this.state.optionSelected && event.key === 'Enter') {
      return this.next();
    }

    if(event.key === 'ArrowRight') {
      const value = this.state.value + this.props.step;
      this.setState({ value, optionSelected: true })
    }

    if(event.key === 'ArrowLeft') {
      const value = this.state.value - this.props.step;
      this.setState({ value, optionSelected: true })
    }
  }

  componentDidMount() {
    const node = document.querySelector('.step');
    const addEvent = node.addEventListener || node.attachEvent;
    addEvent("keydown", this.handleEnter, false);
  }

  componentWillUnmount() {
    const node = document.querySelector('.step');
    const removeEvent = node.removeEventListener || node.detachEvent;
    removeEvent("keydown", this.handleEnter);
  }

  render() {
    return(
      <div className="step">
        <div className="options-top">
          <h2>{this.props.text}</h2>
          <p>{this.props.subText}</p>
        </div>
        <div className="options-body" onKeyDown={this.handleEnter}>
          <div className="options-choices">
            <InputRange maxValue={this.props.maxValue} minValue={this.props.minValue} step={this.props.step} value={this.state.value} onChange={value => this.setState({ value, optionSelected: true })} autoFocus />
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
            </button>
            <NavDots activeQuestion={this.props.activeQuestion} totalScreens={this.props.totalScreens} />
          </div>
        }

      </div>
    );
  }
}

Range.propTypes = {
	updateActive: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	maxValue: React.PropTypes.number.isRequired,
	minValue: React.PropTypes.number.isRequired,
	step: React.PropTypes.number.isRequired
}

Range.defaultProps = {
	begValue: 1,
  step: 1
}
