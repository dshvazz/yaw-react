import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux'

import { modelsToReducers } from './lib/model'
import * as models from './models'

import App from './components/App'

const store = createStore(
  combineReducers({
    ...modelsToReducers(models),
    routing: routerReducer
  }),
  applyMiddleware(routerMiddleware(browserHistory))
)

const history = syncHistoryWithStore(browserHistory, store)

const load = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/dashboard" component={() => <h1>Hi</h1>}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  )
}

if (document.readyState !== 'complete') {
  document.addEventListener('DOMContentLoaded', load)
} else {
  load()
}