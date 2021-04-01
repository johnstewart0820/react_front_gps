import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SiteInfoContextConsumer } from "App";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Button, Divider, Grid, Menu, MenuItem, Typography, Avatar } from '@material-ui/core';
import { HelpIcon, ContactIcon, LogoIcon, SubscriptionIcon } from 'assets/svg/icons';
import { withTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none',
		background: theme.palette.topbar_background,
		color: 'white',
		height: theme.spacing(10),
		justifyContent: 'center',
		zIndex: 500,
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	logoButton: {
		width: '50px',
		height: '50px'
	},
	username: {
		paddingRight: theme.spacing(3),
		color: theme.palette.white,
	}
}));

const Topbar = props => {
	const { className, i18n, t, ...rest } = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedLanguage, setLanguage] = useState('PL');

	const handleLanguageClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (event) => {
		let lang = event.currentTarget.outerText;
		if (lang === "") lang = selectedLanguage
		setLanguage(lang);
		i18n.changeLanguage(lang.toLowerCase());
		setAnchorEl(null);
	};

	return (
		<SiteInfoContextConsumer>
			{ (props) => (
				<AppBar
					{...rest}
					className={clsx(classes.root, className)}
					color="primary"
					position="fixed"
				>
					<Toolbar className={classes.toolBar}>
						<RouterLink to="/">
							<Button
								startIcon={<LogoIcon className={classes.logoButton} />}
							>
							</Button>
						</RouterLink>
						<div>
							<Grid container alignItems="center">
								<Divider className={classes.divider} orientation="vertical" flexItem />
								<Button
									className={classes.button}
									startIcon={<SubscriptionIcon />}
								>
									Abonamenty
								</Button>
								<Divider className={classes.divider} orientation="vertical" flexItem />
								<Button
									className={classes.button}
									startIcon={<HelpIcon />}
								>
									{t('top_bar.help')}
								</Button>
								<Divider orientation="vertical" flexItem />
								<Button
									className={classes.button}
									startIcon={<ContactIcon />}
								>
									{t('top_bar.contact')}
								</Button>
								<Divider orientation="vertical" flexItem />
								<Button
									className={classes.button}
									onClick={handleLanguageClick}
								>
									{selectedLanguage}
								</Button>
								<Menu
									id="language-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									{selectedLanguage !== "PL" && <MenuItem onClick={handleClose} >PL</MenuItem>}
									{selectedLanguage !== "EN" && <MenuItem onClick={handleClose} >EN</MenuItem>}
									{selectedLanguage !== "DE" && <MenuItem onClick={handleClose} >DE</MenuItem>}
									{selectedLanguage !== "ES" && <MenuItem onClick={handleClose} >ES</MenuItem>}
								</Menu>
								<Divider orientation="vertical" flexItem />
								<Typography className={classes.username}>
									Zalogowany jaki: Jan Kowalski
								</Typography>
								<Avatar alt="an Kowalski" src="/static/images/avatar/1.jpg" />
							</Grid>
						</div>
					</Toolbar>
				</AppBar>
			)}
		</SiteInfoContextConsumer>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
};

export default withTranslation('common')(Topbar);
