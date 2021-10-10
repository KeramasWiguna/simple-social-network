import { combineReducers, configureStore } from "@reduxjs/toolkit";

export function setupApiStore(api, extraReducers) {
  /*
   * Modified version of RTK Query's helper function:
   * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
   */
  const getStore = () =>
    configureStore({
      reducer: combineReducers({
        [api.reducerPath]: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware
        ),
    });

  const initialStore = getStore();
  const refObj = {
    api,
    store: initialStore,
  };
  const store = getStore();
  refObj.store = store;

  return refObj;
}
