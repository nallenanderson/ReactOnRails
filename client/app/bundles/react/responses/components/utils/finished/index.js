import React, { Component } from 'react';

export default class Finished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Send',
      sending: false,
      sent: false,
      message: ''
    };

    this.sendToSubmit = this.sendToSubmit.bind(this);
  }

  createMarkup(message) {
    return {__html: message};
  }

  sendToSubmit() {
    this.setState({ text: 'Sending', sending: true });
    setTimeout(() => {
      this.props.submitResponses()
        .then(response => {
          console.log(response);
          if(response.code === 201) {
            this.setState({
              sending: false,
              text: 'Sent  Successfully!',
              sent: true,
              message: response.message
            });
          } else {
            this.setState({
              sending: false,
              text: 'Send  Again?',
              sent: false,
              message: response.message
            });
          }
        });
    }, 2000);
  }

  render() {
    const dots = <div id="wave">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>;

    return(
      <div className="step">
        <div className="options-top">
          <h2>{this.props.text}</h2>
        </div>
        <div className="options-body">
          <div className="options-choices">
            <div className="finished-text" dangerouslySetInnerHTML={this.createMarkup(this.props.message)} />
          </div>
        </div>
        <div className="options-footer">
          <button className="btn finished" disabled={this.state.sent || this.state.sending} onClick={this.sendToSubmit}>
            <span className="text">
              {this.state.text}
              { this.state.sending ? dots : null}
            </span>
          </button>
        </div>
      </div>
    );
  }
}

Finished.propTypes = {
	id: React.PropTypes.string.isRequired,
	type: React.PropTypes.string.isRequired,
	message: React.PropTypes.string.isRequired,
	text: React.PropTypes.string.isRequired
}

Finished.defaultProps = {
  message: 'Thank you for participating. Now submit your survey!',
  text: 'Thank you!'
}
