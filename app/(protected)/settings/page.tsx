'use client';

import { settingsAction } from '@/actions/settingsAction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';

import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const SettingsPage = () => {
	const user = useCurrentUser();
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();
	const { update } = useSession();
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof SettingsSchema>>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user?.name || undefined
		}
	});

	const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
		startTransition(() => {
			settingsAction(values)
				.then(data => {
					if (data.error) {
						setError(data.error);
					}

					if (data.success) {
						update();
						setSuccess(data.success);
					}
				})
				.catch(() => setError('Something went wrong!'));
		});
	};

	return (
		<Card className='w-[600px]'>
			<CardHeader>
				<p className='text-2xl font-semibold text-center'>
					⚙️ Settings
				</p>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-6'
					>
						<div className='space-y-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder='Joy'
												disabled={isPending}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error} />
						<FormSuccess message={success} />
						<Button disabled={isPending} type='submit'>
							Save
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className='bg-white p-10 rounded-xl'>
				<button type='submit'>Sign out</button>
			</div>
		</Card>
	);
};

export default SettingsPage;
