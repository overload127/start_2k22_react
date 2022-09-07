import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/AuthSlice';

// import renderReducer from './renderReducer';
// import contactsReducer from './contactsReducer';
// import rtsReducer from './rtsReducer';
// import appReducer from './appReducer';
// import cmsReducer from './cmsReducer';

const rootReducer = combineReducers({
  authReducer,
  // auth: authReducer,
  // contacts: contactsReducer,
  // rts: rtsReducer,
  // app: appReducer,
  // render: renderReducer,
  // cms: cmsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
const store = setupStore();
export default store;
