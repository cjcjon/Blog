import React, { useState, useCallback } from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowLeftRoundedIcon from "@material-ui/icons/ArrowLeftRounded";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import LinkWrapper from "@components/links/LinkWrapper";
import LinkHighlightWrapper from "@components/links/LinkHighlightWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fafafc",
  },
  accordion: {
    backgroundColor: "#fafafc",
    margin: "0 !important",
    padding: "0 0.5rem",
  },
  seriesTitle: {
    fontWeight: "bold",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  postList: {
    margin: "0",
    paddingInlineStart: "12px",
    listStyleType: "disc",
    "& li": {
      marginBottom: "0.25rem",
      paddingLeft: "0.25rem",
      "&:hover": {
        textDecoration: "underline",
      },
      "&::marker": {
        color: theme.palette.grey[600],
      },
    },
  },
}));

function PostViewerAccordion({ seriesInfo, postList }) {
  const classes = useStyles();

  const [expanded, setExpanded] = useState(false);
  const accordionName = "classPost";

  const handleChange = useCallback(
    (panelName) => (event, isExpanded) => {
      setExpanded(isExpanded ? panelName : false);
    },
    [expanded],
  );

  return (
    <Paper variant="outlined" className={classes.root}>
      <Accordion
        expanded={expanded === accordionName}
        onChange={handleChange(accordionName)}
        elevation={0}
        className={classes.accordion}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="seriesPostList"
          id="seriesPostHeader"
        >
          <LinkWrapper href={`/series/${seriesInfo.id}/posts`}>
            <Typography variant="h6" className={classes.seriesTitle}>
              {seriesInfo.title} 목차
            </Typography>
          </LinkWrapper>
        </AccordionSummary>
        <AccordionDetails>
          <ol className={classes.postList}>
            {postList &&
              postList.map((data) => (
                <LinkHighlightWrapper key={data.id} href={`/posts/${data.id}`}>
                  <li>
                    <Typography variant="subtitle1">{data.title}</Typography>
                  </li>
                </LinkHighlightWrapper>
              ))}
          </ol>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}

export default React.memo(PostViewerAccordion);
