import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import sampleReducer, { sampleSaga } from "./sagas/SampleSaga";
import mainReducer, { mainSaga } from "./sagas/MainSaga";
import writePostReducer, { writePostSaga } from "./sagas/WritePostSaga";

// combineReducer는 여러 리듀서를 하나로 합쳐주는 역할을 합니다
const rootReducer = combineReducers({
  writePost: writePostReducer,
  sample: sampleReducer,
  main: mainReducer,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 하나로 합쳐주는 역할을 합니다
  yield all([writePostSaga(), sampleSaga(), mainSaga()]);
}

export default rootReducer;
