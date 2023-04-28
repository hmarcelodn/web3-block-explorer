import { NextUIProvider } from '@nextui-org/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import { Block } from './containers/Block';
import { Home } from './containers/Home';

function App() {
  return (
    <NextUIProvider>
      <Router>
          <Switch>
            <Route exact path="/block/:blockNumber">
              <Block />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </NextUIProvider>
  );
}

export default App;
