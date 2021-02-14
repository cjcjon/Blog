import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { call, put, takeLatest } from "redux-saga/effects";
import seriesApi from "@src/api/seriesApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const FETCH_POSTS = "PostReducer/FETCH_POSTS"; // 시리즈의 포스트 전체 불러오기
const FETCH_POSTS_SUCCESS = "PostReducer/FETCH_POSTS_SUCCESS"; // 시리즈의 포스트 전체 불러오기 성공
const FETCH_POSTS_FAILURE = "PostReducer/FETCH_POSTS_FAILURE"; // 시리즈의 포스트 전체 불러오기 실패

// ACTION (타입과 payload들이 저장되는 object)
export const fetchPosts = createAction(FETCH_POSTS, (seriesId) => seriesId);

function* fetchPostsSaga({ payload: seriesId }) {
  // 로딩 시작
  yield put(startLoading(FETCH_POSTS));

  try {
    // api 호출
    const res = yield call(seriesApi.seriesPostList, seriesId);

    // series와 posts 두 개의 데이터를 받는다
    const { series, posts } = { ...res.data };

    // 성공
    yield put({
      type: FETCH_POSTS_SUCCESS,
      payload: { series, posts },
    });
  } catch (err) {
    // 실패
    yield put({
      type: FETCH_POSTS_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(FETCH_POSTS));
  }
}

// 초기 state
const initialState = {
  seriesInfo: null,
  postList: [],
  error: null,
};

// 리듀서 (state값만 변경된다)
// 무조건 HYDRATE 있어야 한다. (next.js의 SSR을 위해서 next-redux-wrapper에서 추가한 action)
const postReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.post }),
    [FETCH_POSTS_SUCCESS]: (state, { payload: { series, posts } }) => ({
      ...state,
      seriesInfo: series,
      postList: posts,
      error: null,
    }),
    [FETCH_POSTS_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* postSaga() {
  yield takeLatest(FETCH_POSTS, fetchPostsSaga);
}

export default postReducer;
