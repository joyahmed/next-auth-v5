'use client';

import UserButton from '@/components/auth/UserButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
	const pathname = usePathname();
	return (
		<nav className='flex justify-center items-center p-4 rounded w-screen shadow-xl fixed top-0 bg-transparent'>
			<div className='flex items-center justify-between max-w-screen-lg w-screen'>
				<div className='flex gap-x-2'>
					<Button
						asChild
						variant={pathname === '/server' ? 'default' : 'outline'}
						className='focus:outline-0'
					>
						<Link href='/server'>Server</Link>
					</Button>
					<Button
						asChild
						variant={pathname === '/settings' ? 'default' : 'outline'}
					>
						<Link href='/settings'>Settings</Link>
					</Button>
					<Button
						asChild
						variant={pathname === '/client' ? 'default' : 'outline'}
					>
						<Link href='/client'>Client </Link>
					</Button>
					<Button
						asChild
						variant={pathname === '/admin' ? 'default' : 'outline'}
					>
						<Link href='/admin'>Admin </Link>
					</Button>
				</div>
				<UserButton />
			</div>
		</nav>
	);
};

export default Navbar;
