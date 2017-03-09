import React, { Component } from 'react';

import NotFound from './responses/components/pages/notFound';
import Closed from './responses/components/pages/closed';
import Scale from './responses/components/inputs/scale/index';
import Select from './responses/components/inputs/select/index';
import TextInput from './responses/components/inputs/text/index';
import Range from './responses/components/inputs/range/index';
import Drag from './responses/components/inputs/drag/index';
import Finished from './responses/components/utils/finished/index';
import OpenUp from './responses/components/utils/openup/index';

import { getColor, random } from './libs/utils';
import { getResponse, createResponse, getIndex } from './libs/helpers';

export default class App extends Component {
  constructor(props, _railsContext) {
    super(props);
    this.state = {
      notFound: false,
      id: props.id,
      questions: [],
      activeQuestion: 0,
      totalScreens: 0,
      response: []
    }

    this.updateActive = this.updateActive.bind(this);
    this.sendState = this.sendState.bind(this);
    this.submitResponses = this.submitResponses.bind(this)
    this.openUp = this.openUp.bind(this)
  }

  updateActive(num) {
    let activeQuestion = this.state.activeQuestion;

    if(num > 0) {
      activeQuestion++;
    } else {
      activeQuestion--;
    }

    this.setState({ activeQuestion });
  }

  sendState(newItem) {
    const response = [...this.state.response, newItem];
    this.setState({ response });
  }


  returnTypes() {
    const active = this.state.questions[this.state.activeQuestion];
    if(active.type === 'select') {
      return <Select key={active.id} {...active} updateActive={this.updateActive} sendState={this.sendState} activeQuestion={this.state.activeQuestion} totalScreens={this.state.totalScreens} />;
    } else if(active.type === 'scale') {
      return <Scale key={active.id} {...active} updateActive={this.updateActive} sendState={this.sendState} activeQuestion={this.state.activeQuestion} totalScreens={this.state.totalScreens} />
    } else if(active.type === 'drag'){
      return <Drag key={active.id} {...active} updateActive={this.updateActive} sendState={this.sendState} activeQuestion={this.state.activeQuestion} totalScreens={this.state.totalScreens} />
    } else if (active.type === 'range') {
      return <Range key={active.id} {...active} updateActive={this.updateActive} sendState={this.sendState} activeQuestion={this.state.activeQuestion} totalScreens={this.state.totalScreens} />
    } else if (active.type === 'text') {
      return <TextInput key={active.id} {...active} updateActive={this.updateActive} sendState={this.sendState} activeQuestion={this.state.activeQuestion} totalScreens={this.state.totalScreens} />
    } else {
      return <Finished key={active.id} {...active} submitResponses={this.submitResponses} />
    }
  }

  submitResponses() {
    const timeFinished = Math.floor(Date.now() / 1000);

    const response = {
      user_id: random(),
      responses: this.state.response,
      timeStared: this.state.timeStarted,
      timeFinished
    };

    return createResponse(response)
      .then(res => res)
      .catch(error => {
        const res = {
          message: 'There was a problem. Please try again.'
        };
        return res;
      });
  }

  componentDidMount() {
    getResponse('surveys').then(response => {
      const formIndex = getIndex(response, this.state);

      if(formIndex === -1) {
        this.setState({ notFound: true });
        return;
      }

      const form = response[formIndex];

      const totalScreens = (form.questions.length - 1) || 0;
      const timeStarted = Math.floor(Date.now() / 1000);
      this.setState({
        questions: form.questions,
        totalScreens,
        name: form.name,
        id: form.id,
        timeStarted,
        private: form.private,
        pText: form.pText,
        openup: form.pass,
        closed: form.closed
      });
    });

    getResponse('colors')
      .then(res => getColor(res))
      .then(data => this.setState({ color : data }));
  }

  openUp(word) {
    if(word === this.state.openup) {
      this.setState({ private: false });
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.state.notFound) {
      return <NotFound beaver={this.props.lost_beaver} home={this.props.home} />;
    }

    if(this.state.closed) {
      return <Closed beaver={this.props.chop_beaver} home={this.props.home} />
    }

    if(this.state.private) {
      return <OpenUp openUp={this.openUp} opass={this.state.openup} text={this.state.pText} name={this.state.name} />;
    }

    return(
      <div className="outer" style={{backgroundColor: this.state.color }}>
        <nav>
          <h2>{this.state.name}</h2>
        </nav>
        {
          this.state.questions.length > 0 ? this.returnTypes() : null
        }
        <footer>
          <i className="zmdi zmdi-fire"></i>
        </footer>
      </div>
    );
  }
}
