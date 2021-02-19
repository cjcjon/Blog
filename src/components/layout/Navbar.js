import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import LinkButton from "@components/links/LinkButton";
import LinkExternalButton from "@components/links/LinkExternalButton";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    /* SASS에서 자기 자신의 선택자는 &이다 */
    /* *는 모든 선택자, SASS에서 + 는 인접형제 선택자 */
    "& * + *": {
      marginLeft: theme.spacing(4),
    },
  },
}));

const paths = [
  { text: "Default", path: "/" },
  { text: "Lectures", path: "/lectures" },
];

const externalPaths = [{ text: "Github", path: "https://github.com" }];

function Navbar() {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      p={1}
      bgcolor="background.paper"
      justifyContent="center"
      alignItems="center"
      className={classes.flexBox}
    >
      {paths.map(({ text, path }) => (
        <LinkButton key={text} href={path} text={text} />
      ))}
      {externalPaths.map(({ text, path }) => (
        <LinkExternalButton key={text} href={path} text={text} black />
      ))}
    </Box>
  );
}

export default React.memo(Navbar);
