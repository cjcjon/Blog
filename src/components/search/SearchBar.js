import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useErrorStyles } from "@styles/useful.styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    padding: "0.125rem 0.375px",
    margin: "auto",
    marginTop: "3rem",
    marginBottom: "2.5rem",
  },
  input: {
    flex: 1,
    marginLeft: "1rem",
  },
  error: {
    width: "100%",
    maxWidth: "600px",
    margin: "auto",
  },
}));

function SearchBar({ searchName, handleChange, onSubmit, error }) {
  const classes = useStyles();
  const errorStyles = useErrorStyles();

  return (
    <>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={onSubmit}
        elevation={4}
      >
        <InputBase
          className={classes.input}
          name="searchName"
          placeholder="태그로 검색합니다"
          value={searchName}
          onChange={handleChange}
        />
        <IconButton
          type="submit"
          aria-label="searchByTag"
          color="primary"
          style={{ marginRight: "0.25rem" }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {error && (
        <div
          className={clsx(classes.error, errorStyles.defaultError)}
          style={{ marginTop: "1rem" }}
        >
          {error}
        </div>
      )}
    </>
  );
}

export default React.memo(SearchBar);
