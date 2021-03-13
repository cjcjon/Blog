import React, { useCallback } from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@redux/sagas/UserSaga";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  title: {
    cursor: "pointer",
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
    },
  },
  blank: {
    flex: 1,
  },
  loginButton: {
    marginLeft: theme.spacing(1),
    marginRight: "0",
    [theme.breakpoints.up("sm")]: {
      marginRight: theme.spacing(2),
    },
  },
}));

function Appbar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(userLogout());
  }, [dispatch]);

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar disableGutters>
        <Link href="/">
          <Typography variant="h4" className={classes.title}>
            Blog
          </Typography>
        </Link>
        <div className={classes.blank} />
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
        {user ? (
          <Button
            variant="outlined"
            className={classes.loginButton}
            onClick={onLogout}
          >
            로그아웃
          </Button>
        ) : (
          <Link href="/login">
            <Button variant="outlined" className={classes.loginButton}>
              로그인
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
