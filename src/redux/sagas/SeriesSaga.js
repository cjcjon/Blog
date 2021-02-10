import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import { call, put, takeLatest } from "redux-saga/effects";
import seriesApi from "@src/api/seriesApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const FETCH_SERIES = "SeriesReducer/FETCH_SERIES"; // 시리즈 전체 불러오기
const FETCH_SERIES_SUCCESS = "SeriesReducer/FETCH_SERIES_SUCCESS"; // 시리즈 전체 불러오기 성공
const FETCH_SERIES_FAILURE = "SeriesReducer/FETCH_SERIES_FAILURE"; // 시리즈 전체 불러오기 실패

const INITIALIZE_WRITE_DIALOG = "SeriesReducer/INITIALIZE_WRITE_DIALOG"; // 시리즈 입력 초기화
const CHANGE_WRITE_DIALOG_FIELD = "SeriesReducer/CHANGE_WRITE_DIALOG_FIELD"; // 시리즈 입력 데이터 변경

export const WRITE_SERIES = "SeriesReducer/WRITE_SERIES"; // 시리즈 적기
const WRITE_SERIES_SUCCESS = "SeriesReducer/WRITE_SERIES_SUCCESS"; // 시리즈 적기 성공
const WRITE_SERIES_FAILURE = "SeriesReducer/WRITE_SERIES_FAILURE"; // 시리즈 적기 실패

// ACTION (타입과 payload들이 저장되는 object)
export const fetchSeries = createAction(FETCH_SERIES);
export const initializeWriteDialog = createAction(INITIALIZE_WRITE_DIALOG);
export const changeWriteDialogField = createAction(
  CHANGE_WRITE_DIALOG_FIELD,
  ({ key, value }) => ({ key, value }),
);
export const writeSeries = createAction(WRITE_SERIES, (formData) => formData);

function* fetchSeriesSaga() {
  // 로딩 시작
  yield put(startLoading(FETCH_SERIES));

  try {
    // api 호출
    const seriesList = yield call(seriesApi.seriesList);

    // 성공
    yield put({
      type: FETCH_SERIES_SUCCESS,
      payload: seriesList.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: FETCH_SERIES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(FETCH_SERIES));
  }
}

function* writeSeriesSaga({ payload: { formData } }) {
  // 로딩 시작
  yield put(startLoading(WRITE_SERIES));

  try {
    // api 호출
    const res = yield call(seriesApi.write, formData);

    // 성공
    yield put({
      type: WRITE_SERIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    yield put({
      // 실패
      type: WRITE_SERIES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(WRITE_SERIES));
  }
}

// 초기 state
const initialState = {
  seriesList: [],
  writeDialog: {
    open: false,
    title: "",
    thumbnailFile: null,
    previewURL: "",
  },
  nextLink: { rel: "", href: "", method: "" },
  error: null,
};

// 리듀서 (state값만 변경된다)
// 무조건 HYDRATE 있어야 한다. (next.js의 SSR을 위해서 next-redux-wrapper에서 추가한 action)
const seriesReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.series }),
    [FETCH_SERIES_SUCCESS]: (state, { payload }) => ({
      ...state,
      seriesList: payload,
      error: null,
    }),
    [FETCH_SERIES_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [INITIALIZE_WRITE_DIALOG]: (state) => ({
      ...state,
      writeDialog: initialState.writeDialog,
      nextLink: initialState.nextLink,
      error: null,
    }),
    [CHANGE_WRITE_DIALOG_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.writeDialog[key] = value;
      }),
    [WRITE_SERIES_SUCCESS]: (state, { payload }) => ({
      ...state,
      nextLink: payload,
      error: null,
    }),
    [WRITE_SERIES_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* seriesSaga() {
  yield takeLatest(FETCH_SERIES, fetchSeriesSaga);
  yield takeLatest(WRITE_SERIES, writeSeriesSaga);
}

export default seriesReducer;
