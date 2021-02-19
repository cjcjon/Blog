import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
  lectureTitle: {
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

function PostViewerAccordion({ lectureInfo, postList }) {
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
          aria-controls="lecturePostList"
          id="lecturePostHeader"
        >
          <LinkWrapper href={`/lectures/${lectureInfo.id}/posts`}>
            <Typography variant="h6" className={classes.lectureTitle}>
              {lectureInfo.title} 목차
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
