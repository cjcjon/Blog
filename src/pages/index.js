import { END } from "redux-saga";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@redux/Store";
import { loadInitialData } from "@redux/sagas/MainSaga";
import Banner from "@src/components/Banner";
import TagListContainer from "@src/components/main/tags/TagListContainer";
import RecentPostContainer from "@src/components/main/recentPosts/RecentPostContainer";
import RecommandSeriesContainer from "@src/components/main/recommand/RecommandSeriesContainer";
import RecommandPostContainer from "@src/components/main/recommand/RecommandPostContainer";
import MostViewContainer from "@src/components/main/mostView/MostViewContainer";
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
        1. About (끝)
        2. Tags (끝)
        3. Most viewed pages
        4. Recent comments
        5. Daily visitors diagram
        6. Social (해야함)
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
            <RecommandSeriesContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RecommandPostContainer />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MostViewContainer />
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
