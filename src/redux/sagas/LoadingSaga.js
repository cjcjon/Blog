import { createAction, handleActions } from "redux-actions";

const START_LOADING = "LoadingReducer/START_LOADING";
const FINISH_LOADING = "LoadingReducer/FINISH_LOADING";

// 요청되는 action 타입을 payload로 관리하게 됩니다
// 요청되면 해당 타입이 true가 되고, 끝나면 false가 됩니다.

export const startLoading = createAction(
  START_LOADING,
  (requestType) => requestType,
);
export const finishLoading = createAction(
  FINISH_LOADING,
  (requestType) => requestType,
);

const initialState = {};

const loadingReducer = handleActions(
  {
    [START_LOADING]: (state, action) => ({ ...state, [action.payload]: true }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loadingReducer;
