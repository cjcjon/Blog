import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { call, put, takeLatest } from "redux-saga/effects";
import lectureApi from "@src/api/lectureApi";
import postApi from "@src/api/postApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const FETCH_POSTS = "PostReducer/FETCH_POSTS"; // 강의 포스트 전체 불러오기
const FETCH_POSTS_SUCCESS = "PostReducer/FETCH_POSTS_SUCCESS"; // 강의 포스트 전체 불러오기 성공
const FETCH_POSTS_FAILURE = "PostReducer/FETCH_POSTS_FAILURE"; // 강의 포스트 전체 불러오기 실패

export const READ_POST = "PostReducer/READ_POST"; // 포스트 읽어들이기
const READ_POST_SUCCESS = "PostReducer/READ_POST_SUCCESS"; // 포스트 읽어들이기 성공
const READ_POST_FAILURE = "PostReducer/READ_POST_FAILURE"; // 포스트 읽어들이기 실패

export const LIKE_POST = "PostReducer/LIKE_POST"; // 포스트 좋아요
const LIKE_POST_SUCCESS = "PostReducer/LIKE_POST_SUCCESS"; // 포스트 좋아요 성공
const LIKE_POST_FAILURE = "PostReducer/LIKE_POST_FAILURE"; // 포스트 좋아요 실패

export const DELETE_POST = "PostReducer/DELETE_POST"; // 포스트 삭제
const DELETE_POST_SUCCESS = "PostReducer/DELETE_POST_SUCCESS"; // 포스트 삭제 성공
const DELETE_POST_FAILURE = "PostReducer/DELETE_POST_FAILURE"; // 포스트 삭제 실패

// ACTION (타입과 payload들이 저장되는 object)
export const fetchPosts = createAction(FETCH_POSTS, (lectureId) => lectureId);
export const readPost = createAction(READ_POST, (postId) => postId);
export const likePost = createAction(LIKE_POST, (postId) => postId);
export const deletePost = createAction(DELETE_POST, (postId) => postId);

function* fetchPostsSaga({ payload: lectureId }) {
  // 로딩 시작
  yield put(startLoading(FETCH_POSTS));

  try {
    // api 호출
    const res = yield call(lectureApi.lecturePostList, lectureId);

    // lecture와 posts 두 개의 데이터를 받는다
    const { lecture, posts } = { ...res.data };

    // 성공
    yield put({
      type: FETCH_POSTS_SUCCESS,
      payload: { lecture, posts },
    });
  } catch (err) {
    // 실패
    yield put({
      type: FETCH_POSTS_FAILURE,
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(FETCH_POSTS));
  }
}

function* readPostSaga({ payload: postId }) {
  // 로딩 시작
  yield put(startLoading(READ_POST));

  try {
    const postRes = yield call(postApi.readPost, postId);
    const lectureRes = yield call(
      lectureApi.lecturePostList,
      postRes.data.lectureId,
    );

    const { lecture, posts } = { ...lectureRes.data };

    yield put({
      type: READ_POST_SUCCESS,
      payload: {
        postInfo: postRes.data,
        lecture,
        posts,
      },
    });
  } catch (err) {
    // 실패
    yield put({
      type: READ_POST_FAILURE,
      payload: {
        status: err.response.status,
        name: err.name,
        message: err.response.data,
        stack: err.stack,
      },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(READ_POST));
  }
}

function* likePostSaga({ payload: postId }) {
  // 로딩 시작
  yield put(startLoading(LIKE_POST));

  try {
    const res = yield call(postApi.likePost, postId);

    yield put({
      type: LIKE_POST_SUCCESS,
      payload: res.data.likes,
    });
  } catch (err) {
    yield put({
      type: LIKE_POST_FAILURE,
      payload: err.response.data,
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(LIKE_POST));
  }
}

function* deletePostSaga({ payload: postId }) {
  // 로딩 시작
  yield put(startLoading(DELETE_POST));

  try {
    const res = yield call(postApi.deletePost, postId);

    yield put({
      type: DELETE_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      type: DELETE_POST_FAILURE,
      payload: err.response.data,
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(DELETE_POST));
  }
}

// 초기 state
const initialState = {
  lectureInfo: null,
  postList: null,
  postInfo: null,
  nextLink: null,
  error: null,
  likeFailureMsg: null,
  deleteFailureMsg: null,
};

// 리듀서 (state값만 변경된다)
const postReducer = handleActions(
  {
    [FETCH_POSTS_SUCCESS]: (state, { payload: { lecture, posts } }) => ({
      ...state,
      lectureInfo: lecture,
      postList: posts,
      error: null,
    }),
    [FETCH_POSTS_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [READ_POST_SUCCESS]: (
      state,
      { payload: { postInfo, lecture, posts } },
    ) => ({
      ...state,
      lectureInfo: lecture,
      postList: posts,
      postInfo,
    }),
    [READ_POST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [LIKE_POST_SUCCESS]: (state, { payload: likes }) =>
      produce(state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.likeFailureMsg = null;
        // eslint-disable-next-line no-param-reassign
        draft.postInfo.likes = likes;
      }),
    [LIKE_POST_FAILURE]: (state, { payload: msg }) => ({
      ...state,
      likeFailureMsg: msg,
    }),
    [DELETE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      nextLink: payload,
      deleteFailureMsg: null,
    }),
    [DELETE_POST_FAILURE]: (state, { payload: msg }) => ({
      ...state,
      deleteFailureMsg: msg,
    }),
  },
  initialState,
);

export function* postSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
  yield takeLatest(READ_POST, readPostSaga);
  yield takeLatest(LIKE_POST, likePostSaga);
  yield takeLatest(DELETE_POST, deletePostSaga);
}

export default postReducer;
