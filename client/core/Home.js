import React, {useState ,useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import { Typography, Card } from "@mui/material";
import MediaList from '../media/MediaList';
import {listPopular} from '../media/api-media';



const useStyles = makeStyles((theme) => ({
  card: {
    margin: `${theme.spacing(5)}px 30px`,
  },
  title:{
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px 0px`,
    color:theme.palette.text.secondary,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}));

const Home = () => {
    const classes = useStyles();
    const [media, setMedia] = useState([]);

    useEffect(()=>{
      const abortController = new AbortController()
      const signal = abortController.signal
      listPopular(signal).then((data)=>{
        console.log(data,'resdata')
        if(data.error){
        }else{
          setMedia(data)
        }
      })
      return ()=>{
          abortController.abort()
      }
    },[]);

    return (
        <Card className={classes.card}>
          <Typography variant='h2' className={classes.title}>
            Popular Videos
          </Typography>
          <MediaList media={media}/>
        </Card>
    )
}

export default Home
