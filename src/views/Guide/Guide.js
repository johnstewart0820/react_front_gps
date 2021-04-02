import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './style';

const Guide = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      guide
    </div>
  );
};

export default Guide;
