import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  CircularProgress,
	Typography
} from '@material-ui/core';
import useStyles from './style';
import auth from '../../apis/auth';
import storage from 'utils/storage';
import { useToasts } from 'react-toast-notifications';
import { withTranslation } from 'react-i18next';
import constants from '../../utils/constants';

const Verification = props => {
  const { history, t } = props;

  const classes = useStyles();
  const { addToast } = useToasts()
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

  const handleVerification = event => {		
    setTryLogin(true);
    if ((error && (error.vCode && error.vCode.length > 0)) || !input.vCode) {
			addToast(<label>{t('verification.check_all_fields')}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
			setProgressStatus(true);      
			const email = storage.getStorage('email');
      auth
        .verifyConfirmation(email, input.vCode)
        .then(response => {
          if (response.code === 200) {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
						storage.setStorage('vCode', input.vCode);
            setTimeout(function () { history.push('/reset_password'); }, 1000);

          } else {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
          }
        })
    }
  };
  
  useEffect(() => {    
		let arr = JSON.parse(JSON.stringify(input));
    if (!input["vCode"] || input['vCode'].length !== 6) {
      arr["vCode"] = t('verification.enter_valid_code');
    } else {
      arr["vCode"] = "";
    }
    setError(arr);
  }, [input]);

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleVerification();
    }
  }

  return (
    <>
      <div className={classes.root}>
				<div className={classes.headerContainer}>
					<Typography variant={"h2"} className={classes.register} color="primary">{t('verification.register_name')}</Typography>
					<Typography variant={"h2"} className={classes.registerTitle} color="primary">{t('verification.register_title')}</Typography>
				</div>
        <div className={classes.mainContainer}>
          <div className={classes.loginForm}>						
            <div>
							<div className={classes.input_box_label}><label for="vCode">{t('verification.verify_code')}</label></div>
              <input className={classes.input_box} type="text" value={input.vCode} name="vCode" id="vCode" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
              <div className={classes.error_log}>{tryLogin && error["vCode"] && error["vCode"].length > 0 && error.vCode}</div>
            </div>
            <div className={classes.buttonContainer}>
              <Button variant="contained" color="secondary" className={classes.btnVerification} onClick={handleVerification}>
								{t('verification.send_verify')}
              </Button>
              <Link to="/login" component={RouterLink} className={classes.btnLogin}>{t('verification.go_login')}</Link>
            </div>
          </div>
        </div>
				<Typography variant={"h2"} className={classes.footer} >
					{t('sign_in.footer_one')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_two')}</a>{t('sign_in.footer_three')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_four')}</a> i <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_five')}</a> {t('sign_in.footer_six')} <a href="https://" target="_blank" className={classes.linkColor}>mail@mail.pl</a>.
				</Typography>
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

Verification.propTypes = {
  history: PropTypes.object
};

export default withTranslation('common')(withRouter(Verification));
