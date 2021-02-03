import { createAction, handleActions } from "redux-actions";
import { HYDRATE } from "next-redux-wrapper";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

// ACTION TYPE
const INCREASE = "SampleReducer/INCREASE";
const DECREASE = "SampleReducer/DECREASE";
const INCREASE_ASYNC = "SampleReducer/INCREASE_ASYNC";
const DECREASE_ASYNC = "SampleReducer/DECREASE_ASYNC";

// ACTION (타입과 payload들이 저장되는 object)
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// 마우스 클릭 이벤트가 payload에 들어가지 않도록
// () => undefined를 두 번째 파라미터로 넣어줍니다
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// Saga (비동기 작업이 수행되는 generator, 이를 통해 리듀서가 실행된다)
function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

// 초기 state
const initialState = 3;

// 리듀서 (state값만 변경된다)
// 무조건 HYDRATE 있어야 한다. (next.js의 SSR을 위해서 next-redux-wrapper에서 추가한 action)
const sampleReducer = handleActions(
  {
    [HYDRATE]: (state, action) => ({ ...state, ...action.payload }),
    [INCREASE]: (state) => state + 1,
    [DECREASE]: (state) => state - 1,
  },
  initialState,
);

// 사가 모음 (이곳에서 생성한 사가들을 합쳐줘야 한다)
export function* sampleSaga() {
  // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해줍니다
  yield takeEvery(INCREASE_ASYNC, increaseSaga);

  // takeLatest는 기존에 진행중이던 작업을 취소하고
  // 가장 마지막에 실행된 작업만 수행합니다
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

export default sampleReducer;
