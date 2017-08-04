import 'whatwg-fetch';

export const API_REQUEST = 'API_REQUEST';
export const TYPE = {
  success: "SUCCESS",
  failure: "FAILURE",
  error: "ERROR"
};

const isValidRequest = (action) => {
  return typeof action === 'object' && action.hasOwnProperty(API_REQUEST);
};

const isValidResponse = (status) => {
  return status === 200;
};

export const apiMiddleware = store => next => async (action) => {
  if (!isValidRequest(action)) {
    return next(action);
  }

  const request = action[API_REQUEST];

  try {
    const response = await fetch(request.url, {
      method: request.method ? request.method : "GET",
      headers: request.header ? request.header : {},
      body: request.body ? JSON.stringify(request.body) : undefined
    });

    let data = await response.json();

    if (!isValidResponse(response.status)) {
      return next({
        type: request.action && request.action.failure ? request.action.failure : TYPE.failure,
        payload: data,
        error: true
      });
    }

    return next({
      type: request.action && request.action.success ? request.action.success : TYPE.success,
      payload: data,
      meta: request.meta,
      error: false
    });
  } catch (e) {
    return next({
      type: request.action && request.action.error ? request.action.error : TYPE.error,
      payload: e,
      error: true
    });
  }
};
