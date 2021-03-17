import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  highlighted: {
    color: theme.palette.primary.main,
    "& *": {
      fontWeight: "bold",
    },
  },
}));

/**
 * 경로가 같으면 highlight 되는 next link wrapper
 * @param href 이동할 링크 주소
 */
function LinkHighlightWrapper({ href, children }) {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Link href={href} passHref>
      <a className={clsx({ [classes.highlighted]: router.asPath === href })}>
        {children}
      </a>
    </Link>
  );
}

export default React.memo(LinkHighlightWrapper);
