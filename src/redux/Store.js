import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import rootReducer, { rootSaga } from "./RootSaga";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line global-require
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// eslint-disable-next-line no-unused-vars
export const makeStore = (context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const Store =
  process.env.NODE_ENV !== "production"
    ? createWrapper(makeStore, { debug: true })
    : createWrapper(makeStore);

export default Store;
