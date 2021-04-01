import axios from 'axios';
import authHeader from './auth-header';
import storage from '../utils/storage';
class Auth {
	login = (email, password, isSocial, firstName, LastName) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
				email: email,
				password: password,
				is_social: isSocial,
				first_name: firstName,
				last_name: LastName,
			})
			.then(response => {
				if (response.data.code === 200) {
					storage.setStorage('token', response.data.data.token);		
				}
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	signup = (email, password, firstName, LastName, selectedCountry) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
				email: email,
				password: password,				
				first_name: firstName,
				last_name: LastName,
				country: selectedCountry,
			})
			.then(response => {
				if (response.data.code === 200) {
					storage.setStorage('token', response.data.data.token);					
				}
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	forgot = (email) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/forgot`, {
				email: email
			})
			.then(response => {
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	reset_password = (password, vCode) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/reset_password`, {
				password: password,
				digits: vCode,
			})
			.then(response => {
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	validateToken = () => {
		return axios
			.get(`${process.env.REACT_APP_BACKEND_URL}/user/validate_token`, { headers: authHeader(storage.getStorage('token')) })
			.then(response => {
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	validate = (token) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify`, { headers: authHeader(token) })
			.then(response => {
				return response.data;
			}).catch(error => {
				return error;
			})
	}

	verifyConfirmation = (email, vCode) => {
		return axios
			.post(`${process.env.REACT_APP_BACKEND_URL}/auth/verify_confirmation`, { 
				email: email,
				digits: vCode,
			 })
			.then(response => {
				return response.data;
			}).catch(error => {
				return error;
			})
	}


}
export default new Auth();
