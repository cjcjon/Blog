import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  initializeForm,
  changeField,
  userLogin,
  USER_LOGIN,
} from "@redux/sagas/LoginSaga";
import LoadingBackdrop from "@components/commons/LoadingBackdrop";
import LoginForm from "./LoginForm";

function LoginFormContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userName, password, nextLink, loginError } = useSelector(
    ({ login }) => ({
      userName: login.userName,
      password: login.password,
      nextLink: login.nextLink,
      loginError: login.loginError,
    }),
  );
  const loginLoading = useSelector(({ loading }) => loading[USER_LOGIN]);

  // 처음에 들어오면 항상 초기화
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  // 로그인으로 링크 돌려받았으면 이동
  useEffect(() => {
    if (nextLink) {
      router.push(nextLink.href);
    }
  }, [nextLink, dispatch, router]);

  const onChangeField = useCallback(
    (e) => {
      const { value, name } = e.target;
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("password", password);
      dispatch(userLogin(formData));
    },
    [dispatch, userName, password],
  );

  return (
    <>
      <LoginForm
        formData={{ userName, password }}
        onChange={onChangeField}
        onSubmit={onSubmit}
        loginError={loginError}
      />
      <LoadingBackdrop open={loginLoading} />
    </>
  );
}

export default React.memo(LoginFormContainer);
