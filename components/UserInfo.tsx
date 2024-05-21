import { ExtendedUser } from '@/next-auth';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';

interface UserInfoProps {
	user?: ExtendedUser;
	label: string;
}

const UserInfo = ({ user, label }: UserInfoProps) => {
	return (
		<Card>
			<CardHeader className='w-[600px] shadow-md'>
				<p className='text-2xl font-semibold text-center'>{label}</p>
			</CardHeader>
			<CardContent className='space-y-4'>
				<InfoComponent
					{...{
						label: 'ID',
						info: user?.id,
						type: 'email'
					}}
				/>
				<InfoComponent
					{...{
						label: 'Name',
						info: user?.name,
						type: 'name'
					}}
				/>
				<InfoComponent
					{...{
						label: 'Email',
						info: user?.email,
						type: 'email'
					}}
				/>
				<InfoComponent
					{...{
						label: 'Role',
						info: user?.role,
						type: 'role'
					}}
				/>
				<InfoComponent
					{...{
						label: 'Two Factor Authentication',
						info: user?.isTwoFactorEnabled ? 'ON' : 'OFF',
						type: 'isTwoFactorEnabled',
						variant: user?.isTwoFactorEnabled
							? 'success'
							: 'destructive'
					}}
				/>
			</CardContent>
		</Card>
	);
};

export default UserInfo;

const InfoComponent = ({
	label,
	info,
	type,
	variant
}: {
	label: string;
	info: string | null | undefined;
	type: string;
	variant?:
		| 'default'
		| 'success'
		| 'secondary'
		| 'destructive'
		| 'outline'
		| null
		| undefined;
}) => {
	return (
		<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
			<p className='text-sm font-medium'>{label}</p>
			{type === 'isTwoFactorEnabled' ? (
				<Badge variant={variant}>{info}</Badge>
			) : (
				<p className='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
					{info}
				</p>
			)}
		</div>
	);
};
