import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { delay, takeLatest } from "redux-saga/effects";

const INITIALIZE = "WritePostReducer/INITIALIZE"; // 내용 초기화
const CHANGE_FIELD = "WritePostReducer/CHANGE_FIELD"; // key 값 변경
const SAMPLE = "WritePostreducer/SAMPLE";

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD);
export const sample = createAction(SAMPLE);

function* sampleSaga() {
  yield delay(1000);
  console.log("1000");
}

const initialState = {
  title: "",
  body: "",
  tags: [],
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
  },
  initialState,
);

export function* writePostSaga() {
  yield takeLatest(SAMPLE, sampleSaga());
}

export default writePostReducer;
