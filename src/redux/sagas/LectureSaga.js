import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { HYDRATE } from "next-redux-wrapper";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import lectureApi from "@src/api/lectureApi";
import { startLoading, finishLoading } from "./LoadingSaga";

// ACTION TYPE
export const FETCH_LECTURES = "LectureReducer/FETCH_LECTURES"; // 강의 전체 불러오기
const FETCH_LECTURES_SUCCESS = "LectureReducer/FETCH_LECTURES_SUCCESS"; // 강의 전체 불러오기 성공
const FETCH_LECTURES_FAILURE = "LectureReducer/FETCH_LECTURES_FAILURE"; // 강의 전체 불러오기 실패

const INITIALIZE_LECTURE_DIALOG = "LectureReducer/INITIALIZE_LECTURE_DIALOG"; // 강의 Dialog 초기화
const CHANGE_LECTURE_DIALOG_FIELD =
  "LectureReducer/CHANGE_LECTURE_DIALOG_FIELD"; // 강의 Dialog 데이터 변경

export const WRITE_LECTURE = "LectureReducer/WRITE_LECTURE"; // 강의 적기
const WRITE_LECTURE_SUCCESS = "LectureReducer/WRITE_LECTURE_SUCCESS"; // 강의 적기 성공
const WRITE_LECTURE_FAILURE = "LectureReducer/WRITE_LECTURE_FAILURE"; // 강의 적기 실패

export const DELETE_LECTURE = "LectureReducer/DELETE_LECTURE"; // 강의 삭제
const DELETE_LECTURE_SUCCESS = "LectureReducer/DELETE_LECTURE_SUCCESS"; // 강의 삭제 성공
const DELETE_LECTURE_FAILURE = "LectureReducer/DELETE_LECTURE_FAILURE"; // 강의 삭제 실패

export const MODIFY_LECTURE = "LectureReducer/MODIFY_LECTURE"; // 강의 수정
const MODIFY_LECTURE_SUCCESS = "LectureReducer/MODIFY_LECTURE_SUCCESS"; // 강의 수정 성공
const MODIFY_LECTURE_FAILURE = "LectureReducer/MODIFY_LECTURE_FAILURE"; // 강의 수정 실패

// ACTION (타입과 payload들이 저장되는 object)
export const fetchLectures = createAction(FETCH_LECTURES);
export const initializeLectureDialog = createAction(INITIALIZE_LECTURE_DIALOG);
export const changeLectureDialogField = createAction(
  CHANGE_LECTURE_DIALOG_FIELD,
  ({ key, value }) => ({ key, value }),
);
export const writeLecture = createAction(WRITE_LECTURE, (formData) => formData);
export const deleteLecture = createAction(
  DELETE_LECTURE,
  (deleteId) => deleteId,
);
export const modifyLecture = createAction(
  MODIFY_LECTURE,
  (formData) => formData,
);

function* fetchLecturesSaga() {
  // 로딩 시작
  yield put(startLoading(FETCH_LECTURES));

  try {
    // api 호출
    const lectureList = yield call(lectureApi.lectureList);

    // 무조건 1초 이상 대기
    yield delay(1000);

    // 성공
    yield put({
      type: FETCH_LECTURES_SUCCESS,
      payload: lectureList.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: FETCH_LECTURES_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(FETCH_LECTURES));
  }
}

function* writeLectureSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(WRITE_LECTURE));

  try {
    // api 호출
    const res = yield call(lectureApi.writeLecture, formData);

    // 성공
    yield put({
      type: WRITE_LECTURE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: WRITE_LECTURE_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(WRITE_LECTURE));
  }
}

function* deleteLectureSaga({ payload: deleteId }) {
  // 로딩 시작
  yield put(startLoading(DELETE_LECTURE));

  try {
    // api 호출
    yield call(lectureApi.deleteLecture, deleteId);

    // 성공
    yield put({
      type: DELETE_LECTURE_SUCCESS,
    });
  } catch (err) {
    // 실패
    yield put({
      type: DELETE_LECTURE_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(DELETE_LECTURE));
  }
}

function* modifyLectureSaga({ payload: formData }) {
  // 로딩 시작
  yield put(startLoading(MODIFY_LECTURE));

  try {
    // api 호출
    const res = yield call(lectureApi.modifyLecture, formData);

    // 성공
    yield put({
      type: MODIFY_LECTURE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    // 실패
    yield put({
      type: MODIFY_LECTURE_FAILURE,
      payload: { name: err.name, message: err.message, stack: err.stack },
    });
  } finally {
    // 로딩 종료
    yield put(finishLoading(MODIFY_LECTURE));
  }
}

// 초기 state
const initialState = {
  lectureList: [],
  lectureDialog: {
    open: null,
    id: -1,
    title: "",
    thumbnailFile: null,
    previewURL: null,
    inputError: null,
  },
  writeLink: { rel: "", href: "", method: "" },
  modifyLink: { rel: "", href: "", method: "" },
  error: null,
};

// 리듀서 (state값만 변경된다)
// 무조건 HYDRATE 있어야 한다. (next.js의 SSR을 위해서 next-redux-wrapper에서 추가한 action)
const lectureReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload.lecture }),
    [FETCH_LECTURES_SUCCESS]: (state, { payload }) => ({
      ...state,
      lectureList: payload,
      error: null,
    }),
    [FETCH_LECTURES_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [INITIALIZE_LECTURE_DIALOG]: (state) => ({
      ...state,
      lectureDialog: initialState.lectureDialog,
      modifyLink: initialState.modifyLink,
      writeLink: initialState.writeLink,
    }),
    [CHANGE_LECTURE_DIALOG_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        // eslint-disable-next-line no-param-reassign
        draft.lectureDialog[key] = value;
      }),
    [WRITE_LECTURE_SUCCESS]: (state, { payload }) => ({
      ...state,
      writeLink: payload,
      error: null,
    }),
    [WRITE_LECTURE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [DELETE_LECTURE_SUCCESS]: (state) => ({
      ...state,
      error: null,
    }),
    [DELETE_LECTURE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [MODIFY_LECTURE_SUCCESS]: (state, { payload }) => ({
      ...state,
      modifyLink: payload,
      error: null,
    }),
    [MODIFY_LECTURE_FAILURE]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
  },
  initialState,
);

export function* lectureSaga() {
  yield takeLatest(FETCH_LECTURES, fetchLecturesSaga);
  yield takeLatest(WRITE_LECTURE, writeLectureSaga);
  yield takeLatest(DELETE_LECTURE, deleteLectureSaga);
  yield takeLatest(MODIFY_LECTURE, modifyLectureSaga);
}

export default lectureReducer;
