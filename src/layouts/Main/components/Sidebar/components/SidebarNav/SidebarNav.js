/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, Typography, Collapse } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { SubItembar } from './components';

const useStyles = makeStyles(theme => ({
	root: {},
	
}));

const SidebarNav = props => {
	const { pages, className, history, ...rest } = props;

	const classes = useStyles();

	return (
		<List
			{...rest}
			className={clsx(classes.root, className)}
		>
			{pages.map(page => (
			<SubItembar page={page} />
			))}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SidebarNav;
