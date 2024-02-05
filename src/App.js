// App.jsx

import React from "react";
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
        <AppRoutes />
      </div>
    </Provider>
  );
}

export default App;
