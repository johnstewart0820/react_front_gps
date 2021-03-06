/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState, } from 'react';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, Typography, Collapse } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles(theme => ({
	root: {},
	item: {
		display: 'flex',
		paddingTop: 0,
		paddingBottom: 0
	},
	label: {
		padding: '16px 32px',
		justifyContent: 'flex-start',
		color: theme.palette.sidebar_title_color,
		fontFamily: 'roboto',
		fontSize: '0.8125em'
	},
	title: {
		width: '180px'
	},
	button: {
		padding: '16px 32px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '270px',
		fontWeight: 400,
		fontSize: '0.8750em',
		color: theme.palette.sidebar_color,
		lineHeight: '1em',
		'& path': {
			fill: theme.palette.sidebar_title_color,
		},
		'&:hover': {
			backgroundColor: theme.palette.green,
			color: theme.palette.sidebar_hover_color,
			fontWeight: 400,
			borderRadius: '0px',

			'& $icon': {
				color: theme.palette.sidebar_hover_color,
				'& path': {
					fill: theme.palette.sidebar_hover_color,
				}
			},
		},
	},
	icon: {
		color: theme.palette.sidebar_color,
		width: 20,
		height: 20,
		display: 'flex',
		alignItems: 'center',
		marginRight: theme.spacing(3),
		backgroundRepeat: 'no-repeat',

		'&:hover': {
			color: theme.palette.sidebar_hover_color,
			'& path': {
				fill: theme.palette.sidebar_hover_color,
			}
		},
	},
	active: {
		fontWeight: 400,
		'& path': {
			fill: theme.palette.sidebar_hover_color,
		},
		'& $icon': {
			color: theme.palette.sidebar_hover_color,
		},
		backgroundColor: theme.palette.green,
		color: `${theme.palette.sidebar_hover_color} !important` ,
		borderRadius: '0px'
	},
	active_sub: {

	},
	sub_list: {
		padding: '0px'
	},
	button_sub: {
		padding: '10px 16px 10px 30px',
		justifyContent: 'flex-start',
		textTransform: 'none',
		letterSpacing: 0,
		width: '270px',
		fontWeight: 400,
		fontSize: '0.8750em',
		color: theme.palette.sidebar_color,
		lineHeight: '1em',
		'& path': {
			fill: theme.palette.sidebar_title_color,
		},
		'&:hover': {
			backgroundColor: theme.palette.green,
			color: theme.palette.sidebar_hover_color,
			fontWeight: 400,
			borderRadius: '0px',

			'& $icon': {
				color: theme.palette.sidebar_hover_color,
				'& path': {
					fill: theme.palette.sidebar_hover_color,
				}
			},
		},
	},
}));

const CustomRouterLink = forwardRef((props, ref) => (
	<div
		ref={ref}
		style={{ flexGrow: 1 }}
	>
		<RouterLink {...props} />
	</div>
));

const SubItembar = props => {
	const { page, className, ...rest } = props;
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const handleClick = (page) => {
		console.log(page)
		if (page.sub) {
			setOpen(!open)
		} else {
			history.push(page.href);
		}
	}
	const classes = useStyles();

	return (
		page.main_label ?
			<Typography variant="h2" className={classes.label}>
				{page.main_label}
			</Typography>
			:
			page.label ?
				<Typography variant="h3" className={classes.label}>
					{page.label}
				</Typography>
				:
				(
					<>
						<ListItem
							className={classes.item}
							disableGutters
							key={page.title}
							onClick={() => handleClick(page)}
						>
							<Button
								activeClassName={!page.sub ? classes.active : classes.active_sub}
								className={classes.button}
								component={CustomRouterLink}
								to={page.href}
							>
								<SvgIcon className={classes.icon}>
									{page.icon}
								</SvgIcon>
								{/* <div  style={{backgroundImage: `url("${page.icon}")`,backgroundColor: 'transparent'}}></div> */}
								<div className={classes.title}>
									{page.title}
								</div>
								{
									page.sub ?
										open ? <ExpandLess /> : <ExpandMore />
										:
										<></>
								}
							</Button>
						</ListItem>
						{
							page.sub ?
								<Collapse in={open} timeout="auto" unmountOnExit>
									<List className={classes.sub_list}>
										{
											page.sub.map((item, index) => (
												<ListItem
													disableGutters
													className={classes.item}
												>
													<Button
														activeClassName={classes.active}
														className={classes.button_sub}
														component={CustomRouterLink}
														to={item.href}
													>
														<div className={classes.icon}>{item.icon}</div>
														{/* <div className={classes.icon}>{item.icon}</div> */}
														<div className={classes.title}>
															{item.title}
														</div>
													</Button>
												</ListItem>
											))
										}
									</List>
								</Collapse>
								:
								<></>
						}
					</>
				)

	);
};

SubItembar.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired
};

export default SubItembar;
