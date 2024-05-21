import Navbar from './_components/Navbar';

const ProtectedLayout = ({
	children
}: {
	children: React.ReactNode;
}) => {
	return (
		<div className='flex flex-col items-center justify-center h-full w-full gap-y-10'>
			<Navbar />
			{children}
		</div>
	);
};

export default ProtectedLayout;
