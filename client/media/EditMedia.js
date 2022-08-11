import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React,{useEffect, useState} from 'react'
import { Navigate, useParams } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { update, read } from './api-media'


const useStayle = makeStyles(theme=>({
    card: {
        maxWidth: 500,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(2)
    },
    title:{
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize:'1em',

    },
    error:{
        verticalAlign:'middle'
    },
    textField:{
        marginLeft:theme.spacing(1),
        marginRight:theme.spacing(1),
        width:300
    },
    submit:{
        margin:'auto',
        marginBottom:theme.spacing(2)
    },
    input:{
        display:'none'
    },
    filename:{
        marginLeft:10
    }
}))

const EditMedia = ({match}) => {
    const params = useParams()
    const classes = useStayle()
    const [media, setMedia] = useState({
        title:'',
        discription:'',
        genre:''
    })
    const [redirect, setRedirect] = useState(false)
    const [error, setError]= useState('')
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({mediaId: params.mediaId}).then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setMedia(data)
            }
        })
        return () => {
            abortController.abort();
        }
    }, [params.mediaId])
    const clickSubmit =()=>{
        const jwt = auth.isAuthenticated()
        update({
            mediaId: media._id
        },{
            t: jwt.token

        }, media).then((data)=>{
            if(data.error){
                setError(data.error)
            }else{
                setRedirect(true);
            }
        })
    }
    const handleChange = name => event=>{
        let updateMedia = {...media}
        updateMedia[name]=event.target.value
        setMedia(updateMedia);
    }
    if(redirect){
        return (<Navigate to={'/media/'+media._id} />)
    }
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component={classes.title}>
              Edit Video Details
            </Typography>
            <TextField
              id="title"
              label="Title"
              className={classes.textField}
              value={media.title}
              onChange={handleChange("title")}
              margin="normal"
            />
            <br />
            <TextField
              id="multiline-flexible"
              label="Description"
              multiline
              rows={2}
              value={media.description}
              onChange={handleChange("description")}
              className={classes.textField}
              margin="normal"
            />
            <br />
            <TextField
              id="genre"
              label="Genre"
              className={classes.textField}
              value={media.genre}
              onChange={handleChange("genre")}
              margin="normal"
            />
            <br />{
                error && (
                    <Typography component='p' color="error">
                        {error}
                    </Typography>
                )
            }
          </CardContent>
          <CardActions>
              <Button color='primary' variant='contained' onClick={clickSubmit} className={classes.submit}>
                  Submit
              </Button>
          </CardActions>
        </Card>
      </div>
    );
}

export default EditMedia
