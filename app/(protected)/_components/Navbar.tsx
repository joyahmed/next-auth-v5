'use client';

import UserButton from '@/components/auth/UserButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {
	const pathname = usePathname();

	const navItems = [
		{
			title: 'Server',
			link: '/server',
			variant: pathname == '/server' ? 'default' : 'outline'
		},
		{
			title: 'Settings',
			link: '/settings',
			variant: pathname == '/settings' ? 'default' : 'outline'
		},
		{
			title: 'Client',
			link: '/client',
			variant: pathname == '/client' ? 'default' : 'outline'
		},
		{
			title: 'Admin',
			link: '/admin',
			variant: pathname == '/admin' ? 'default' : 'outline'
		}
	];

	return (
		<nav className='flex justify-center items-center p-4 rounded w-screen shadow-xl fixed top-0 bg-transparent'>
			<div className='flex items-center justify-between max-w-screen-lg w-screen'>
				<div className='flex gap-x-2'>
					{navItems.map(item => (
						<Button
							key={item.title}
							asChild
							variant={
								pathname === `${item.link}` ? 'default' : 'outline'
							}
							className='focus:outline-0'
						>
							<Link href={item.link}>{item.title}</Link>
						</Button>
					))}
				</div>
				<UserButton />
			</div>
		</nav>
	);
};

export default Navbar;
