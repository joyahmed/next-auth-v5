import prisma from '@/prisma/prisma';

export const getPasswordResetTokenByToken = async (token: string) => {
	try {
		const passwordResetToken =
			await prisma.passwordResetToken.findUnique({
				where: { token }
			});

		return passwordResetToken;
	} catch (error) {
		return null;
	}
};

export const getPasswordResetTokenByEmail = async (email: string) => {
	try {
		const passwordResetToken =
			await prisma.passwordResetToken.findFirst({
				where: { email }
			});

		return passwordResetToken;
	} catch (error) {
		return null;
	}
};

export const getPasswordResetToken = async (identifier: string) => {
	try {
		const passwordResetToken =
			await prisma.passwordResetToken.findFirst({
				where: {
					OR: [{ token: identifier }, { email: identifier }]
				}
			});

		return passwordResetToken;
	} catch (error) {
		return null;
	}
};
