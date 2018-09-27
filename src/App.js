import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { GenerateRoomView, MainView, WaitRoom } from "./views";

const mapStateToProps = state => {
  return {};
};

class App extends Component {
  async componentWillMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="/create" component={GenerateRoomView} />
          <Route path="/wait" component={WaitRoom} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(App));
