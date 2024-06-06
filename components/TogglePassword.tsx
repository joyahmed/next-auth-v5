import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface ToggleProps {
	color?: string;
	variant: boolean;
	onClick: () => void;
}

const TogglePassword = ({ color, variant, onClick }: ToggleProps) => {
	return (
		<span
			className='h-5 w-5 text-white/90 absolute top-[55%] transform -translate-y-1/2 right-2 z-50'
			onClick={onClick}
		>
			{variant ? (
				<AiOutlineEye className={`text-[${color}]`} />
			) : (
				<AiOutlineEyeInvisible className={`text-[${color}]`} />
			)}
		</span>
	);
};

export default TogglePassword;
