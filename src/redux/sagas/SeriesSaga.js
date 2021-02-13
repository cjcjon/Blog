import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import seriesApi from "@src/api/seriesApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const FETCH_SERIES = "SeriesReducer/FETCH_SERIES"; // 시리즈 전체 불러오기
const FETCH_SERIES_SUCCESS = "SeriesReducer/FETCH_SERIES_SUCCESS"; // 시리즈 전체 불러오기 성공
const FETCH_SERIES_FAILURE = "SeriesReducer/FETCH_SERIES_FAILURE"; // 시리즈 전체 불러오기 실패

const INITIALIZE_SERIES_DIALOG = "SeriesReducer/INITIALIZE_SERIES_DIALOG"; // 시리즈 Dialog 초기화
const CHANGE_SERIES_DIALOG_FIELD = "SeriesReducer/CHANGE_SERIES_DIALOG_FIELD"; // 시리즈 Dialog 데이터 변경

export const WRITE_SERIES = "SeriesReducer/WRITE_SERIES"; // 시리즈 적기
const WRITE_SERIES_SUCCESS = "SeriesReducer/WRITE_SERIES_SUCCESS"; // 시리즈 적기 성공
const WRITE_SERIES_FAILURE = "SeriesReducer/WRITE_SERIES_FAILURE"; // 시리즈 적기 실패

export const DELETE_SERIES = "SeriesReducer/DELETE_SERIES"; // 시리즈 삭제
const DELETE_SERIES_SUCCESS = "SeriesReducer/DELETE_SERIES_SUCCESS"; // 시리즈 삭제 성공
const DELETE_SERIES_FAILURE = "SeriesReducer/DELETE_SERIES_FAILURE"; // 시리즈 삭제 실패

export const MODIFY_SERIES = "SeriesReducer/MODIFY_SERIES"; // 시리즈 수정
const MODIFY_SERIES_SUCCESS = "SeriesReducer/MODIFY_SERIES_SUCCESS"; // 시리즈 수정 성공
const MODIFY_SERIES_FAILURE = "SeriesReducer/MODIFY_SERIES_FAILURE"; // 시리즈 수정 실패

// ACTION (타입과 payload들이 저장되는 object)
export const fetchSeries = createAction(FETCH_SERIES);
export const initializeSeriesDialog = createAction(INITIALIZE_SERIES_DIALOG);
export const changeSeriesDialogField = createAction(
  CHANGE_SERIES_DIALOG_FIELD,
  ({ key, value }) => ({ key, value }),
);
export const writeSeries = createAction(WRITE_SERIES, (formData) => formData);
export const deleteSeries = createAction(DELETE_SERIES, (deleteId) => deleteId);
export const modifySeries = createAction(MODIFY_SERIES, (formData) => formData);

function* fetchSeriesSaga() {
  // 로딩 시작
  yield put(startLoading(FETCH_SERIES));

  try {
    // api 호출
    const seriesList = yield call(seriesApi.seriesList);

    // 무조건 1초 이상 대기
    yield delay(1000);

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

function* writeSeriesSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(WRITE_SERIES));

  try {
    // api 호출
    const res = yield call(seriesApi.writeSeries, formData);

    // 성공
    yield put({
      type: WRITE_SERIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: WRITE_SERIES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(WRITE_SERIES));
  }
}

function* deleteSeriesSaga({ payload: deleteId }) {
  // 로딩 시작
  yield put(startLoading(DELETE_SERIES));

  try {
    // api 호출
    yield call(seriesApi.deleteSeries, deleteId);

    // 성공
    yield put({
      type: DELETE_SERIES_SUCCESS,
    });
  } catch (err) {
    // 실패
    yield put({
      type: DELETE_SERIES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(DELETE_SERIES));
  }
}

function* modifySeriesSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(MODIFY_SERIES));

  try {
    // api 호출
    const res = yield call(seriesApi.modifySeries, formData);

    // 성공
    yield put({
      type: MODIFY_SERIES_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: MODIFY_SERIES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(MODIFY_SERIES));
  }
}

// 초기 state
const initialState = {
  seriesList: [],
  seriesDialog: {
    open: null,
    id: -1,
    title: "",
    thumbnailFile: null,
    previewURL: null,
    inputError: null,
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
    [INITIALIZE_SERIES_DIALOG]: (state) => ({
      ...state,
      seriesDialog: initialState.seriesDialog,
      nextLink: initialState.nextLink,
    }),
    [CHANGE_SERIES_DIALOG_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.seriesDialog[key] = value;
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
    [DELETE_SERIES_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [DELETE_SERIES_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [MODIFY_SERIES_SUCCESS]: (state, { payload }) => ({
      ...state,
      nextLink: payload,
      error: null,
    }),
    [MODIFY_SERIES_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* seriesSaga() {
  yield takeLatest(FETCH_SERIES, fetchSeriesSaga);
  yield takeLatest(WRITE_SERIES, writeSeriesSaga);
  yield takeLatest(DELETE_SERIES, deleteSeriesSaga);
  yield takeLatest(MODIFY_SERIES, modifySeriesSaga);
}

export default seriesReducer;
