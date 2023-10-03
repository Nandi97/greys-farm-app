'use client';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import AnimalTab from './components/AnimalTab';
import BreedTab from './components/BreedTab';
import CategoryTab from './components/CategoryTab';
import TypeTab from './components/TypeTab';

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Dashboard() {
	let [categories] = useState({
		Animals: [],
		Breeds: [],
		Categories: [],
		Types: [],
	});

	return (
		<main className="overflow-hidden">
			<div className="w-full">
				<Tab.Group>
					<Tab.List className="flex space-x-1 rounded-xl bg-box-four-light p-1">
						{Object.keys(categories).map((category) => (
							<Tab
								key={category}
								className={({ selected }) =>
									classNames(
										'w-full py-2.5 text-sm font-medium leading-5 text-text-primary-light',
										' border-opacity-60 border-offset-2 border-offset-blue-400 focus:outline-none focus:border-b-4',
										selected
											? 'border-white border-b-4 shadow-sm'
											: 'text-text-secondary-light hover:bg-box-two-light/50 hover:text-text-secondary-light'
									)
								}
							>
								{category}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mt-2">
						<Tab.Panel
							className={classNames(
								'rounded-xl bg-white p-3',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
						>
							<AnimalTab />
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'rounded-xl bg-white p-3',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
						>
							<BreedTab />
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'rounded-xl bg-white p-3',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
						>
							<CategoryTab />
						</Tab.Panel>
						<Tab.Panel
							className={classNames(
								'rounded-xl bg-white p-3',
								'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							)}
						>
							<TypeTab />
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</main>
	);
}
