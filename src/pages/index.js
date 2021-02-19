import { END } from "redux-saga";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@redux/Store";
import { loadInitialData } from "@redux/sagas/MainSaga";
import Banner from "@src/components/Banner";
import TagListContainer from "@src/components/main/tags/TagListContainer";
import RecentPostContainer from "@src/components/main/recentPosts/RecentPostsContainer";
import RecommandLecturesContainer from "@src/components/main/recommand/RecommandLecturesContainer";
import RecommandPostsContainer from "@src/components/main/recommand/RecommandPostsContainer";
import MostViewsContainer from "@src/components/main/mostViews/MostViewsContainer";
import DailyVisitPanel from "@components/main/dailyVisits/DailyVisitPanel";
import RecentCommentPanel from "@components/main/recentComments/RecentCommentPanel";
import { useSizeStyles } from "@styles/useful.styles";

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
            <DailyVisitPanel />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RecentCommentPanel />
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

export const getServerSideProps = Store.getServerSideProps(
  async ({ store }) => {
    // 초기 데이터 불러오기
    store.dispatch(loadInitialData());
    store.dispatch(END);

    await store.sagaTask.toPromise();
  },
);

export default index;
