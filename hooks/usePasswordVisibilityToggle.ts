import { useState } from 'react';

interface PasswordVisibility {
	showPassword: boolean;
	showConfirmPassword: boolean;
}

const usePasswordVisibilityToggle = () => {
	const [show, setShow] = useState<PasswordVisibility>({
		showPassword: false,
		showConfirmPassword: false
	});

	const togglePassText = (type: keyof PasswordVisibility) => {
		setShow(prevState => ({
			...prevState,
			[type]: !prevState[type]
		}));
	};

	return {
		show,
		togglePassText
	};
};

export default usePasswordVisibilityToggle;
