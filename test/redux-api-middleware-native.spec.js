import { API_REQUEST, apiMiddleware } from '../src/redux-api-middleware-native';

it('Exports const', () => {
  return expect(API_REQUEST).toEqual('API_REQUEST');
});
