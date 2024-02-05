// App.jsx

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./components/reducers/index";
import AppRoutes from "./AppRoutes";

import "./App.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
