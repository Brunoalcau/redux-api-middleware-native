import { CALL_API, apiMiddleware } from '../src/redux-api-middleware-native';

it('Exports const', () => {
  return expect(CALL_API).toEqual('API_REQUEST');
});

it('Exports middleware', () => {
  return expect(typeof apiMiddleware).toEqual('function');
});
