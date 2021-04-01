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
import { SingleSelect } from './components';
import useStyles from './style';
import auth from '../../apis/auth';
import storage from 'utils/storage';
import { useToasts } from 'react-toast-notifications';
import { withTranslation } from 'react-i18next';
import constants from '../../utils/constants';

const SignUp = props => {	
  const { history, t } = props;

  const classes = useStyles();
  const { addToast } = useToasts()
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const [progressStatus, setProgressStatus] = useState(false);
	const [checkRegulationStatus, setCheckRegulationStatus] = useState(false);
	const [checkAgreeStatus, setCheckAgreeStatus] = useState(false);
	const [checkDisagreeStatus, setCheckDisagreeStatus] = useState(false);
  const [trySignup, setTrySignup] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState();
	const [countryList, setCountryList] = useState([
		{ id: '1', name: 'England'},
		{ id: '2', name: 'Germany'},
		{ id: '3', name: 'Poland'},
		{ id: '4', name: 'Ukraine'}		
	]);

  const handleChange = event => {
    let arr = JSON.parse(JSON.stringify(input));
    arr[event.target.name] = event.target.value;
    setInput(arr);
  };

	const checkError = () => {
		return (error && ((error.email && error.email.length > 0) || (error.password && error.password.length > 0))) || !input.email || !input.password || !checkRegulationStatus || !input.firstName || !input.lastName || !selectedCountry;
	}

  const handleSignUp = event => {
    setTrySignup(true);
    if (checkError()) {
      addToast(<label>{constants.CHECK_ALL_FIELDS}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
			// handleError();
    } else {
      setProgressStatus(true);      
      auth
        .signup(input.email, input.password, input.firstName, input.lastName, selectedCountry)	
        .then(response => {
          if (response.code === 200) {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'success', autoDismissTimeout: 1000, autoDismiss: true })
            setTimeout(function () { history.push('/login'); }, 1000);

          } else {
            setProgressStatus(false);
            addToast(<label>{response.message}</label>, { appearance: 'error', autoDismissTimeout: 5000, autoDismiss: true })
          }
        })
    }
  };

	const handleAcceptRegulation = event => {
    setCheckRegulationStatus(!checkRegulationStatus);
  };

	const handleAgreePreference = event => {
    setCheckAgreeStatus(!checkAgreeStatus);
  };

	const handleDisagreePreference = event => {
    setCheckDisagreeStatus(!checkDisagreeStatus);
  };

	const handleBack = () => {
		history.push('/login');
	}
	
  useEffect(() => {		
    let arr = JSON.parse(JSON.stringify(error));		
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!input["email"] || (input["email"] && !pattern.test(input["email"]))) {
      arr["email"] = t('register.enter_invalid_email');
    } else {
      arr["email"] = "";
    }
		
		if (!input["password"] || (input["password"] && input["password"].length <= 5)) {
      arr["password"] = t('register.enter_password');
    } else {
      arr["password"] = "";
    }

		if (!input["confirmPassword"] || (input["password"] !== input["confirmPassword"])) {
      arr["confirmPassword"] = t('register.enter_same_password');
    } else {
      arr["confirmPassword"] = "";
    }

		if (!input["firstName"]) {
      arr["firstName"] = t('register.enter_first_name');
    } else {
      arr["firstName"] = "";
    }

		if (!input["lastName"]) {
      arr["lastName"] = t('register.enter_last_name');
    } else {
      arr["lastName"] = "";
    }

    setError(arr);
  }, [input, selectedCountry]);

  const handleKeyPress = (event) => {
    if (event.charCode === 13) {
      handleSignUp();
    }
  }

  return (
    <>
      <div className={classes.root}>
				<div className={classes.headerContainer}>
					<Typography variant={"h2"} className={classes.register} color="primary">{t('register.register')}</Typography>
					<Typography variant={"h2"} className={classes.registerTitle} color="primary">{t('register.create_project')}</Typography>
				</div>
        <div className={classes.mainContainer}>
          <div className={classes.loginForm}>				
            <div>
							<div className={classes.input_box_label}><label for="email">{t('register.email')}</label></div>
              <input className={classes.input_box} type="email" value={input.email} name="email" id="email" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
              <div className={classes.error_log}>{trySignup && error["email"] && error["email"].length > 0 && error.email}</div>

							<div className={classes.input_box_label}><label htmlFor="password">{t('register.password')}</label></div>
              <input className={classes.input_box} type="password" value={input.password} label="password" name="password" id="password" onChange={handleChange} onKeyPress={handleKeyPress} />
              <div className={classes.error_log}>{trySignup && error["password"] && error["password"].length > 0 && error.password}</div>

							<div className={classes.input_box_label}><label htmlFor="confirmPassword">{t('register.confirm_password')}</label></div>
              <input className={classes.input_box} type="password" value={input.confirmPassword} label="confirmPassword" name="confirmPassword" id="confirmPassword" onChange={handleChange} onKeyPress={handleKeyPress} />
              <div className={classes.error_log}>{trySignup && error["confirmPassword"] && error["confirmPassword"].length > 0 && error.confirmPassword}</div>
              
							<div className={classes.input_box_label}><label for="firstName">{t('register.first_name')}</label></div>
              <input className={classes.input_box} type="text" value={input.firstName} name="firstName" id="firstName" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
              <div className={classes.error_log}>{trySignup && error["firstName"] && error["firstName"].length > 0 && error.firstName}</div>

							<div className={classes.input_box_label}><label for="lastName">{t('register.last_name')}</label></div>
              <input className={classes.input_box} type="text" value={input.lastName} name="lastName" id="lastName" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' />
              <div className={classes.error_log}>{trySignup && error["lastName"] && error["lastName"].length > 0 && error.lastName}</div>


							<div className={classes.input_box_label}><label for="region">{t('register.regiion')}</label></div>
							<SingleSelect value={selectedCountry} handleChange={setSelectedCountry} list={countryList} />
              {/* <input className={classes.input_box} type="text" value={input.region} name="region" id="region" onChange={handleChange} onKeyPress={handleKeyPress} autocomplete='off' /> */}
              <div className={classes.error_log}>{trySignup && error["region"] && error["region"].length > 0 && error.region}</div>
            </div>
          </div>
        </div>
				<div>
					<Typography variant={"h2"} className={classes.preferenceTitle} >
						{t('register.communication')}
					</Typography>
					<Typography variant={"h2"} className={classes.preferenceDescription} >
						{t('register.description')}
					</Typography>
					<div className={classes.preferenceContainer}>
						<FormControlLabel
							className={classes.acceptRegulation}
							control={
								<Checkbox
									checked={checkAgreeStatus}
									onChange={handleAgreePreference}
								/>
							}
							label={t('register.yes')}
						/>
						<FormControlLabel
							className={classes.acceptRegulation}
							control={
								<Checkbox
									checked={checkDisagreeStatus}
									onChange={handleDisagreePreference}
								/>
							}
							label={t('register.no')}
						/>	
					</div>
				</div>
				<Typography variant={"h2"} className={classes.footer} >
					{t('sign_in.footer_one')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_two')}</a>{t('sign_in.footer_three')} <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_four')}</a> i <a href="https://" target="_blank" className={classes.linkColor}>{t('sign_in.footer_five')}</a> {t('sign_in.footer_six')} <a href="https://" target="_blank" className={classes.linkColor}>mail@mail.pl</a>.
				</Typography>
				<div className={classes.regulationContainer}>
					<FormControlLabel
						className={classes.acceptRegulation}
						control={
							<Checkbox
								checked={checkRegulationStatus}
								onChange={handleAcceptRegulation}
							/>
						}
						label={t('register.accept')}
					/>
					<Link to="/regulation" component={RouterLink} className={classes.btnRegulation}>{t('register.regulation')}</Link>
				</div>
				<div className={classes.buttonContainer}>
					<Button variant="contained" color="secondary" className={classes.btnBack} onClick={handleBack}>
						{t('register.back')}
					</Button>
					<Button variant="contained" color="secondary" className={classes.btnSignUp} onClick={handleSignUp}>
						{t('register.create_account')}
					</Button>
				</div>				
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

SignUp.propTypes = {
  history: PropTypes.object
};

export default withTranslation('common')(withRouter(SignUp));
