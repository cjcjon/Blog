import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loadingReducer from "./sagas/LoadingSaga";
import sampleReducer, { sampleSaga } from "./sagas/SampleSaga";
import mainReducer, { mainSaga } from "./sagas/MainSaga";
import seriesReducer, { seriesSaga } from "./sagas/SeriesSaga";
import postReducer, { postSaga } from "./sagas/PostSaga";
import writePostReducer, { writePostSaga } from "./sagas/WritePostSaga";

// combineReducer는 여러 리듀서를 하나로 합쳐주는 역할을 합니다
const rootReducer = combineReducers({
  sample: sampleReducer,
  main: mainReducer,
  series: seriesReducer,
  post: postReducer,
  writePost: writePostReducer,
  loading: loadingReducer,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 하나로 합쳐주는 역할을 합니다
  yield all([
    sampleSaga(),
    mainSaga(),
    seriesSaga(),
    postSaga(),
    writePostSaga(),
  ]);
}

export default rootReducer;
