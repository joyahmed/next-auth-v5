'use client';

import useAuthForm from '@/hooks/useAuthForm';
import Link from 'next/link';
import React, { lazy } from 'react';
const CardWrapper = lazy(() => import('./CardWrapper'));

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AuthForm = ({ variant }: { variant: 'login' | 'register' }) => {
	const { isPending, showTwoFactor, error, success, form, onSubmit } =
		useAuthForm({ variant });

	const formItems: {
		name: 'name' | 'email' | 'password' | 'confirmPassword' | 'code';
		title: string;
		type: string;
		placeholder: string;
		show: boolean;
	}[] = [
		{
			name: 'name',
			title: 'Name',
			type: 'text',
			placeholder: 'Joy',
			show: variant === 'register'
		},
		{
			name: 'email',
			title: 'Email',
			type: 'email',
			placeholder: 'joy@thesuperdev.com',
			show: !showTwoFactor
		},
		{
			name: 'password',
			title: 'Password',
			type: 'password',
			placeholder: '******',
			show: !showTwoFactor
		},
		{
			name: 'confirmPassword',
			title: 'Confirm Password',
			type: 'password',
			placeholder: '******',
			show: variant === 'register'
		},
		{
			name: 'code',
			title: 'Two Factor Code',
			type: 'text',
			placeholder: '123456',
			show: showTwoFactor
		}
	];

	return (
		<CardWrapper
			{...{
				headerLabel:
					variant === 'login' ? 'Welcome Back' : 'Create an Account',
				backButtonLabel:
					variant === 'login'
						? `Don't have an account?`
						: `Already have an account?`,
				backButtonHref:
					variant === 'login' ? '/auth/register' : '/auth/login',
				showSocial: true
			}}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						{formItems.map(item =>
							item.show ? (
								<FormField
									key={item.title}
									control={form.control}
									name={item.name}
									render={({ field }) => (
										<FormItem>
											<FormLabel>{item.title}</FormLabel>
											<FormControl>
												<Input
													{...field}
													disabled={isPending}
													placeholder={item.placeholder}
												/>
											</FormControl>
											{item.name === 'password' ? (
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
											) : null}
											<FormMessage />
										</FormItem>
									)}
								/>
							) : null
						)}
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						disabled={isPending}
						type='submit'
						className='w-full'
					>
						{variant === 'login'
							? showTwoFactor
								? 'Confirm'
								: 'Login'
							: 'Register'}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default AuthForm;
