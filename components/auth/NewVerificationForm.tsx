'use client';

import { newVerification } from '@/actions/verificationActions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import FormErrors from '../FormErrors';
import FormSuccess from '../FormSuccess';
import CardWrapper from './CardWrapper';

const NewVerificationForm = () => {
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');

	// useEffect(() => {
	// 	const urlToken = window.location.search.split('=')[1];
	// 	setToken(urlToken);
	// }, [token]);

	useEffect(() => {
		const urlToken = window.location.search.split('=')[1];
		if (urlToken.length > 0) {
			newVerification(urlToken)
				.then(data => {
					setSuccess(data.success);
					setError(data.error);
				})
				.catch(() => {
					setError('Something went wrong!');
				});
		} else {
			setError('Missing token!');
		}
	}, []);

	return (
		<CardWrapper
			{...{
				headerLabel: 'Confirming your verification',
				backButtonLabel: 'Back to login',
				backButtonHref: '/auth/login'
			}}
		>
			<div className='flex flex-col items-center justify-center w-full'>
				{!success && !error ? (
					<BeatLoader speedMultiplier={0.4} color='skyblue' />
				) : (
					<>
						<FormSuccess message={success} />
						<FormErrors message={error} />
					</>
				)}
			</div>
		</CardWrapper>
	);
};

export default NewVerificationForm;
