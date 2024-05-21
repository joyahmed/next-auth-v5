'use client';

import { logoutAction } from '@/actions/authActions';

interface LogtoutButtonProps {
	children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogtoutButtonProps) => {
	const onClick = () => {
		logoutAction();
	};
	return (
		<span onClick={onClick} className='cursor-pointer'>
			{children}
		</span>
	);
};

export default LogoutButton;
