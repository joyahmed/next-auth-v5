import { Resend } from 'resend';
import { BASE_URL } from './baseUrl';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
	email: string,
	subject: string,
	link: string,
	buttonText: string,
	message: string
) => {
	const resend = new Resend(process.env.RESEND_API_KEY);
	const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #007bff;
          }
          p {
            margin-bottom: 20px;
          }
          .cta-button {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>${subject}</h1>
          <p>${message}</p>
          <p>To proceed, click the button below:</p>
          <a href="${link}" class="cta-button">${buttonText}</a>
          <p>If you didn't initiate this action, you can safely ignore this email.</p>
        </div>
      </body>
    </html>
  `;

	await resend.emails.send({
		from: 'joy@thesuperdev.com',
		to: email,
		subject: subject,
		html: htmlContent
	});
};

export const sendTwoFactorTokenEmail = async (
	email: string,
	token: string
) => {
	await resend.emails.send({
		from: 'no-reply@thesuperdev.com',
		to: email,
		subject: 'Your Two-Factor Authentication Code',
		html: `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Two-Factor Authentication Code</title>
			<style>
				body {
					font-family: Arial, sans-serif;
					background-color: #f4f4f4;
					color: #333;
					margin: 0;
					padding: 20px;
				}
				.container {
					background-color: #fff;
					border-radius: 5px;
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
					padding: 20px;
					max-width: 600px;
					margin: 20px auto;
				}
				.code {
					font-size: 1.5em;
					font-weight: bold;
					color: #000;
				}
				.footer {
					margin-top: 20px;
					font-size: 0.9em;
					color: #777;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h1>Two-Factor Authentication Code</h1>
				<p>Hello,</p>
				<p>To complete your sign-in process, please use the following two-factor authentication (2FA) code:</p>
				<p class="code">${token}</p>
				<p>If you did not initiate this action, please ignore this email. For your security, the code will expire in 1 hour.</p>
				<p>If you have any questions or concerns, please contact our support team.</p>
				<div class="footer">
					<p>Thank you,</p>
					<p>The Super Dev Team</p>
					<p><a href="mailto:support@thesuperdev.com">support@thesuperdev.com</a></p>
				</div>
			</div>
		</body>
		</html>
		`
	});
};

export const sendPasswordResetEmail = async (
	email: string,
	token: string
) => {
	const resetLink = `${BASE_URL}/auth/new-password?token=${token}`;
	await sendEmail(
		email,
		'Password Reset',
		resetLink,
		'Reset Password',
		`We received a request to reset your password for ${process.env.APP_NAME}.`
	);
};

export const sendVerificationEmail = async (
	email: string,
	token: string
) => {
	const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;
	await sendEmail(
		email,
		'Confirm Your Email Address',
		confirmLink,
		'Confirm Email',
		`Welcome to ${process.env.APP_NAME}! Please confirm your email address to complete your registration.`
	);
};

// export const sendPasswordResetEmail = async (
// 	email: string,
// 	token: string
// ) => {
// 	const resetLink = `${BASE_URL}/auth/new-password?token=${token}`;

// 	await resend.emails.send({
// 		from: 'joy@thesuperdev.com',
// 		to: email,
// 		subject: `Password Reset - ${process.env.APP_NAME}`,
// 		html: `
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #f4f4f4;
//               color: #333;
//             }
//             .container {
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//               background-color: #fff;
//               border-radius: 5px;
//               box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//             }
//             h1 {
//               color: #007bff;
//             }
//             p {
//               margin-bottom: 20px;
//             }
//             .cta-button {
//               display: inline-block;
//               background-color: #007bff;
//               color: #fff;
//               text-decoration: none;
//               padding: 10px 20px;
//               border-radius: 5px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>Reset Your Password</h1>
//             <p>We received a request to reset your password for ${process.env.APP_NAME}.</p>
//             <p>If you didn't request this, you can ignore this email.</p>
//             <p>To reset your password, click the button below:</p>
//             <a href="${resetLink}" class="cta-button">Reset Password</a>
//             <p>If you have any questions, feel free to contact us at support@thesuperdev.com.</p>
//           </div>
//         </body>
//       </html>
//     `
// 	});
// };

// export const sendVerificationEmail = async (
// 	email: string,
// 	token: string
// ) => {
// 	const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;

// 	await resend.emails.send({
// 		from: 'joy@thesuperdev.com',
// 		to: email,
// 		subject: `Confirm Your Email Address - ${process.env.APP_NAME}`,
// 		html: `
//       <html>
//         <head>
//           <style>
//             body {
//               font-family: Arial, sans-serif;
//               background-color: #f4f4f4;
//               color: #333;
//             }
//             .container {
//               max-width: 600px;
//               margin: 0 auto;
//               padding: 20px;
//               background-color: #fff;
//               border-radius: 5px;
//               box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//             }
//             h1 {
//               color: #007bff;
//             }
//             p {
//               margin-bottom: 20px;
//             }
//             .cta-button {
//               display: inline-block;
//               background-color: #007bff;
//               color: #fff;
//               text-decoration: none;
//               padding: 10px 20px;
//               border-radius: 5px;
//             }
//           </style>
//         </head>
//         <body>
//           <div class="container">
//             <h1>Welcome to ${process.env.APP_NAME}!</h1>
//             <p>Please confirm your email address to complete your registration.</p>
//             <p>Click the button below to confirm your email:</p>
//             <a href="${confirmLink}" class="cta-button">Confirm Email</a>
//             <p>If you didn't sign up for an account with ${process.env.APP_NAME}, you can ignore this email.</p>
//           </div>
//         </body>
//       </html>
//     `
// 	});
// };
