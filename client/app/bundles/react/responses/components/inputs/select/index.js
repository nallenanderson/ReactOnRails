import React, { Component } from 'react';

import SelectItem from './selectItem';
import BackButton from '../backButton';
import NavDots from '../navDots';

import { updateList } from '../../../../libs/helpers';

export default class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionSelected: false,
      options: props.options
    };

    this.selectItem = this.selectItem.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.next = this.next.bind(this);
  }

  selectItem(item) {
    if(!this.props.multi) {
      const newItem = {...item};
      newItem.selected = !newItem.selected;
      delete newItem.selectItem;

      const options = updateList(this.props.options, newItem);

      this.setState({ options, optionSelected: true });
    } else {
      const newItem = {...item};
      newItem.selected = !newItem.selected;
      delete newItem.selectItem;

      const options = updateList(this.state.options, newItem);

      this.setState({ options, optionSelected: true });
    }

    setTimeout(() => {
      const selected = this.state.options.filter(option => option.selected);
      if (selected.length < 1) {
        this.setState({ optionSelected: false });
      }
    }, 100);


  }

  next() {
    const selectedOptions = this.state.options.filter(option => option.selected);
    selectedOptions.forEach(item => delete item.selected);

    const item = {
      id: this.props.id,
      responses: selectedOptions,
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
          <div className="options-choices">
            {
              this.state.options.map(item => <SelectItem key={item.id} {...item} selectItem={this.selectItem} /> )
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
    );
  }
}

Select.propTypes = {
	updateActive: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	options: React.PropTypes.array.isRequired,
	text: React.PropTypes.string.isRequired
}

Select.defaultProps = {
  options: []
}
