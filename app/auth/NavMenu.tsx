'use client';
import { Menu, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Fragment, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

//Fetch All Menus
const allMenus = async () => {
	const response = await axios.get('/api/menus/getMenus');
	return response.data;
};
export default function NavMenu() {
	const pathname = usePathname();
	const { data } = useQuery({
		queryFn: allMenus,
		queryKey: ['menus'],
	});

	return (
		<div className="text-right z-50 inline-flex items-center   bg-box-four-light rounded-lg bg-opacity-0">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-text-primary-light   focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						<Icon
							icon="mdi:dots-grid"
							className="object-contain w-7 h-7 p-px  border-opacity-30 hover:bg-box-four-light rounded-md"
						/>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute left-0 -ml-28 w-52 mt-2 z-50 origin-top-right divide-y divide-gray-100 rounded-md  bg-box-four-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-4">
						<div className="px-1 z-50  py-1 flex flex-col gap-2">
							{data?.map((item: any) => (
								<Menu.Item
									as={pathname === item?.url ? 'span' : 'a'}
									key={item?.id}
									href={item?.url}
									className={`${
										pathname === item?.url
											? 'bg-box-two-light'
											: 'text-text-secondary-light '
									} flex items-center col-span-1 p-2 space-x-2 text-text-primary-light  hover:bg-box-two-light rounded-md`}
								>
									<Icon icon={item?.icon} className="text-xl rounded-md" />
									<span className="text-xs text-center">{item?.name}</span>
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
