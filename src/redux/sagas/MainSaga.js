import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { all, call, put, takeLatest } from "redux-saga/effects";
import postApi from "@src/api/postApi";
import lectureApi from "@src/api/lectureApi";
import tagApi from "@src/api/tagApi";

// ACTION TYPE
const LOAD_INITIAL_DATA = "MainReducer/LOAD_INITIAL_DATA"; // 메인 화면 초기 데이터 설정
const LOAD_INITIAL_DATA_SUCCESS = "MainReducer/LOAD_INITIAL_DATA_SUCCESS"; // 메인 화면 초기 데이터 불러오기 성공
const LOAD_INITIAL_DATA_FAILURE = "MainReducer/LOAD_INITIAL_DATA_FAILURE"; // 메인 화면 초기 데이터 불러오기 실패

// ACTION (타입과 payload들이 저장되는 object)
export const loadInitialData = createAction(LOAD_INITIAL_DATA);

// 초기 데이터 불러오는 사가
function* loadInitialDataSaga() {
  try {
    // all을 통해 Concurrent하게 호출된다.
    const [recentRes, tagRes, lectureRes, postRes, viewRes] = yield all([
      call(postApi.recentPosts),
      call(tagApi.groupTags),
      call(lectureApi.recommandLectures),
      call(postApi.recommandPosts),
      call(postApi.mostViewPosts),
    ]);

    yield put({
      type: LOAD_INITIAL_DATA_SUCCESS,
      payload: {
        recentPosts: recentRes.data,
        tagGroups: tagRes.data,
        recommandLectures: lectureRes.data,
        recommandPosts: postRes.data,
        mostViewPosts: viewRes.data,
      },
    });
  } catch (err) {
    yield put({
      type: LOAD_INITIAL_DATA_FAILURE,
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  }
}

// 초기 state
const initialState = {
  recentPosts: null,
  tagGroups: null,
  recommandLectures: null,
  recommandPosts: null,
  mostViewPosts: null,
  error: null,
};

// 리듀서 (state값만 변경된다)
// 무조건 HYDRATE 있어야 한다. (next.js의 SSR을 위해서 next-redux-wrapper에서 추가한 action)
const mainReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.main }),
    [LOAD_INITIAL_DATA_SUCCESS]: (
      state,
      {
        payload: {
          recentPosts,
          tagGroups,
          recommandLectures,
          recommandPosts,
          mostViewPosts,
        },
      },
    ) => ({
      ...state,
      recentPosts,
      tagGroups,
      recommandLectures,
      recommandPosts,
      mostViewPosts,
      error: null,
    }),
    [LOAD_INITIAL_DATA_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

// 사가 모음 (이곳에서 생성한 사가들을 합쳐줘야 한다)
export function* mainSaga() {
  yield takeLatest(LOAD_INITIAL_DATA, loadInitialDataSaga);
}

export default mainReducer;
