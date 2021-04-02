import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './style';
import img1 from "assets/img/slide1.png";

const GuideItem = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
				<Grid item xs></Grid>
				<Grid item sm={8}>					
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<img className={classes.img} alt="map" src={img1} />
						</Grid>
						<Grid item xs={6}>
							<Typography variant="h6" gutterBottom color="primary">
								Krok 1 Zaloz konto
							</Typography>
							<Typography variant="body1" gutterBottom>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs></Grid>
			</Grid>
    </div>
  );
};

export default GuideItem;
