import { IconButton, Icon, LinearProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useRef, useState } from "react";
import {
  Replay,
  PlayArrow,
  Pause,
  VolumeOff,
  VolumeDown,
  VolumeUp,
  SkipNext,
  VolumeMute,
  Loop,
  Fullscreen
} from "@mui/icons-material";
// import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
// import screenfull from "screenfull";

const useStyle = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  primaryDashed: {
    background: "none",
    backgroundColor: theme.palette.secondary.main,
  },
  primaryColor: {
    backgroundColor: "#6969694f",
  },
  dashed: {
    animation: "none",
  },
  controls: {
    position: "relative",
    backgroundColor: "#ababab52",
  },
  rangeRoot: {
    position: "absolute",
    width: "100%",
    top: "-7px",
    zIndex: "3456",
    "-webkit-appearance": "none",
    backgroundColor: "rgba(0,0,0,0)",
  },
  videoError: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.primary.light,
  },
}));
const MediaPlayer = ({ srcUrl, handleAutoplay, nextUrl }) => {
  const classes = useStyle();
  const [playing, setPlaying] = useState();
  const [volume, setVolume] = useState();
  const [muted, setMuted] = useState();
  const [duration, setDuration] = useState();
  const [seeking, setSeeking] = useState();
  const [playbackRate, setPlaybackRate] = useState();
  const [loop, setLoop] = useState();
  const [fullscreen, setFullscreen] = useState();
  const [videoError, setVideoError] = useState();
  const [values, setValues] = useState({
    played: 0,
    loaded: 0,
    ended: false,
  });
  let playerRef = useRef(null);

  // useEffect(() => {
  //   // if (screenfull.isEnabled) {
  //   //   screenfull.on("change", () => {
  //   //     let fullscreens = screenfull.isFullscreen ? true : false;
  //   //     // setFullscreen(fullscreens);
  //   //   });
  //   // }
  // }, []);

  useEffect(() => {
    setVideoError(false);
  }, [srcUrl]);

  const changeVolume = (e) => {
    setVolume(parseFloat(e.target.value));
  };
  const playPause = () => {
    setPlaying(!playing);
  };
  const onLoop = () => {
    setLoop(!loop);
  };
  const onProgress = (progress) => {
    if (!seeking) {
      setValues({
        ...values,
        played: progress.played,
        loaded: progress.loaded,
      });
    }
  };
  const onClickFullscreen = () => {
    // screenfull.request(findDOMNode(playerRef));
  };
  const toggleMuted = () => {
    setMuted(!muted);
  };
  const onEnded = () => {
    if (loop) {
      setPlaying(true);
    } else {
      handleAutoplay(() => {
        setValues({ ...values, ended: true });
        setPlaying(false);
      });
    }
  };
  const onDuration = (d) => {
    setDuration(d);
  };
  const onSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.seekTo(parseFloat(e.target.value));
  };
  const onSeekMouseDown = (e) => {
    setSeeking(true);
  };
  const onSeekChange = (e) => {
    setSeeking(false);
    playerRef.seekTo(parseFloat(e.target.value));
  };
  const ref = (player) => {
    playerRef = player;
  };
  const format = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    const ss = ("0" + date.getUTCSeconds()).slice(-2);
    if (hh) {
      mm = "0" + date.getUTCMinutes().slice(-2);
      return `${hh}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  const showVideoError = (e) => {
    console.log(e);
    setVideoError(true);
  };

  return (
    <div>
      {videoError && (
        <p className={classes.videoError}>Video Error. Try again later.</p>
      )}
      <div className={classes.flex}>
        <ReactPlayer
          ref={ref}
          width={fullscreen ? "100%" : "inherit"}
          height={fullscreen ? "100%" : "inherit"}
          style={fullscreen ? { position: "relative" } : { maxHeight: "500px" }}
          config={{
            attributes: { style: { height: "100%", width: "100%" } },
          }}
          url={srcUrl}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          valume={volume}
          muted={muted}
          onEnded={onEnded}
          onError={showVideoError}
          onProgress={onProgress}
          onDuration={onDuration}
        />
        <br />
      </div>
      <div className={classes.controls}>
        <LinearProgress
          color="primary"
          variant="buffer"
          value={values.played * 100}
          valueBuffer={values.loaded * 100}
          style={{ width: "100%" }}
          classes={{
            colorPrimary: classes.primaryColor,
            dashedColorPrimary: classes.primaryColor,
            dashed: classes.dashed,
          }}
        />
        <input
          type="range"
          min={0}
          max={1}
          value={values.played}
          step="any"
          onMouseDown={onSeekMouseDown}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
          className={classes.rangeRoot}
        />
        <IconButton color="primary" onClick={playPause}>
          <Icon>
            {playing ? <Pause /> : values.ended ? <Replay /> : <PlayArrow />}
          </Icon>
        </IconButton>
        <IconButton
          component={Link}
          to={nextUrl}
          disabled={!nextUrl}
          color="primary"
        >
          {/* <Link to={nextUrl} style={{ color: "inherit" }}> */}
          <Icon>
            <SkipNext />
          </Icon>
          {/* </Link> */}
        </IconButton>
        <IconButton color="primary" onClick={toggleMuted}>
          <Icon>
            {muted ? (
              <VolumeOff />
            ) : volume > 0 ? (
              <VolumeUp />
            ) : volume == 0 ? (
              <VolumeDown />
            ) : (
              <VolumeMute />
            )}
          </Icon>
        </IconButton>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={muted ? 0 : volume}
          onChange={changeVolume}
          style={{ verticalAlign: "middle" }}
        />
        <IconButton color={loop ? "primary" : "default"} onClick={onLoop}>
          <Icon>
            <Loop />
          </Icon>
        </IconButton>
        <IconButton color="primary" onClick={onClickFullscreen}>
          <Icon><Fullscreen/></Icon>
        </IconButton>
        <span style={{ float: "right", padding: "10px", color: "#b83423" }}>
          <time dateTime={`P${Math.round(duration * values.played)}S`}>
            {format(duration * values.played)}
          </time>
          /
          <time dateTime={`P${Math.round(duration)}S`}>{format(duration)}</time>
        </span>
      </div>
    </div>
  );
};

export default MediaPlayer;
