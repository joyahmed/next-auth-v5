import useFont from '@/hooks/useFont';
import { cn } from '@/lib/utils';

interface HeaderProps {
	label: string;
}

const Header = ({ label }: HeaderProps) => {
	const { font } = useFont();
	return (
		<div className='flex flex-col items-center justify-center w-full gap-y-4'>
			<h1 className={cn('text-3xl font-semibold', font.className)}>
				🔐 Auth
			</h1>
			<p className='text-muted-foreground text-sm'>{label}</p>
		</div>
	);
};

export default Header;
