import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';

import prisma from '@/prisma/prisma';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export const generateTwoFactorToken = async (email: string) => {
	const token = crypto.randomInt(100_000, 1_000_000).toString();

	//const expired = new Date(new Date().getTime() + 3600 * 1000);
	const expired = new Date(new Date().getTime() + 5 * 60 * 1000);

	const existingToken = await getTwoFactorTokenByEmail(email);

	if (existingToken) {
		await prisma.twoFactorToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}

	const twoFactorToken = await prisma.twoFactorToken.create({
		data: {
			email,
			token,
			expired
		}
	});

	return twoFactorToken;
};

export const generatePasswordResetTokenByEmail = async (
	email: string
) => {
	const token = uuidv4();
	const expired = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await prisma.passwordResetToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}

	const passwordResetToken = await prisma.passwordResetToken.create({
		data: {
			email,
			token,
			expired
		}
	});

	return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
	const token = uuidv4();
	const expired = new Date(new Date().getTime() + 3600 * 1000);

	const existingToken = await getVerificationTokenByEmail(email);

	if (existingToken) {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}

	const verificationToken = await prisma.verificationToken.create({
		data: {
			email,
			token,
			expired
		}
	});

	return verificationToken;
};
