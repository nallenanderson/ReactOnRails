import React, { Component } from 'react';

import { getResponse } from '../../../../libs/helpers';
import { getColor } from '../../../../libs/utils';

export default class OpenUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answerText: '',
      optionSelected: false,
      bodyHeight: 0
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    const bodyHeight = document.getElementById('body-opts').clientHeight;

    getResponse('colors')
      .then(res => getColor(res))
      .then(data => this.setState({ color: data, bodyHeight }));
  }

  enterText(e) {
    this.setState({ answerText: e.target.value });
    setTimeout(() => {
      const printWord = this.state.answerText.replace(/./gi, '•');
      this.setState({ optionSelected: true, printWord });
    }, 100);
  };

  next() {
    if(!this.props.openUp(this.state.answerText)) {
      this.refs.pass.reset();
      this.setState({
        answerText: '',
        printWord: '',
        error: this.props.text.error
      });

      setTimeout(() => this.setState({ error: '' }), 2000);
    };
  }

  handleEnter(event) {
    if(this.state.optionSelected && event.key === 'Enter') {
      this.next();
    }
  }


  render() {
    const bodyText = this.state.answerText ? this.state.printWord : this.props.text.mainText;
    const opacity = this.state.answerText ? 1 : 0.65;
    return(
      <div className="outer" style={{backgroundColor: this.state.color }}>
        <nav>
          <h2>{this.props.name}</h2>
        </nav>

        <div className="step">
          <div className="options-top">
            <h2>{this.props.text.text}</h2>
          </div>
          <div id="body-opts" className="options-body">
            <div className="options-choices">
              <form ref="pass" className="t-area" onSubmit={(e) => e.preventDefault()}>
                <div className="t-clone" style={{ height: this.state.bodyHeight }} >
                  <h1 style={{ opacity }}>{this.state.error || bodyText}</h1>
                </div>
                <input type="password" style={{ height: this.state.bodyHeight }} onChange={(e) => this.enterText(e)} spellCheck={false} onKeyPress={this.handleEnter} autoFocus disabled={this.state.error} />
              </form>
            </div>
          </div>

          <div className="options-footer">
            <button className="btn big-btn" disabled={!this.state.optionSelected} onClick={this.next}>
              <span className={!this.state.optionSelected ? 'text muted' : 'text'}>{this.props.text.submit}</span>
            </button>
          </div>
        </div>

        <footer>
          <i className="zmdi zmdi-fire"></i>
        </footer>
      </div>
    );
  }
}

// Might want to remove handleEnter from the textarea

OpenUp.propTypes = {

}

OpenUp.defaultProps = {
}
