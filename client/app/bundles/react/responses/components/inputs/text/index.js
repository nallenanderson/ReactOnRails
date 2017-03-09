import React, { Component } from 'react';

import BackButton from '../backButton';
import NavDots from '../navDots';

import { validateEmail } from '../../../../libs/utils';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: false,
      bodyHeight: '',
      answerText: ''
    };

    this.enterText = this.enterText.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  componentDidMount() {
    const bodyHeight = document.getElementById('body-opts').clientHeight;
    this.setState({ bodyHeight });
  }

  enterText(e) {
    this.setState({ answerText: e.target.value });

    setTimeout(() => {
      if((this.props.inputType === 'email' && !validateEmail(this.state.answerText)) || !this.state.answerText) {
        this.setState({ optionSelected: false });
        return;
      } else {
        this.setState({ optionSelected: true });
      }
    })
  };

  next() {
    const item = {
      id: this.props.id,
      text: this.state.answerText,
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
    const bodyText = this.state.answerText ? this.state.answerText : this.props.promptText;
    const opacity = this.state.answerText ? 1 : 0.65;
    return(
      <div className="step">
        <div className="options-top">
          <h2>{this.props.text}</h2>
          <p>{this.props.subText}</p>
        </div>
        <div id="body-opts" className="options-body">
          <div className="options-choices">
            <div className="t-area">
              <div className="t-clone" style={{ height: this.state.bodyHeight }} >
                <h1 style={{ opacity }}>{bodyText}</h1>
              </div>
              {
                this.props.inputType === 'email' ?
                <input type={this.props.inputType} style={{ height: this.state.bodyHeight }} onChange={(e) => this.enterText(e)} spellCheck={false} onKeyPress={this.handleEnter} autoFocus/> :
                <textarea style={{ height: this.state.bodyHeight }} onChange={(e) => this.enterText(e)} spellCheck={false} onKeyPress={this.handleEnter} autoFocus/>
              }
            </div>

          </div>
        </div>
        {
          this.props.required ?
          <div className="options-footer">
            <button className="btn big-btn" disabled={!this.state.optionSelected} onClick={this.next.bind(this)}>
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

// Might want to remove handleEnter from the textarea

TextInput.propTypes = {
	updateActive: React.PropTypes.func.isRequired,
	id: React.PropTypes.string.isRequired,
	inputType: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired,
  promptText: React.PropTypes.string.isRequired
}

TextInput.defaultProps = {
  inputType: 'text',
  promptText: 'Enter your response here...'
}
