import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { SiteInfoContextConsumer } from "App";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Button, Divider, Grid, Menu, MenuItem, Typography, IconButton } from '@material-ui/core';
import { HelpIcon, ContactIcon, LogoIcon, SubscriptionIcon } from 'assets/svg/icons';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withTranslation } from 'react-i18next';
import storage from 'utils/storage';
import { useHistory } from "react-router-dom";

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
	avatar: {
		display: 'flex',
		alignItems: 'center'
	},
	username: {
		color: theme.palette.white,
		cursor: 'pointer'
	}
}));

const Topbar = props => {
	const { className, i18n, t, ...rest } = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorAvatarEl, setAnchorAvatarEl] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(Boolean(anchorEl));
	const [selectedLanguage, setLanguage] = useState('PL');
	const history = useHistory();

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

	const handleMenu = (event) => {
    setAnchorAvatarEl(event.currentTarget);
    setAvatarOpen(true);
  };

	const handleCloseAvatarDropdown = () => {
    setAnchorAvatarEl(null);
    setAvatarOpen(false);
  };


	const handleLogout = () => {
		handleCloseAvatarDropdown();
    storage.removeStorage('token');
    history.push('/login');
  }

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
						<RouterLink to="/dashboard">
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
								<div className={classes.avatar}>
									<Typography className={classes.username} onClick={handleMenu}>
										Zalogowany jaki: Jan Kowalski
									</Typography>
									<IconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleMenu}
									>
										<AccountCircle className={classes.avataricon}/>
									</IconButton>
									<Menu
										id="menu-appbar"
										anchorEl={anchorAvatarEl}
										anchorOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										keepMounted
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
										open={avatarOpen}
										onClose={handleCloseAvatarDropdown}
									>
										<MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
									</Menu>
								</div>
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
