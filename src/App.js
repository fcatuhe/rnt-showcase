import React, { Component } from 'react';
import Turbolinks from 'react-native-turbolinks';

import env from './env';

export default class App extends Component {
  componentDidMount() {
    Turbolinks.addEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.addEventListener('turbolinksError', this.handleError);
    Turbolinks.addEventListener(
      'turbolinksActionPress',
      this.handleActionPress
    );
    Turbolinks.setTabBar({
      routes: [
        {
          tabTitle: 'Home',
          title: 'RNT Showcase',
          url: env.BASE_URL,
          actions: [{ id: 404, title: '404 error' }]
        },
        {
          tabTitle: 'Posts',
          title: 'View all posts',
          url: `${env.BASE_URL}/posts`,
          actions: [{ id: 11, title: 'New post' }]
        }
      ]
    });
  }

  handleVisit = data => {
    Turbolinks.visit({ url: data.url, action: data.action });
  };

  handleActionPress = actionId => {
    switch (actionId) {
      case 11:
        return Turbolinks.visit({ url: `${env.BASE_URL}/posts/new` });
      case 404:
        return Turbolinks.visit({ url: `${env.BASE_URL}/not-found` });
    }
  };

  handleError = data => {
    alert(data.description);
  };

  render() {
    return null;
  }
}
