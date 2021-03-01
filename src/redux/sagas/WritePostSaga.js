import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { call, put, takeLatest } from "redux-saga/effects";
import postApi from "@src/api/postApi";
import { startLoading, finishLoading } from "./LoadingSaga";

const INITIALIZE = "WritePostReducer/INITIALIZE"; // 내용 초기화
const SET_ORIGINAL_POST = "WritePostReducer/SET_ORIGINAL_POST"; // 초기 포스트 정보 입력
const CHANGE_FIELD = "WritePostReducer/CHANGE_FIELD"; // key 값 변경

export const WRITE = "WritePostReducer/WRITE"; // 포스트 작성
const WRITE_SUCCESS = "WritePostReducer/WRITE_SUCCESS"; // 포스트 작성 성공
const WRITE_FAILURE = "WritePostReducer/WRITE_FAILURE"; // 포스트 작성 실패

export const MODIFY = "WritePostReducer/MODIFY"; // 포스트 수정
const MODIFY_SUCCESS = "WritePostReducer/MODIFY_SUCCESS"; // 포스트 수정 성공
const MODIFY_FAILURE = "WritePostReducer/MODIFY_FAILURE"; // 포스트 수정 실패

export const initialize = createAction(INITIALIZE);
export const setOriginalPost = createAction(
  SET_ORIGINAL_POST,
  (postInfo) => postInfo,
);
export const changeField = createAction(CHANGE_FIELD);
export const write = createAction(WRITE, (formData) => formData);
export const modify = createAction(MODIFY, (formData) => formData);

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
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(WRITE));
  }
}

function* modifySaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(MODIFY));

  try {
    // api 호출
    const res = yield call(postApi.modifyPost, formData);

    // 성공
    yield put({
      type: MODIFY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: MODIFY_FAILURE,
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(MODIFY));
  }
}

const initialState = {
  originalPostId: null,
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
    [SET_ORIGINAL_POST]: (state, { payload: postInfo }) => ({
      ...state,
      originalPostId: postInfo.id,
      title: postInfo.title,
      body: postInfo.body,
      tags: postInfo.tags,
    }),
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
    [MODIFY_SUCCESS]: (state, { payload }) => ({
      ...state,
      writeLink: payload,
      error: null,
    }),
    [MODIFY_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* writePostSaga() {
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(MODIFY, modifySaga);
}

export default writePostReducer;
