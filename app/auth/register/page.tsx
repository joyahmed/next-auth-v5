import AuthForm from '@/components/auth/AuthForm';
import React from 'react';

const RegisterPage = () => {
	return <AuthForm {...{ variant: 'register' }} />;
};

export default RegisterPage;
