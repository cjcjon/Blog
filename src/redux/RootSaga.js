import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loadingReducer from "./sagas/LoadingSaga";
import mainReducer, { mainSaga } from "./sagas/MainSaga";
import lectureReducer, { lectureSaga } from "./sagas/LectureSaga";
import postReducer, { postSaga } from "./sagas/PostSaga";
import writePostReducer, { writePostSaga } from "./sagas/WritePostSaga";
import loginReducer, { loginSaga } from "./sagas/LoginSaga";
import userReducer, { userSaga } from "./sagas/UserSaga";

// combineReducer는 여러 리듀서를 하나로 합쳐주는 역할을 합니다
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combined = combineReducers({
        main: mainReducer,
        lecture: lectureReducer,
        post: postReducer,
        writePost: writePostReducer,
        loading: loadingReducer,
        login: loginReducer,
        user: userReducer,
      });
      return combined(state, action);
    }
  }
};

export function* rootSaga() {
  // all 함수는 여러 사가를 하나로 합쳐주는 역할을 합니다
  yield all([
    mainSaga(),
    lectureSaga(),
    postSaga(),
    writePostSaga(),
    loginSaga(),
    userSaga(),
  ]);
}

export default rootReducer;
