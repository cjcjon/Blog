import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loadingReducer from "./sagas/LoadingSaga";
import mainReducer, { mainSaga } from "./sagas/MainSaga";
import lectureReducer, { lectureSaga } from "./sagas/LectureSaga";
import postReducer, { postSaga } from "./sagas/PostSaga";
import writePostReducer, { writePostSaga } from "./sagas/WritePostSaga";

// combineReducer는 여러 리듀서를 하나로 합쳐주는 역할을 합니다
const rootReducer = combineReducers({
  main: mainReducer,
  lecture: lectureReducer,
  post: postReducer,
  writePost: writePostReducer,
  loading: loadingReducer,
});

export function* rootSaga() {
  // all 함수는 여러 사가를 하나로 합쳐주는 역할을 합니다
  yield all([mainSaga(), lectureSaga(), postSaga(), writePostSaga()]);
}

export default rootReducer;
