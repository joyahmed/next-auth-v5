'use server';

import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';
import prisma from '@/prisma/prisma';

export const newVerification = async (token: string) => {
	console.log(`token	 => newVerification =>`, token);
	const existingToken = await getVerificationTokenByToken(token);

	if (!existingToken) {
		return { error: 'Token does not exist!' };
	}

	const hasExpired = new Date(existingToken.expired) < new Date();

	console.log(`hasExpired => =>`, hasExpired);

	if (hasExpired) {
		return { error: 'Token has expired!' };
	}

	const existingUser = await getUserByEmail(existingToken.email);

	if (!existingUser) {
		return { error: 'Email does not exist!' };
	}

	await prisma.user.update({
		where: {
			id: existingUser.id
		},
		data: {
			emailVerified: new Date(),
			email: existingToken.email
		}
	});

	// await prisma.verificationToken.delete({
	// 	where: {
	// 		id: existingToken.id
	// 	}
	// });

	setTimeout(async () => {
		await prisma.verificationToken.delete({
			where: {
				id: existingToken.id
			}
		});
	}, 5000);

	return { success: 'Email verified!' };
};
