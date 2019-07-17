import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NavBar from "./components/NavBar";
import { Provider } from "react-redux";
import { store } from "./redux/reducers";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route component={NavBar} />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
