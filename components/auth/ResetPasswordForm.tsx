'use client';

import { resetPassword } from '@/actions/passwordActions';
import { ResetPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CardWrapper from './CardWrapper';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import FormErrors from '../FormErrors';
import FormSuccess from '../FormSuccess';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const ResetPasswordForm = () => {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		setError('');
		setSuccess('');

		startTransition(() => {
			resetPassword(values).then(data => {
				console.log(data);
				setError(data?.error);
				setSuccess(data?.success);
			});
		});
	};
	``;
	return (
		<CardWrapper
			{...{
				headerLabel: 'Forgot your password',
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
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											type='email'
											placeholder='joy@thesuperdev.com'
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
						Get Reset Email
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default ResetPasswordForm;
