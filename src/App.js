import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddProject from './components/Project/AddProject';
import { Provider } from 'react-redux';
import store from './sotre';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Header></Header>
          <Route exact path='/Dashboard' component={Dashboard}></Route>
          <Route
            exact
            path='/AddProject'
            component={AddProject}
            store={store}
          ></Route>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
