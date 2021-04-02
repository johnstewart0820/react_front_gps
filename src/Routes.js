import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Minimal as MinimalLayout, Main as MainLayout } from './layouts';

import {
  SignIn as SignInView,
	SignUp as SignUpView,	
	Verification as VerificationView,
	ValidateUser as ValidateUserView,
  Forgot as ForgotView,
  ResetPassword as ResetPasswordView,
	Regulation as RegulationView,
  NotFound as NotFoundView,
	Dashboard as DashboardView,
	Project as ProjectView,
	History as HistoryView,
	Profile as ProfileView,
	Payment as PaymentView,
	Guide as GuideView,
	Chat as ChatView
} from './views';

const Routes = (props) => {
  return (
    <Switch>
      <Redirect exact from="/" to="/login"/>
			<RouteWithLayout 
				component={DashboardView}
				exact
				layout={MainLayout}
				title='dashboard'
				path='/dashboard'
			/>
			<RouteWithLayout 
				component={ProjectView}
				exact
				layout={MainLayout}
				title='Nowy projekt'
				path='/project'
			/>
			<RouteWithLayout 
				component={HistoryView}
				exact
				layout={MainLayout}
				title='Historia projektu'
				path='/history'
			/>			
			<RouteWithLayout 
				component={ProfileView}
				exact
				layout={MainLayout}
				title='Edycja profilu'
				path='/profile'
			/>
			<RouteWithLayout 
				component={PaymentView}
				exact
				layout={MainLayout}
				title='Płatności i faktury'
				path='/payment'
			/>
			<RouteWithLayout 
				component={GuideView}
				exact
				layout={MainLayout}
				title='Przewodnik'
				path='/guide'
			/>	
			<RouteWithLayout 
				component={ChatView}
				exact
				layout={MainLayout}
				title='Chat z konsultantem'
				path='/chat'
			/>
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
				title='Zaloguj się'
        path="/login"
      />
			<RouteWithLayout
        component={VerificationView}
        exact
        layout={MinimalLayout}
				title='Weryfikacja'
        path="/verification"
      />
			<RouteWithLayout
        component={ValidateUserView}
        exact
        layout={MinimalLayout}
        path="/validate"
      />
			<RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
				title='Zarejestruj się'
        path="/register"
      />
			<RouteWithLayout
        component={RegulationView}
        exact
        layout={MinimalLayout}
				title='Regulamin'
        path="/regulation"
      />
      <RouteWithLayout
        component={ForgotView}
        exact
        layout={MinimalLayout}
				title='Odzyskaj hasło'
        path="/forgotpassword"
      />
      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
				title='Zresetuj hasło'
        path="/reset_password"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
				title='Nie znaleziono'
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
