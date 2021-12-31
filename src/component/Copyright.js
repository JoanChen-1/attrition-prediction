import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Copyright(props) {
   const { productName } = props;

    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
          {productName}
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }