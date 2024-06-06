import UserInfo from '@/components/UserInfo';
import { currentUser } from '@/lib/auth';

const ServerPage = async () => {
	const user = await currentUser();

	console.log(`user => =>`, user);

	return <UserInfo {...{ user, label: '💻Server Component' }} />;
};

export default ServerPage;
