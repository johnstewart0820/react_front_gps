import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Drawer, Button, SvgIcon } from '@material-ui/core';
import {
	CostIcon,
	KandydaciIcon,
	KokpitIcon,
	ListaiprIcon,
	ListaOrkIcon,
	ListauslugIcon,
	LogzdarzenIcon,
	PowiadomieniaIcon,
	PunktyKwalifikacyjneIcon,
	RaportyIcon,
	SpecjalisciIcon,
	SzkoleniaIcon,
	UczestnicyIcon,
	UzytkownicyIcon,
	ZespolOrkIcon
} from './svg/icons';

import storage from '../../../../utils/storage';
import { SidebarNav } from './components';
import { withRouter } from 'react-router-dom';
import useStyles from './style';

const Sidebar = props => {
	const { open, variant, history, onClose, className, ...rest } = props;
	const [pages, setPages] = useState([]);
	const classes = useStyles();
	const items = [

		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: <KokpitIcon />
		},
		{
			title: 'Nowy projekt',
			href: '/new_project',
			icon: <KandydaciIcon />
		},
		{
			title: 'Historia projektu',
			href: '/project_history',
			icon: <PunktyKwalifikacyjneIcon />
		},
		{
			title: 'STwoje konto',
			href: '#',
			icon: <SpecjalisciIcon />,
			sub: [
				{
					title: 'Edycja profilu',
					href: '/edit_profile',
				},
				{
					title: 'Płatności i faktury',
					href: '/payment_invoice',
				}]
		},
		{
			title: 'Pomoc',
			href: '#',
			icon: <ListaiprIcon />,
			sub: [
				{
					title: 'Przewodnik',
					href: '/guid',
				},
				{
					title: 'Chat z konsultantem',
					href: '/chat_consultant',
				}]
		}
	];

	return (
		<Drawer
			anchor="left"
			classes={{ paper: classes.drawer }}
			onClose={onClose}
			open={open}
			variant={variant}
		>
			<div
				{...rest}
				className={clsx(classes.root, className)}
			>
				<SidebarNav
					className={classes.nav}
					pages={items}
					history={history}
				/>
			</div>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired
};

export default withRouter(Sidebar);
