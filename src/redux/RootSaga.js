import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import sampleReducer, { sampleSaga } from "./sagas/SampleSaga";
import writePostReducer from "./sagas/WritePostSaga";

// combineReducer는 여러 리듀서를 하나로 합쳐주는 역할을 합니다
const rootReducer = combineReducers({
  sample: sampleReducer,
  writePost: writePostReducer,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 하나로 합쳐주는 역할을 합니다
  yield all([sampleSaga()]);
}

export default rootReducer;
