import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Edit } from "@mui/icons-material";

import {
  Typography,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  List,
  Paper,
  ListItemSecondaryAction,
} from "@mui/material";
import auth from "../auth/auth-helper";
import { read } from "./api-user";
import { Link, Navigate, useParams } from "react-router-dom";
import { listByUser } from "../media/api-media";
import MediaList from "../media/MediaList";
import DeleteUser from './DeleteUser';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },

  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const params = useParams();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      console.log('DATA', data)
      if (data && data.error) {
        // setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByUser(
      {
        userId: params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setMedia(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [params.userId]);

  console.log('param', params)

  // if (redirectToSignin) {
  //   return <Navigate to="/signin" />;
  // }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.avatar}>
              {user.name && user.name[0]}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} secondary={user.email} />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.created).toDateString()}
          />
        </ListItem>
        <MediaList media={media} />
      </List>
    </Paper>
  );
};

export default Profile;
