import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, ButtonBase } from '@material-ui/core';
import useStyles from './style';
import { GuideItem } from './components'
import img1 from "assets/img/slide1.png";

const Guide = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
				<Grid item sm={12}>
					<Typography variant="h4" gutterBottom>
						Pomoc / Przewodnik po aplikacji
					</Typography>
				</Grid>
				<Grid item sm={12} >
					<Grid container spacing={3}>
						<Grid item sm={7}>
							<Typography variant="body1" gutterBottom>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.
							</Typography>
							<Typography variant="body1" gutterBottom>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.
							</Typography>
							<Typography variant="body1" gutterBottom>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.
							</Typography>
						</Grid>
						<Grid item sm={5}>
							<img className={classes.img} alt="map" src={img1} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item sm={12}>
					<Typography variant="h5" gutterBottom color="primary">
						Jak używać?
					</Typography>
				</Grid>
				<Grid item sm={12}>
					<GuideItem/>
					<GuideItem/>
					<GuideItem/>
				</Grid>
			</Grid>
    </div>
  );
};

export default Guide;
