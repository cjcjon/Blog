import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import loginApi from "@src/api/loginApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
const CHANGE_FIELD = "LoginReducer/CHANGE_FIELD"; // Form field 변경

export const USER_LOGIN = "LoginReducer/USER_LOGIN"; // 로그인
const USER_LOGIN_SUCCESS = "LoginReducer/USER_LOGIN_SUCCESS"; // 로그인 성공
const USER_LOGIN_FAILURE = "LoginReducer/USER_LOGIN_FAILURE"; // 로그인 실패

// ACTION (타입과 payload들이 저장되는 object)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const userLogin = createAction(USER_LOGIN, (formData) => formData);

function* userLoginSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(USER_LOGIN));

  try {
    // api 호출
    const res = yield call(loginApi.login, formData);

    // 성공
    yield put({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: USER_LOGIN_FAILURE,
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(USER_LOGIN));
  }
}

// 초기 state
const initialState = {
  userName: "",
  password: "",
  nextLink: null,
  loginError: null,
};

// 리듀서 (state값만 변경된다)
const loginReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [USER_LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      nextLink: payload,
      loginError: null,
    }),
    [USER_LOGIN_FAILURE]: (state, { payload }) => ({
      ...state,
      loginError: payload,
    }),
  },
  initialState,
);

// 사가 모음 (이곳에서 생성한 사가들을 합쳐줘야 한다)
export function* loginSaga() {
  yield takeLatest(USER_LOGIN, userLoginSaga);
}

export default loginReducer;
