'use server';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import bcrypt from 'bcryptjs';
import { NewPasswordSchema } from './../schemas/index';

import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetTokenByEmail } from '@/lib/tokens';
import prisma from '@/prisma/prisma';
import { ResetPasswordSchema } from '@/schemas/index';
import * as z from 'zod';

export const resetPassword = async (
	values: z.infer<typeof ResetPasswordSchema>
) => {
	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser) {
		return { error: 'Email not found!' };
	}

	const passwordResetToken = await generatePasswordResetTokenByEmail(
		email
	);

	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token
	);

	return { success: `Reset email sent to ${email}!` };
};

export const newPassword = async (
	values: z.infer<typeof NewPasswordSchema>,
	token?: string | null
) => {


	if (!token) {
		return { error: 'Missing token!' };
	}

	const validatedFields = NewPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' };
	}

	const { password } = validatedFields.data;

	const existingToken = await getPasswordResetTokenByToken(token);

	if (!existingToken) return { error: 'Invalid token!' };

	const hasExpired = new Date(existingToken.expired) < new Date();

	if (hasExpired) return { error: 'Token has expired' };

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) return { error: 'Email does not exists!' };

	const hashedPassword = await bcrypt.hash(password, 10);

	await prisma.user.update({
		where: { id: existingUser.id },
		data: {
			password: hashedPassword
		}
	});

	await prisma.passwordResetToken.delete({
		where: { id: existingToken.id }
	});

	return { success: 'Password updated!' };
};
