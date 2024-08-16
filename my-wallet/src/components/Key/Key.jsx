import React, { useState } from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
export default function Key({value,keyVal}) {
    const [showPrivate,setShowPrivate] =useState(false);
    const handleClickShowPrivate=(e)=>{
        e.preventDefault();
        setShowPrivate(!showPrivate);
      }
  return (
    <div>
         <TextField
      fullWidth
      label={keyVal}
      variant="outlined"
      type={showPrivate ? 'text' : 'password'}
      value={value}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPrivate}
              edge="end"
            >
              {showPrivate ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
    </div>
  )
}
