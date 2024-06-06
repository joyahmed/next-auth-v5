import AuthForm from '@/components/auth/AuthForm';
import React from 'react';

const Login = () => {
	return <AuthForm {...{ variant: 'login' }} />;
};

export default Login;
