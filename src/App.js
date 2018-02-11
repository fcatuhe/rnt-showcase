import { Component } from 'react';
import Turbolinks from 'react-native-turbolinks';

import env from './env';

export default class App extends Component {
  componentDidMount() {
    Turbolinks.addEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.addEventListener(
      'turbolinksActionPress',
      this.handleActionPress
    );
    Turbolinks.addEventListener('turbolinksError', this.handleError);
    Turbolinks.addEventListener('turbolinksMessage', this.showMessage);
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

  componentWillUnmount() {
    Turbolinks.removeEventListener('turbolinksVisit', this.handleVisit);
    Turbolinks.removeEventListener(
      'turbolinksActionPress',
      this.handleActionPress
    );
    Turbolinks.removeEventListener('turbolinksError', this.handleError);
    Turbolinks.removeEventListener('turbolinksMessage', this.showMessage);
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
    const httpFailure = Turbolinks.Constants.ErrorCode.httpFailure;
    const networkFailure = Turbolinks.Constants.ErrorCode.networkFailure;
    switch (data.code) {
      case httpFailure: {
        switch (data.statusCode) {
          // case 401:
          //   return Turbolinks.visit({
          //     component: 'AuthenticationScreen',
          //     modal: true
          //   });
          case 404: {
            const title = 'Page Not Found';
            const message = "There doesn't seem to be anything here.";
            return Turbolinks.replaceWith({
              component: 'ErrorScreen',
              passProps: { title, message }
            });
          }
          default: {
            const title = 'Unknown HTTP Error';
            const message = 'An unknown HTTP error occurred.';
            Turbolinks.replaceWith({
              component: 'ErrorScreen',
              passProps: { title, message }
            });
          }
        }
        break;
      }
      case networkFailure: {
        const title = "Can't Connect";
        const message = "RNT Showcase can't connect to the server.";
        return Turbolinks.replaceWith({
          component: 'ErrorScreen',
          passProps: { title, message }
        });
      }
      default: {
        const title = 'Unknown Error';
        const message = 'An unknown error occurred.';
        Turbolinks.replaceWith({
          component: 'ErrorScreen',
          passProps: { title, message }
        });
      }
    }
  };

  showMessage = message => {
    alert(message);
  };

  render() {
    return null;
  }
}
