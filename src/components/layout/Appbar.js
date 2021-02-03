import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  title: {
    flex: 1,
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(2),
    },
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

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar disableGutters>
        <Typography variant="h4" className={classes.title}>
          Blog
        </Typography>
        <IconButton aria-label="search">
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" className={classes.loginButton}>
          로그인
        </Button>
        {/* TODO: 로그인 했을경우 로그아웃만 띄우기 */}
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Appbar);
