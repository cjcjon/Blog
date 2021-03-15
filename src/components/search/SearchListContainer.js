import React from "react";
import { useSelector } from "react-redux";
import SearchList from "./SearchList";

function SearchListContainer() {
  const searchData = useSelector(({ search }) => search.searchData);

  return <SearchList postList={searchData} />;
}

export default SearchListContainer;
