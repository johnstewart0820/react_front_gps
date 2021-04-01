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
import constants from '../../utils/constants';

const Verification = props => {
  const { history } = props;

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
			addToast(<label>{constants.CHECK_ALL_FIELDS}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
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
      arr["vCode"] = constants.ENTER_VALID_EMAIL;
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
					<Typography variant={"h2"} className={classes.register} color="primary">kod weryfikacyjny</Typography>
					<Typography variant={"h2"} className={classes.registerTitle} color="primary">Wprowadź kod weryfikacyjny, aby odzyskać hasło</Typography>
				</div>
        <div className={classes.mainContainer}>
          <div className={classes.loginForm}>						
            <div>
							<div className={classes.input_box_label}><label for="vCode">Kod weryfikacyjny</label></div>
              <input className={classes.input_box} type="text" value={input.vCode} name="vCode" id="vCode" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
              <div className={classes.error_log}>{tryLogin && error["vCode"] && error["vCode"].length > 0 && error.vCode}</div>
            </div>
            <div className={classes.buttonContainer}>
              <Button variant="contained" color="secondary" className={classes.btnVerification} onClick={handleVerification}>
								Wyślij kod weryfikacyjny
              </Button>
              <Link to="/login" component={RouterLink} className={classes.btnLogin}>Zaloguj się</Link>
            </div>
          </div>
        </div>
				<Typography variant={"h2"} className={classes.footer} >
					Przesyłając ten formularz, zgadzasz się na <a href="https://" target="_blank" className={classes.linkColor}>Warunki korzystania z usługi</a>. Aby uzyskać więcej informacji na temat polityki prywatności w zakresie przetwarzania danych osobowych, kliknij tutaj: Polityka <a href="https://" target="_blank" className={classes.linkColor}>plików cookie</a> i <a href="https://" target="_blank" className={classes.linkColor}>Polityka prywatności</a> lub skontaktuj się z nami pod adresem <a href="https://" target="_blank" className={classes.linkColor}>mail@mail.pl</a>.
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

export default withRouter(Verification);
