'use client';

import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CardWrapper from './CardWrapper';

import { newPassword } from '@/actions/passwordActions';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { useSearchParams } from 'next/navigation';
import FormErrors from '../FormError';
import FormSuccess from '../FormSuccess';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ''
		}
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			newPassword(values, token).then(data => {
				console.log(data);
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper
			{...{
				headerLabel: 'Enter a new password',
				backButtonLabel: `Back to login`,
				backButtonHref: '/auth/login',
				showSocial: false
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											type='password'
											placeholder='******'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormErrors message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className='w-full'
					>
						Reset Password
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default NewPasswordForm;
