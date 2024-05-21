'use client';

import { useCurrentRole } from '@/hooks/useCurrentRole';
import { UserRole } from '@prisma/client';
import FormErrors from '../FormErrors';

interface RoleGateProps {
	children: React.ReactNode;
	allowedRole: UserRole;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
	const role = useCurrentRole();

	if (role !== allowedRole) {
		return (
			<FormErrors message='You do not have permission to view this content!'></FormErrors>
		);
	}
	return <>{children}</>;
};

export default RoleGate;
