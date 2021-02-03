import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";

const INITIALIZE = "WritePostReducer/INITIALIZE"; // 내용 초기화
const CHANGE_FIELD = "WritePostReducer/CHANGE_FIELD"; // key 값 변경

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD);

const initialState = {
  title: "",
  body: "",
  tags: [],
};

const writePostReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
    [INITIALIZE]: () => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
  },
  initialState,
);

export default writePostReducer;
