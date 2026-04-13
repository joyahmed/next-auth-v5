'use client';

import UserInfo from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const ClientPage = () => {
	const user = useCurrentUser();

	return <UserInfo {...{ user, label: '💻Client Component' }} />;
};

export default ClientPage;
