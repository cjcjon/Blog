import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { changeField, searchPost } from "@redux/sagas/SearchSaga";
import SearchBar from "./SearchBar";

function SearchBarContainer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { searchName, error } = useSelector(({ search }) => search);

  const handleSearchInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeField({ key: name, value }));
    },
    [dispatch],
  );

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (searchName === "") {
        dispatch(
          changeField({
            key: "error",
            value: { message: "입력어는 한글자 이상 입력하세요" },
          }),
        );
        return;
      }

      await dispatch(searchPost(searchName));
      router.push(
        { pathname: "/search", query: { searchKey: searchName } },
        undefined,
        { shallow: true },
      );
    },
    [dispatch, router, searchName],
  );

  return (
    <SearchBar
      searchName={searchName}
      handleChange={handleSearchInput}
      onSubmit={onSubmit}
      error={error}
    />
  );
}

export default SearchBarContainer;
