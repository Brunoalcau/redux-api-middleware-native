redux-api-middleware-native
====================
Redux api middleware for redux compatible with native and web apps.

# Install
```
npm install --save redux-api-middleware-native
```

# Adding middleware to redux store

store
```js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import apiMiddleware from 'redux-api-middleware-native';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const initialState = {};

const store = createStore(reducer, initialState, applyMiddleware(
    apiMiddleware,
));
```

# Examples

Simple Action
```js
import { API_REQUEST } from 'redux-api-middleware-native';

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                }
            }
    }
}
```

Full Action
```js
import { API_REQUEST } from 'redux-api-middleware-native';

function action() {
    return {
            [API_REQUEST]: {
                url: 'http://www.example.com/resource',
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: {
                    'username' : 'npm-user',
                    'password' : 'test'
                },
                action: {
                        success: "SUCCESS",
                        failure: "FAILURE",
                        error: "ERROR"
                },
                meta: {
                  id: 'to reducer'
                }
            }
    }
}
```

# Action Types

## SUCCESS

Type success means your request get HTTP status code 200 without any other errors.

```js
Action {
    type = action.success
    payload = JSON parsed response
    error = false
}
```

## FAILURE

Type failure means your request not get HTTP status code 200 without any other errors.

```js
Action {
    type = action.failure
    payload = JSON parsed response
    error = true
}
```

## ERROR

Type error means we got exception on some point of code (ex. response parsing).

```js
Action {
    type = action.error
    payload = ERROR object
    error = true
}
```
