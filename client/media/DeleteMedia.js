import { Dialog,
  DialogActions,
  DialogTitle,Button, DialogContent, DialogContentText, IconButton } from '@mui/material';
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import auth from '../auth/auth-helper';
import { remove } from '../user/api-user';

const DeleteMedia = ({mediaId, mediaTitle}) => {
    const [open, setOpen]=useState();
    const [redirect, setRedirect]=useState(false);
    const jwt = auth.isAuthenticated();
    const clickButton=()=>{
        setOpen(true)
    }
    const deleteMedia=()=>{
        const jwt = auth.isAuthenticated()
        remove({mediaId: mediaId},{
            t: jwt.token
        }).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                setRedirect(true)
            }
        })
    }
    const handleRequestClose = () =>{
        setOpen(false)
    }
    if(redirect){
        return (<Navigate to='/'/>)
    }
    return (
      <span>
        <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
          Delete
        </IconButton>
        <Dialog open={open} onClose={handleRequestClose}>
          <DialogTitle>{"Delete" + mediaTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Confirm to delete {mediaTitle} from your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleRequestClose}
              color="primary"
              
            >
              Cancel
            </Button>
            <Button
              onClick={deleteMedia}
              color="secondary"
              autoFocas="autoFocus"
              variant='contained'
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    );
}

export default DeleteMedia
