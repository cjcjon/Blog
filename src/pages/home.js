import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from "@redux/sagas/SampleSaga";

function Home() {
  const count = useSelector(({ sample }) => sample);
  const dispatch = useDispatch();

  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onIncreaseAsync = useCallback(() => dispatch(increaseAsync()), [
    dispatch,
  ]);
  const onDecreaseAsync = useCallback(() => dispatch(decreaseAsync()), [
    dispatch,
  ]);

  return (
    <div>
      홈입니다
      <br />
      Count: {count}
      <br />
      <button type="button" onClick={onIncrease}>
        +1
      </button>
      <button type="button" onClick={onDecrease}>
        -1
      </button>
      <button type="button" onClick={onIncreaseAsync}>
        +1 Async
      </button>
      <button type="button" onClick={onDecreaseAsync}>
        -1 Async
      </button>
    </div>
  );
}

export default React.memo(Home);
