'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorsProps {
	message?: string;
}

const FormErrors = ({ message }: FormErrorsProps) => {
	if (!message) return null;
	return (
		<div className='flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-md'>
			<ExclamationTriangleIcon className='h-4 w-4' />
			<p>{message}</p>
		</div>
	);
};

export default FormErrors;
