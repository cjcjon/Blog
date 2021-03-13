import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import postApi from "@src/api/postApi";
import { startLoading, finishLoading } from "./LoadingSaga";

const CHANGE_FIELD = "WritePostReducer/CHANGE_FIELD"; // key 값 변경

export const LOAD_ORIGINAL_POST = "WritePostReducer/LOAD_ORIGINAL_POST"; // 초기 포스트 정보 불러오기
const LOAD_ORIGINAL_POST_SUCCESS =
  "WritePostReducer/LOAD_ORIGINAL_POST_SUCCESS"; // 초기 포스트 정보 불러오기 성공
const LOAD_ORIGINAL_POST_FAILURE =
  "WritePostReducer/LOAD_ORIGINAL_POST_FAILURE"; // 초기 포스트 정보 불러오기 실패

export const WRITE = "WritePostReducer/WRITE"; // 포스트 작성
const WRITE_SUCCESS = "WritePostReducer/WRITE_SUCCESS"; // 포스트 작성 성공
const WRITE_FAILURE = "WritePostReducer/WRITE_FAILURE"; // 포스트 작성 실패

export const MODIFY = "WritePostReducer/MODIFY"; // 포스트 수정
const MODIFY_SUCCESS = "WritePostReducer/MODIFY_SUCCESS"; // 포스트 수정 성공
const MODIFY_FAILURE = "WritePostReducer/MODIFY_FAILURE"; // 포스트 수정 실패

export const loadOriginalPost = createAction(
  LOAD_ORIGINAL_POST,
  (postId) => postId,
);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const write = createAction(WRITE, (formData) => formData);
export const modify = createAction(MODIFY, (formData) => formData);

function* loadOriginalPostSaga({ payload: postId }) {
  // 로딩 시작
  yield put(startLoading(LOAD_ORIGINAL_POST));

  try {
    // api 호출
    const res = yield call(postApi.readPost, postId);

    yield put({
      type: LOAD_ORIGINAL_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: LOAD_ORIGINAL_POST_FAILURE,
      payload: {
        status: err.response.status,
        name: err.name,
        message: err.response.data,
        stack: err.stack,
      },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(LOAD_ORIGINAL_POST));
  }
}

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
  title: "",
  body: "",
  tags: [],
  writeLink: null,
  error: null,
};

const writePostReducer = handleActions(
  {
    [LOAD_ORIGINAL_POST_SUCCESS]: (state, { payload: postInfo }) => ({
      ...state,
      title: postInfo.title,
      body: postInfo.body,
      tags: postInfo.tags,
    }),
    [LOAD_ORIGINAL_POST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
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
  yield takeLatest(LOAD_ORIGINAL_POST, loadOriginalPostSaga);
  yield takeLatest(WRITE, writeSaga);
  yield takeLatest(MODIFY, modifySaga);
}

export default writePostReducer;
