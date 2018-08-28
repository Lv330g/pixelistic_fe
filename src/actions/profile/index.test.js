import mockStore from '../../__mocks__/redux-mock-store';
import mockAxios from '../../__mocks__/axios';
import { host, port } from '../../const/node-server-config';
import * as actions from './index';
const store = mockStore();

describe('profile async actions', () => {
  beforeEach(() => {
    store.clearActions();
    mockAxios.mockClear();
  });

  it('dispatches the GET_PROFILE_SUCCESS action', async () => {
    mockAxios.mockImplementationOnce(() => Promise.resolve({
      data: {
        payload: 'get profile',
      }
    }));

    const expectedActions = [
      {
        type: 'LOADING'
      },
      {
        type: 'GET_PROFILE_SUCCESS',
        payload: 'get profile'
      }
    ];

    await store.dispatch(actions.getProfile('carbonid1'));
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith(
      `${host}:${port}/profile/get-profile/carbonid1`,
      {"data": undefined, "headers": "jest test", "method": "GET"}
    );
  });
});
