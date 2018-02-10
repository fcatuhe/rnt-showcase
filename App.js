import React, { Component } from 'react';
import Turbolinks from 'react-native-turbolinks';

export default class App extends Component {
  componentDidMount() {
    Turbolinks.addEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.addEventListener('turbolinksError', this.handleError);
    Turbolinks.visit({ url: 'http://rnt-showcase-rails.herokuapp.com/' });
  }

  handleVisit = data => {
    Turbolinks.visit({ url: data.url, action: data.action });
  };

  handleError = data => {
    alert(data.description);
  };

  render() {
    return null;
  }
}
