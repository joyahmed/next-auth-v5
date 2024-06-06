import * as z from 'zod';

export const SettingsSchema = z.object({
	name: z.optional(z.string())
});

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Email is required'
	}),
	password: z.string().min(1, { message: 'Password is required' }),
	code: z.optional(z.string())
});

export const RegisterSchema = z
	.object({
		email: z.string().email({
			message: 'Invalid email format'
		}),
		password: z
			.string()
			.min(10, {
				message: 'Password must be at least 10 characters long'
			})
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter'
			})
			.regex(/[0-9]/, {
				message: 'Password must contain at least one number'
			})
			.regex(/[!@#$%^&*(),.?":{}|<>]/, {
				message: 'Password must contain at least one symbol'
			}),
		confirmPassword: z
			.string()
			.min(6, { message: 'Passwords must match' }),
		name: z.string().min(3, {
			message: 'Name is required'
		})
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

// export const RegisterSchema = z.object({
// 	email: z.string().email({
// 		message: 'Email is required'
// 	}),
// 	password: z
// 		.string()
// 		.min(6, { message: 'Minimum 6 characters required' }),
// 	confirmPassword: z
// 		.string()
// 		.min(6, { message: 'Passwords must match' }),
// 	name: z.string().min(3, {
// 		message: 'Name is required'
// 	})
// });

export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: 'Email is required'
	})
});

export const NewPasswordSchema = z.object({
	password: z
		.string()
		.min(6, { message: 'Minimum 10 characters required' })
});
