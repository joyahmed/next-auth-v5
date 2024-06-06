'use server';

import { signIn, signOut } from '@/auth';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import {
	sendTwoFactorTokenEmail,
	sendVerificationEmail
} from '@/lib/mail';
import {
	generateTwoFactorToken,
	generateVerificationToken
} from '@/lib/tokens';
import prisma from '@/prisma/prisma';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema, RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import * as z from 'zod';
import { getUserByEmail } from './userActions';

export const loginAction = async (
	values: z.infer<typeof LoginSchema>
) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (
		!existingUser ||
		!existingUser.email ||
		!existingUser.password
	) {
		return { error: 'Email does not exist!' };
	}

	const passwordMatches = await bcrypt.compare(
		password,
		existingUser.password
	);

	if (!passwordMatches) {
		return { error: 'Incorrect password!' };
	}

	if (!existingUser.emailVerified) {
		const verificationToken = await generateVerificationToken(
			existingUser.email
		);
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		);
		return {
			success: `Confirmation email sent to ${existingUser.email}`
		};
	}

	if (existingUser.isTwoFactorEnabled && existingUser.email) {
		if (code) {
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			);

			if (!twoFactorToken) return { error: 'Invlid code!' };

			if (twoFactorToken.token !== code) {
				return { error: 'Invalid code!' };
			}

			const hasExpired =
				new Date(twoFactorToken.expired) < new Date();

			if (hasExpired) {
				return { error: 'Code expired!' };
			}

			await prisma.twoFactorToken.delete({
				where: { id: twoFactorToken.id }
			});

			const existingConfirmation =
				await getTwoFactorConfirmationByUserId(existingUser.id);

			if (existingConfirmation) {
				await prisma.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id }
				});
			}

			await prisma.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id
				}
			});
		} else {
			const twoFactorToken = await generateTwoFactorToken(
				existingUser.email
			);

			await sendTwoFactorTokenEmail(
				twoFactorToken.email,
				twoFactorToken.token
			);
			return { twoFactor: true };
		}
	}

	try {
		await signIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials!' };
				default:
					return { error: 'Something went wrong!' };
			}
		}
		throw error;
	}
};

export const registerAction = async (
	values: z.infer<typeof RegisterSchema>
) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { name, email, password } = validatedFields.data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if (existingUser) {
		return { error: 'Email already in use!' };
	}

	await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword
		}
	});

	const verificationToken = await generateVerificationToken(email);

	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token
	);

	return { success: `Confirmation email sent to ${email}` };
};

export const logoutAction = async () => {
	await signOut();
};
