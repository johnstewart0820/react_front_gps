import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Link,
  CircularProgress,
	Typography
} from '@material-ui/core';
import useStyles from './style';
import { withTranslation } from 'react-i18next';
// import auth from '../../apis/auth';

const Regulation = props => {
  const { history, t } = props;
  const classes = useStyles();
	const [progressStatus, setProgressStatus] = useState(false);

  return (
    <>
      <div className={classes.root}>
				<div className={classes.headerContainer}>
					<Typography variant={"h2"} className={classes.regulation} color="primary">{t('regulation.regulation')}</Typography>
					<Typography variant={"h2"} className={classes.regulationTitle} color="primary">{t('regulation.regulation_title')}</Typography>
				</div>
				<Typography variant={"h2"} className={classes.footer} >
					{t('sign_in.footer_one')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_two')}</a>{t('sign_in.footer_three')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_four')}</a> i <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_five')}</a> {t('sign_in.footer_six')} <a href="https://" target="_blank" className={classes.linkColor}>mail@mail.pl</a>.
				</Typography>
				<Link to="/register" component={RouterLink} className={classes.btnBack}>{t('regulation.back')}</Link>
      </div>
      {
        progressStatus ?
          <>
            <div className={classes.progressContainer}>
              <CircularProgress className={classes.progress} />
            </div>
          </>
          :
          <></>
      }
    </>
  );
};

Regulation.propTypes = {
  history: PropTypes.object
};

export default withTranslation('common')(withRouter(Regulation));
