'use client';

import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CardWrapper from './CardWrapper';

import { loginAction } from '@/actions/authActions';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import Link from 'next/link';
import FormErrors from '../FormErrors';
import FormSuccess from '../FormSuccess';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const [showTwoFactor, setShowTwoFactor] = useState(false);
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('');
		setSuccess('');
		startTransition(() => {
			loginAction(values)
				.then(data => {
					if (data?.error) {
						form.reset();
						setError(data.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => {
					setError('Something went wrong');
				});
		});
	};

	return (
		<CardWrapper
			{...{
				headerLabel: 'Welcome Back',
				backButtonLabel: `Don't have an account?`,
				backButtonHref: '/auth/register',
				showSocial: true
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						{showTwoFactor ? (
							<FormField
								control={form.control}
								name='code'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor code</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder='123456'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<>
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
											<Button
												size='sm'
												variant='link'
												asChild
												className='px-0 font-normal'
											>
												<Link href='/auth/reset'>
													Forgot password?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormErrors message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className='w-full'
					>
						{showTwoFactor ? 'Confirm' : 'Login'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default LoginForm;
