import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { call, put, takeLatest } from "redux-saga/effects";
import postApi from "@src/api/postApi";
import { startLoading, finishLoading } from "./LoadingSaga";

const INITIALIZE = "WritePostReducer/INITIALIZE"; // 내용 초기화
const CHANGE_FIELD = "WritePostReducer/CHANGE_FIELD"; // key 값 변경

export const WRITE = "WritePostReducer/WRITE"; // 포스트 작성
const WRITE_SUCCESS = "WritePostReducer/WRITE_SUCCESS"; // 포스트 작성 성공
const WRITE_FAILURE = "WritePostReducer/WRITE_FAILURE"; // 포스트 작성 실패

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD);
export const write = createAction(WRITE, (formData) => formData);

function* writeSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(WRITE));

  try {
    // api 호출
    const res = yield call(postApi.writePost, formData);

    // 성공
    yield put({
      type: WRITE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: WRITE_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(WRITE));
  }
}

const initialState = {
  title: "",
  body: "",
  tags: [],
  writeLink: null,
  error: null,
};

const writePostReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.writePost,
    }),
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_SUCCESS]: (state, { payload }) => ({
      ...state,
      writeLink: payload,
      error: null,
    }),
    [WRITE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* writePostSaga() {
  yield takeLatest(WRITE, writeSaga);
}

export default writePostReducer;
