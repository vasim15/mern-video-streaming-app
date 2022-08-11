import { Card, CardContent, Divider, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    paddingBottom: 24,
    backgroundColor: "#80808024",
  }),

  title: {
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(
      2
    )}px `,
  },
  card: {
    width: "100%",
    display: "inline-flex",
  },
  details: {
    display: "inline-block",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    padding: "16px 8px 0px",
  },
  controls: {
    marginTop: "8px",
  },
  data: {
    color: " rgba(0,0,0,0.4)",
  },
  mediaTitle: {
    witheSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "130px",
    fontSize: "1em",
    marginBottom: "5px",
  },
  subheading: {
    color: "rgba(88, 114, 128, 0.67)",
  },
  views: {
    display: "inline",
    lineHeight: "3",
    paddingLeft: "8px",
    color: theme.palette.text.secondary,
  },
}));

const RelatedMedia = ({ media }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root} elevation={4} style={{ padding: "16px" }}>
        <Typography type={"title"} className={classes.title}>
          up Next
        </Typography>
        {media.map((item, i) => (
          <span key={i}>
            <Card className={classes.card}>
              <div style={{ marginRight: "5px", backgroundColor: "black" }}>
                <Link to={"/media/" + item._id}>
                  <ReactPlayer
                    url={"/api/media/video/" + item._id}
                    width="160"
                    heigth="140"
                  />
                </Link>
              </div>
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Link to={"/media/" + item._id}>
                    <Typography
                      type="title"
                      component={"h3"}
                      className={classes.mediaTitle}
                      color={"primary"}
                    >
                      {item.title}
                    </Typography>
                  </Link>
                  <Typography type="subheading" className={classes.subheading}>
                    {item.genre}
                  </Typography>
                  <Typography component="p" className={classes.date}>
                    {new Date(item.created).toDateString()}
                  </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <Typography type='subheading' component='h3' className={classes.views} color='primary'><pre>{item.views} views</pre></Typography>
                </div>
              </div>
            </Card>
            <Divider/>
          </span>
        ))}
      </Paper>
    </div>
  );
};

export default RelatedMedia;
