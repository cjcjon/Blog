import React from "react";
import { END } from "redux-saga";
import { makeStyles } from "@material-ui/core/styles";
import { useSizeStyles } from "@styles/useful.styles";
import Grid from "@material-ui/core/Grid";
import Banner from "@src/components/Banner";
import TagListContainer from "@src/components/main/tags/TagListContainer";
import RecentPostContainer from "@src/components/main/recentPosts/RecentPostsContainer";
import RecommandLecturesContainer from "@src/components/main/recommand/RecommandLecturesContainer";
import RecommandPostsContainer from "@src/components/main/recommand/RecommandPostsContainer";
import MostViewsContainer from "@src/components/main/mostViews/MostViewsContainer";
import DailyVisitContainer from "@src/components/main/dailyVisits/DailyVisitContainer";
import Store from "@redux/Store";
import { setSSRCookies } from "@src/axios";
import { checkLogin } from "@redux/sagas/UserSaga";
import { loadInitialData } from "@redux/sagas/MainSaga";

const useStyles = makeStyles((theme) => ({
  contentsRoot: {
    marginTop: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(3),
    },
  },
  leftContents: {
    margin: "0",
    order: "2",
    [theme.breakpoints.up("sm")]: {
      order: "1",
    },
  },
  rightContents: {
    margin: "0",
    order: "1",
    [theme.breakpoints.up("sm")]: {
      order: "2",
    },
  },
}));

function index() {
  const classes = useStyles();
  const sizeStyles = useSizeStyles();

  return (
    <>
      {/* 그림 배너 */}
      <Banner imageUrl="test" text="마구잡이 블로그" />

      {/* 최근 작성 글 패널 */}
      <RecentPostContainer />

      {/* 
        표시될 하부 컴포넌트들
        1. 추천 강의 목록
        2. 추천 포스트 목록
        3. 조회수 많은 포스트 목록
        4. 일일 방문자
        5. 최신 댓글 목록
        6. 태그 목록
      */}
      <Grid container spacing={2} className={classes.contentsRoot}>
        <Grid
          container
          item
          spacing={2}
          xs={12}
          sm={9}
          className={classes.leftContents}
        >
          <Grid item xs={12} sm={6}>
            <RecommandLecturesContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RecommandPostsContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MostViewsContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DailyVisitContainer />
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justify="flex-start"
          alignItems="stretch"
          spacing={2}
          xs={12}
          sm={3}
          className={classes.rightContents}
        >
          <Grid item className={sizeStyles.fullWidth}>
            <TagListContainer />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const getServerSideProps = Store.getServerSideProps(async (context) => {
  // 쿠키 설정
  setSSRCookies(context);

  // 로그인 정보 가져오기
  const cookie = context.req ? context.req.headers.cookie : "";
  const token = cookie
    ? cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")
    : null;
  if (token) {
    context.store.dispatch(checkLogin());
  }

  // 초기 데이터 불러오기
  context.store.dispatch(loadInitialData());
  context.store.dispatch(END);

  await context.store.sagaTask.toPromise();
});

export default index;
