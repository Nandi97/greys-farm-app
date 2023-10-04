import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';

import Link from 'next/link';

interface OptionItem {
	icon?: string;
	name?: string;
	link?: string;
	action?: () => void;
}
interface OptionButton {
	icon?: string;
	name?: string;
	buttonClassName?: string;
	iconClassName?: string;
}

interface SearchInputProps {
	optBtn: OptionButton;
	optionsList: OptionItem[];
}

export default function OptDropdown({ optBtn, optionsList }: SearchInputProps) {
	const handleClick = (item: OptionItem) => {
		if (item) {
			if (item.action) {
				item.action();
			} else if (item.link) {
				window.location.href = item.link;
			}
		}
	};
	return (
		<div>
			<Menu as="div" className="relative z-20 inline-block group">
				<div>
					<Menu.Button className={String(optBtn?.buttonClassName)}>
						{optBtn?.name}
						<Icon
							icon={String(optBtn.icon)}
							className={`${!optBtn.iconClassName ? '' : 'ml-2 -mr-1'} text-base`}
							aria-hidden="true"
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
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-ocoblue-400 rounded-md bg-box-four-light shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30">
						<div className="px-1 py-1 ">
							{optionsList?.map((item, i) => (
								<Menu.Item
									key={`option-item-${i}`}
									as={!item.link ? 'button' : 'a'}
									className={`flex items-center col-span-1 p-2 space-x-2 text-text-primary-light  hover:bg-box-two-light rounded-md  w-full px-4 py-2  text-xs transition-all duration-300 group`}
									onClick={() => handleClick(item)}
									href={item?.link}
								>
									{/* {!item.link ? (
										<button
											type="button"
											className="flex items-center w-full px-4 py-2 space-x-2 text-xs transition-all duration-300 rounded group text-text-primary-light  hover:bg-box-two-light hover:bg-opacity-20"
											onClick={() => handleClick(item)}
										>
											<Icon
												icon={String(item?.icon)}
												className="text-xl rounded-md"
											/>
											<span className="text-xs text-center">
												{item?.name}
											</span>
										</button>
									) : (
										<Link
											href={item?.link}
											target="_blank"
											className="flex items-center w-full px-4 py-2 space-x-2 text-xs transition-all duration-300 rounded group text-text-primary-light  hover:bg-box-two-light hover:bg-opacity-20"
										>
											<Icon
												icon={String(item?.icon)}
												className="text-xl rounded-md"
											/>
											<span>{item?.name}</span>
										</Link>
									)} */}
									<Icon
										icon={String(item?.icon)}
										className="text-xl rounded-md"
									/>
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
