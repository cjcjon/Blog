import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import userApi from "@src/api/userApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const CHECK_LOGIN = "UserReducer/CHECK_LOGIN"; // 로그인 상태 검사
const CHECK_LOGIN_SUCCESS = "UserReducer/CHECK_LOGIN_SUCCESS"; // 로그인 검사 성공
const CHECK_LOGIN_FAILURE = "UserReducer/CHECK_LOGIN_FAILURE"; // 로그인 검사 실패

export const USER_LOGOUT = "UserReducer/USER_LOGOUT"; // 로그아웃

// ACTION (타입과 payload들이 저장되는 object)
export const checkLogin = createAction(CHECK_LOGIN);
export const userLogout = createAction(USER_LOGOUT);

function* checkLoginSaga() {
  // 로딩 시작
  yield put(startLoading(CHECK_LOGIN));

  try {
    // api 호출
    const res = yield call(userApi.check);

    // 성공
    yield put({
      type: CHECK_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: CHECK_LOGIN_FAILURE,
      payload: err.response ? err.response.data : err.message,
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(CHECK_LOGIN));
  }
}

function* userLogoutSaga() {
  try {
    yield call(userApi.logout);
  } catch (e) {
    console.log(e);
  }
}

// 초기 state
const initialState = {
  user: null,
  checkError: null,
};

// 리듀서 (state값만 변경된다)
const userReducer = handleActions(
  {
    [CHECK_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: payload,
      checkError: null,
    }),
    [CHECK_LOGIN_FAILURE]: (state, { payload }) => ({
      ...state,
      user: null,
      checkError: payload,
    }),
    [USER_LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
  },
  initialState,
);

// 사가 모음 (이곳에서 생성한 사가들을 합쳐줘야 한다)
export function* userSaga() {
  yield takeLatest(CHECK_LOGIN, checkLoginSaga);
  yield takeLatest(USER_LOGOUT, userLogoutSaga);
}

export default userReducer;
