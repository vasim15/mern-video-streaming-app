import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  IconButton,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Edit} from "@mui/icons-material";

import auth from "../auth/auth-helper";
import { Link } from "react-router-dom";
import MediaPlayer from "./MediaPlayer";
import DeleteMedia from "./DeleteMedia";

const useStyles = makeStyles((theme)=>({
  card: {
    padding: "20px",
  },
  header: {
    padding: "0px 16px 16px 12px",
  },
  action: {
    margin: "24px 20px 0px 0px",
    display: "inline-block",
    fontSize: "1.15em",
    color: theme.palette.secondary.dark,
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
}));

const Media = ({ media, nextUrl, handleAutoPlay }) => {
  const classes = useStyles();

  const mediaUrl = media._id ? `/api/media/video/${media._id}` : null;

  return (
    <Card>
      <CardHeader
        title={media.title}
        action={<span>{media.views + "views"}</span>}
        subheader={media.genre}
      />
      <MediaPlayer
        srcUrl={mediaUrl}
        nextUrl={nextUrl}
        handleAutoPlay={handleAutoPlay}
      />
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.action}>
              {media.postedBy.name && media.postedBy.name[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={media.postedBy.name}
            secondary={"Published on" + new Date(media.created).toDateString()}
          />

          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == media.postedBy._id && (
              <ListItemSecondaryAction>
                <Link to={"/media/edit/" + media._id}>
                  <IconButton aria-label="Edit" color="secondary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteMedia mediaId={media._id} mediaTitle={media.title} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary={media.description} />
        </ListItem>
      </List>
    </Card>
  );
};

export default Media;
