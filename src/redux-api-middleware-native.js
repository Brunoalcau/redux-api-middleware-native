import 'whatwg-fetch';

export const CALL_API = 'API_REQUEST';
const TYPES = ['API_SUCCESS', 'API_FAILURE', 'API_ERROR'];

const isValidRequest = (action) => {
  return typeof action === 'object'
    && action.hasOwnProperty(CALL_API);
};

const actionCallback = async (actionType, request, state, res, error) => {
  let processedAction = {};

  if (typeof actionType === 'object') {
    let { payload, type, meta } = actionType;

    if (payload) {
      if (typeof payload === 'function') {
        payload = await payload(request, state, res);
      }
    } else {
      payload = await res && res.json();
    }

    if (meta) {
      if (typeof meta === 'function') {
        meta =  await meta(request, state);
      }
    } else {
      meta = request.meta;
    }

    processedAction = {
      payload,
      type,
      meta,
      error
    };
  } else {
    processedAction = {
      payload: await res && res.json(),
      type: actionType,
      meta: request.meta,
      error
    };
  }

  return processedAction;
};

export const apiMiddleware = store => next => async (action) => {
  if (!isValidRequest(action)) {
    return next(action);
  }

  const request = action[CALL_API];
  const state = store.getState();
  const { method, headers, body, types, endpoint, meta } = request;
  const [ successType, failureType, errorType ] = types || TYPES;

  try {
    const res = await fetch(endpoint, {
      method: method || 'GET',
      headers: headers || {},
      body: body ? JSON.stringify(body) : undefined
    });

    if (res.status !== 200) {
      return next(
        await actionCallback(failureType, request, state, res, true)
      );
    }

    return next(
      await actionCallback(successType, request, state, res, false)
    );
  } catch (event) {
    return next(
      await actionCallback(errorType, request, state, event, true)
    );
  }
};
