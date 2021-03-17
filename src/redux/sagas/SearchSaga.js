import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";
import tagApi from "@src/api/tagApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
const CHANGE_FIELD = "LoginReducer/CHANGE_FIELD"; // Form field 변경

export const SEARCH_POST = "SearchReducer/SEARCH_POST"; // 검색
const SEARCH_POST_SUCCESS = "SearchReducer/SEARCH_POST_SUCCESS"; // 검색 성공
const SEARCH_POST_FAILURE = "SearchReducer/SEARCH_POST_FAILURE"; // 검색 실패

// ACTION (타입과 payload들이 저장되는 object)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const searchPost = createAction(SEARCH_POST, (tagName) => tagName);

function* searchPostSaga({ payload: tagName }) {
  // 로딩 시작
  yield put(startLoading(SEARCH_POST));

  try {
    // api 호출
    const res = yield call(tagApi.searchByTag, tagName);

    // 성공
    yield put({
      type: SEARCH_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: SEARCH_POST_FAILURE,
      payload: { name: err.name, message: err.response.data, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(SEARCH_POST));
  }
}

// 초기 state
const initialState = {
  searchName: "",
  searchData: null,
  error: null,
};

// 리듀서 (state값만 변경된다)
const searchReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [SEARCH_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchData: payload,
      error: null,
    }),
    [SEARCH_POST_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

// 사가 모음 (이곳에서 생성한 사가들을 합쳐줘야 한다)
export function* searchSaga() {
  yield takeLatest(SEARCH_POST, searchPostSaga);
}

export default searchReducer;
