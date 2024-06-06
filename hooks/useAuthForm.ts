import { loginAction, registerAction } from '@/actions/authActions';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useReducer, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type LoginFormValues = z.infer<typeof LoginSchema>;
type RegisterFormValues = z.infer<typeof RegisterSchema>;

type State = {
	isPending: boolean;
	showTwoFactor: boolean;
	error: string | undefined;
	success: string | undefined;
};

type Action =
	| { type: 'START_PENDING' }
	| { type: 'END_PENDING' }
	| { type: 'SET_SHOW_TWO_FACTOR'; payload: boolean }
	| { type: 'SET_ERROR'; payload: string | undefined }
	| { type: 'SET_SUCCESS'; payload: string | undefined };

const initialState: State = {
	isPending: false,
	showTwoFactor: false,
	error: undefined,
	success: undefined
};

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'START_PENDING':
			return { ...state, isPending: true };
		case 'END_PENDING':
			return { ...state, isPending: false };
		case 'SET_SHOW_TWO_FACTOR':
			return { ...state, showTwoFactor: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload };
		case 'SET_SUCCESS':
			return { ...state, success: action.payload };
		default:
			return state;
	}
};

const useAuthForm = ({ variant }: AuthFormProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isPending, startTransition] = useTransition();

	const schema = variant === 'login' ? LoginSchema : RegisterSchema;
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
			...(variant === 'register' ? { name: '' } : {})
		}
	});

	const onSubmit = (values: LoginFormValues | RegisterFormValues) => {
		dispatch({ type: 'SET_ERROR', payload: undefined });
		dispatch({ type: 'SET_SUCCESS', payload: undefined });
		dispatch({ type: 'START_PENDING' });

		startTransition(() => {
			if (variant === 'login') {
				loginAction(values as LoginFormValues)
					.then(data => {
						if (data?.error) {
							form.reset();
							dispatch({ type: 'SET_ERROR', payload: data.error });
						}
						if (data?.success) {
							form.reset();
							dispatch({
								type: 'SET_SUCCESS',
								payload: data.success
							});
						}

						if (data?.twoFactor) {
							dispatch({
								type: 'SET_SHOW_TWO_FACTOR',
								payload: true
							});
						}
					})
					.catch(() => {
						dispatch({
							type: 'SET_ERROR',
							payload: 'Something went wrong'
						});
					})
					.finally(() => {
						dispatch({ type: 'END_PENDING' });
					});
			} else {
				registerAction(values as RegisterFormValues)
					.then(data => {
						dispatch({ type: 'SET_ERROR', payload: data.error });
						dispatch({ type: 'SET_SUCCESS', payload: data.success });
					})
					.catch(() => {
						dispatch({
							type: 'SET_ERROR',
							payload: 'Something went wrong'
						});
					})
					.finally(() => {
						dispatch({ type: 'END_PENDING' });
					});
			}
		});
	};

	return {
		...state,
		form,
		onSubmit
	};
};

export default useAuthForm;
