import { FormControlLabel, Grid, Switch } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React,{useState,useEffect} from "react";
import { read, listRelated } from "./api-media";
import Media from "./Media";
import RelatedMedia from "./RelatedMedia";
import { useParams } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  root: {
    flewGrow: 1,
    margin: 30,
  },
  toggle: {
    float: "right",
    marginRight: 30,
    marginTop: 10,
  },
}));

const PlayMedia = ({ data }) => {
  const params = useParams();
  const classes = useStyle();
  const [media, setMedia] = useState({ postedBy: {} });
  const [relatedMedia, setRelatedMedia] = useState([]);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    read({ mediaId: params.mediaId }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setMedia(data);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [params.mediaId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listRelated({ mediaId: params.mediaId }, signal).then((data) => {
        console.log(data.error, "related");

      if (data.error) {
        console.log(data.error, 'related');
      } else {
        setRelatedMedia(data);
      }
    });
    return () => {
      abortController.abort();
    };
  }, [params.mediaId]);

  const handleChange = (e) => {
    setAutoPlay(e.target.checked);
  };
  const handleAutoPlay = (v) => {
    const playList = relatedMedia;
    const playMedia = playList[0];
    if (!autoPlay || playList.length == 0) {
      return v();
    }
    if (playList.length > 1) {
      playList.shift();
      setMedia(playMedia);
      setRelatedMedia(playList);
    } else {
      listRelated({
        mediaId: playMedia._id,
      }).then((d) => {
        if (d.error) {
          console.log(d.error);
        } else {
          setMedia(playMedia);
          setRelatedMedia(d);
        }
      });
    }
  };
  if (data && data[0] != null) {
    media = data[0];
    relatedMedia = [];
  }

  const nextUrl =
    relatedMedia.length > 0 ? `/media/${relatedMedia[0]._id}` : '';

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={8} sm={8}>
          <Media
            media={media}
            nextUrl={nextUrl}
            handleAutoPlay={handleAutoPlay}
          />
        </Grid>
        {relatedMedia.length > 0 && (
          <Grid item xs={4} sm={4}>
            <FormControlLabel
              className={classes.toggle}
              control={
                <Switch
                  checked={autoPlay}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={autoPlay ? "Autoplay ON" : "Autoplay OFF"}
            />
            <RelatedMedia media={relatedMedia} />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default PlayMedia;
