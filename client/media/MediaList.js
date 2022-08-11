import { makeStyles } from "@mui/styles";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
    textAlign: "left",
    padding: "8px 16px",
  },
  gridList: {
    width: "100%",
    minHeight: 180,
    padding: "0px 0 10px",
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    width: "100%",
  },
  tile: {
    textAlign: "center",
    maxHeight: "100%",
  },
  tileBar: {
    backgroundColor: "rgba(0, 0, 0, 0.72)",
    textAlign: "left",
    height: "55px",
  },
  tileTitle: {
    fontSize: "1.1em",
    marginBottom: "5px",
    color: "rgb(193, 173, 144)",
    display: "block",
  },
  tileGenre: {
    float: "right",
    color: "rgb(193, 182, 164)",
    marginRight: "8px",
  },
}));

const MediaIList = ({ media }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList className={classes.imageList}>
        {media?.map((list, i) => (
          <ImageListItem key={i}>
            <Link to={"/media/" + list._id}>
              <ReactPlayer
                url={"/api/media/video/" + list._id}
                width="100%"
                height="inherit"
                style={{ maxHeight: "100%" }}
              />
            </Link>
            <ImageListItemBar
              title={
                <Link to={"/media/" + list._id} className={classes.listTitle}>
                  {list.title}
                </Link>
              }
              subtitle={
                <span>
                  <span>{list.views} views</span>
                  <span className={classes.listGener}>
                    <em>{list.genre}</em>
                  </span>
                </span>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default MediaIList;
