import React, { Component } from 'react';

import ScaleItem from './scaleItem';
import BackButton from '../backButton';
import NavDots from '../navDots';

import { markLesser, getIndex } from '../../../../libs/helpers';

export default class Scale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: false,
      scale: props.scale
    };

    this.selectItem = this.selectItem.bind(this);
    this.hoverSiblings = this.hoverSiblings.bind(this);
    this.unhoverSiblings = this.unhoverSiblings.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.next = this.next.bind(this);
  }

  selectItem(stars, selected) {
    const newScale = markLesser(this.state.scale, stars, selected);
    this.setState({
      scale: newScale,
      optionSelected: true
    });

    setTimeout(() => {
      if(this.state.scale.filter(item => item.selected).length === 0) {
        this.setState({ optionSelected: false });
      }
    }, 100);
  }

  hoverSiblings(star) {
    const list = this.state.scale;
    const starIndex = getIndex(list, star);

    let i = 0;
    for(i; i <= starIndex; i++) {
      list[i].hovering = true;
    }

    this.setState({ scale: list });
  }

  unhoverSiblings(star) {
    const list = this.state.scale;
    const starIndex = getIndex(list, star);

    let i = 0;
    for (i; i <= starIndex; i++) {
      list[i].hovering = false;
    }

    this.setState({ scale: list });
  }

  next() {
    const rating = this.state.scale.filter(option => option.selected).length;

    const item = {
      id: this.props.id,
      rating,
      type: this.props.type
    }

    this.props.updateActive(1);
    this.props.sendState(item);
  }

  handleEnter(event) {
    if(this.state.optionSelected && event.key === 'Enter') {
      this.next();
    }
  }

  componentDidMount() {
    const node = document.querySelector('.step');
    const addEvent = node.addEventListener || node.attachEvent;
    addEvent("keypress", this.handleEnter, false);
  }

  componentWillUnmount() {
    const node = document.querySelector('.step');
    const removeEvent = node.removeEventListener || node.detachEvent;
    removeEvent("keypress", this.handleEnter);
  }

  render() {
    return(
      <div className="step">
        <div className="options-top">
          <h2>{this.props.text}</h2>
          <p>{this.props.subText}</p>
        </div>
        <div className="options-body">
          <div className="options-choices choose" >
            {
              this.state.scale.map(item => <ScaleItem key={item.id} {...item} selectItem={this.selectItem} hoverSiblings={this.hoverSiblings} unhoverSiblings={this.unhoverSiblings} icon={this.props.icon} />)
            }
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
    )
  }
}

Scale.propTypes = {
	updateActive: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	scale: React.PropTypes.array.isRequired,
	icon: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired
}

Scale.defaultProps = {
	icon: 'star',
  scale: []
}
