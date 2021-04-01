import React, { useState, useEffect } from "react";
import { useTheme } from '@material-ui/styles';
import useStyles from './style';

const Sidebar = props => {

	const theme = useTheme();
	const classes = useStyles(theme);
	
	return (
		<div className={classes.container}>
			
		</div>
	);
}
export default Sidebar;
