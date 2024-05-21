'use server';

import { currentUser } from '@/lib/auth';
import { SettingsSchema } from './../schemas/index';

import { getUserById } from '@/data/user';
import prisma from '@/prisma/prisma';
import { z } from 'zod';

export const settingsAction = async (
	values: z.infer<typeof SettingsSchema>
) => {
	const user = await currentUser();

	if (!user) {
		return { error: 'Unauthorized' };
	}

	const dbUser = await getUserById(user.id!);

	if (!dbUser) {
		return { error: 'Unauthorized' };
	}

	await prisma.user.update({
		where: { id: dbUser.id },
		data: {
			...values
		}
	});

	return { success: 'Settings updated!' };
};
