import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import useActive from "@src/hooks/useActive";

const useStyles = makeStyles((theme) => ({
  toc: {
    display: "none",
    left: "calc(50% + 440px)",
    top: "0",
    marginTop: "80px",
    width: "175px",
    padding: "16px 16px 16px 0",
    position: "absolute",
    overflowY: "auto",
    "@media (min-width: 1280px)": {
      display: "block",
    },
  },
  fixed: {
    position: "fixed",
    marginTop: "0",
  },
  tocUl: {
    margin: "0",
    padding: "0",
    listStyle: "none",
  },
  tocLi: {
    fontSize: "0.85rem",
    color: theme.palette.grey[400],
    padding: "0.0625rem 0 0.0625rem 1rem",
    borderLeft: "3px solid transparent",
    boxSizing: "border-box",
    transition: "fontSize 0.3s, color 0.3s",
    msTransition: "fontSize 0.3s, color 0.3s",
    MozTransition: "fontSize 0.3s, color 0.3s",
    WebkitTransition: "fontSize 0.3s, color 0.3s",
  },
  active: {
    fontSize: "0.95rem",
    color: theme.palette.common.black,
    borderLeftColor: theme.palette.grey[600],
  },
  tocLih1: {
    paddingLeft: "0",
  },
  tocLih2: {
    paddingLeft: "1rem",
  },
  tocLih3: {
    paddingLeft: "2rem",
  },
}));

function PostViewerTOC({ navContents, idList }) {
  const classes = useStyles();

  const [fixed, setFixed] = useState(false);
  const activeId = useActive(idList);
  const ref = useRef(null);
  const timer = useRef(null);

  const handleScroll = useCallback(() => {
    // 10ms로 쓰로틀링
    if (!timer.current && ref.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
        setFixed(window.scrollY >= 274);
      }, 10);
    }
  }, []);

  useEffect(() => {
    if (navContents) {
      // 고정시킬 스크롤 이벤트 만들기
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // 스크롤 이벤트 해제
      if (navContents) {
        window.removeEventListener("scroll", () => handleScroll);
      }
    };
  }, [navContents, handleScroll]);

  return (
    <nav
      className={clsx(classes.toc, { [classes.fixed]: fixed })}
      aria-label="Page table of contents"
      ref={ref}
    >
      <ul className={classes.tocUl}>
        {navContents &&
          navContents.map((data) => {
            const cn =
              data.tag === "h1"
                ? classes.tocLih1
                : data.tag === "h2"
                ? classes.tocLih2
                : classes.tocLih3;
            return (
              <li
                className={clsx(classes.tocLi, {
                  [classes.active]: activeId === data.id,
                })}
                key={data.id}
              >
                <a href={`#${data.id}`}>
                  <div className={cn}>{data.content}</div>
                </a>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

export default React.memo(PostViewerTOC);
