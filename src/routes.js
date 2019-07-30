import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import Signin from './Signin/Signin';
import Signup from './Signup/Signup';
import ImageGalery from './ImageGalery/ImageGalery';

class Routes extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/images" component={ImageGalery} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
