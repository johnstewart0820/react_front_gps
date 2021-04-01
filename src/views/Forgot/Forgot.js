import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Link,
  CircularProgress,
	Typography
} from '@material-ui/core';
import useStyles from './style';
import auth from '../../apis/auth';
import { useToasts } from 'react-toast-notifications'
import { withTranslation } from 'react-i18next';
import constants from '../../utils/constants';
import storage from 'utils/storage';

const Forgot = props => {
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

  const handleForgot = event => {		
		setTryLogin(true);
    if ((error && (error.email && error.email.length > 0)) || !input.email) {
      addToast(<label>{t('forgot.check_all_fields')}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
    } else {
      setProgressStatus(true);
			storage.setStorage('email', input.email);
      auth
        .forgot(input.email)
        .then(response => {
          if (response.code === 200) {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
            setTimeout(function () { history.push('/verification')}, 1000);
          } else {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
          }
        })
    }
  };

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleForgot();
    }
  }

  useEffect(() => {
    let arr = JSON.parse(JSON.stringify(error));
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!input["email"] || (input["email"] && !pattern.test(input["email"]))) {
      arr["email"] = t('sign_in.enter_invalid_email');
    } else {
      arr["email"] = "";
    }

    setError(arr);
  }, [input]);
  return (
    <>
      <div className={classes.root}>
				<div className={classes.headerContainer}>
					<Typography variant={"h2"} className={classes.forgot} color="primary">{t('forgot.recover_password')}</Typography>
					<Typography variant={"h2"} className={classes.forgotTitle} color="primary">{t('forgot.check_email')}</Typography>
				</div>
        <div className={classes.mainContainer}>          
          <div className={classes.loginForm}>						
            <div>
              <div className={classes.input_box_label}><label htmlFor="emailInput">{t('forgot.email')}</label></div>
              <input className={classes.input_box} type="email" value={input.email} name="email" id="emailInput" onChange={handleChange} onKeyPress={handleKeyPress} />
              <div className={classes.error_log}>{tryLogin && error["email"] && error["email"].length > 0 && error.email}</div>
            </div>
            <div className={classes.buttonContainer}>    
              <Button variant="contained" color="secondary" className={classes.btnForgot} onClick={handleForgot}>
								{t('forgot.send')}
              </Button>
              <Link to="/login" component={RouterLink} className={classes.btnBack}>
								{t('forgot.back')}
              </Link>
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

Forgot.propTypes = {
  history: PropTypes.object
};

export default withTranslation('common')(withRouter(Forgot));
