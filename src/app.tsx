import './operators/bindComponent';
import './operators/cache';
import './operators/logError';
import 'rxjs/add/operator/map';

import { Root, StyleProvider } from 'native-base';
import * as React from 'react';
import { Component } from 'react';
import { AppRegistry, Keyboard } from 'react-native';
import { NavigationState } from 'react-navigation';
import { Subscription } from 'rxjs';

import { Loader } from './components/loader';
import { Navigator } from './navigator';
import * as loaderOperador from './operators/loader';
import * as services from './services';
import { LogService } from './services/models/log';
import { TokenService } from './services/models/token';
import getTheme from './theme/native-base/components';
import platform from './theme/native-base/variables/platform';

interface IState {
  loading: boolean;
}

class App extends Component<any, IState> {
  private tokenService: TokenService;
  private logService: LogService;

  private subscription: Subscription;

  constructor(props: any) {
    super(props);

    services.init();
    this.tokenService = services.get('tokenService');
    this.logService = services.get('logService');

    this.state = { loading: true };
  }

  public componentWillMount(): void {
    this.subscription = this.tokenService.getUser()
      .do(user => this.logService.setUser(user))
      .logError()
      .subscribe();
  }

  public componentWillUnmount(): void {
    if (!this.subscription) return;
    this.subscription.unsubscribe();
  }

  public componentDidMount(): void {
    loaderOperador.setup(this.refs.loader as Loader);
    this.setState({ loading: false }, () => {
    });
  }

  public render(): JSX.Element {
    const { loading } = this.state;

    return (
      <StyleProvider style={getTheme(platform)}>
        <Root>
          <Loader ref='loader' />
          {!loading &&
            <Navigator ref={nav => { this.navigator = nav; }} onNavigationStateChange={this.onNavigationStateChange.bind(this)} />
          }
        </Root>
      </StyleProvider>
    );
  }

  private onNavigationStateChange(prevState: NavigationState, currentState: NavigationState): void {
    Keyboard.dismiss();

    if (!currentState || !currentState.routes || !currentState.routes.length || prevState === currentState) return;
    this.logService.breadcrumb(this.getCurrentRouteName(currentState), 'navigation');
  }

  private getCurrentRouteName(navigationState: NavigationState): string {
    if (!navigationState) {
      return null;
    }

    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getCurrentRouteName(route);
    }

    return route.routeName;
  }

}

AppRegistry.registerComponent('gestaoDoPromotor', () => App);
