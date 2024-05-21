import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/Credentials';

import type { NextAuthConfig } from 'next-auth';

import { LoginSchema } from '@/schemas';
import { getUserByEmail } from './actions/userActions';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const valdiatedFields = LoginSchema.safeParse(credentials);

				if (valdiatedFields.success) {
					const { email, password } = valdiatedFields.data;

					const user = await getUserByEmail(email);

					if (!user || !user.password) return null;

					const passwordsMatch = await bcrypt.compare(
						password,
						user.password
					);

					if (passwordsMatch) return user;
				}
				return null;
			}
		})
	]
} satisfies NextAuthConfig;
