'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import OptDropdown from '@/components/custom-ui/OptDropdown';
import { usePathname } from 'next/navigation';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface AnimalCategory {
	id: number;
	name: string;
	// ...other properties
}

interface Breed {
	id: number;
	name: string;
	description: string;
	animalCategoryId: number;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	animalCategory: AnimalCategory;
}

interface GroupedData {
	[categoryName: string]: Breed[];
}

const allAnimalBreeds = async () => {
	const response = await axios.get('/api/animals/getBreeds');
	return response.data;
};

export default function BreedTab() {
	const pathname = usePathname();
	const { data: breeds } = useQuery({
		queryFn: allAnimalBreeds,
		queryKey: ['animalBreeds'],
	});

	// console.log('Animal Breeds:', breeds);
	//
	const groupedData: GroupedData = {};

	breeds?.forEach((breed: Breed) => {
		const categoryName = breed?.animalCategory?.name;

		if (categoryName) {
			if (!groupedData[categoryName]) {
				groupedData[categoryName] = [];
			}

			groupedData[categoryName].push(breed);
		}
	});

	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:ellipsis-vertical',
		// name: 'Options',
		buttonClassName:
			'inline-flex w-full items-center justify-center rounded-md text-sm font-medium text-text-primary-light   focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
		iconClassName:
			'object-contain p-px text-xl  border-opacity-30 hover:bg-box-four-light rounded-md',
	};

	const headerOptionsList = [
		{
			name: 'New Animal Breed',
			link: `${pathname}/animal-breeds/create`,
			icon: 'heroicons:plus',
		},
	];
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span>Animal Breeds</span>
				<div className="flex items-center space-x-1 px-4">
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overflow-y-auto p-2 flex flex-col md:flex-row">
				<Tab.Group vertical defaultIndex={1}>
					<Tab.List className="flex md:w-2/12 md:flex-col space-x-1 md:rounded-l-xl rounded-xl bg-box-four-light p-1">
						{Object.keys(groupedData).map((item) => (
							<Tab
								key={item}
								className={({ selected }) =>
									classNames(
										'w-full py-2.5 text-sm font-medium leading-5 text-text-primary-light',
										' border-opacity-60 border-offset-2 border-offset-blue-400 focus:outline-none focus:border-b-4',
										selected
											? 'bg-white rounded-l-md shadow-sm'
											: 'text-text-secondary-light hover:bg-box-two-light/50 hover:text-text-secondary-light'
									)
								}
							>
								{item}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mt-2 mb-4 md:flex md:w-10/12">
						{Object.values(groupedData).map((detail: any, idx: any) => (
							<Tab.Panel key={idx} className={classNames('rounded-xl bg-white p-3')}>
								<table className="hidden md:block table-auto text-sm text-left text-gray-500 border rounded-lg">
									<thead className="text-xs text-gray-700 uppercase bg-box-one-light rounded-md">
										<tr className="rounded-t-lg divide-x-2 divide-white">
											<th scope="col" className="p-3">
												#
											</th>
											<th scope="col" className="p-3">
												Name
											</th>
											<th scope="col" className="p-3">
												Description
											</th>
										</tr>
									</thead>
									<tbody>
										{detail?.map((item: any, idx: any) => (
											<tr
												key={item?.id}
												className="bg-white text-start border-b "
											>
												<th
													scope="row"
													className="p-4 font-medium text-gray-900 whitespace-nowrap text-start"
												>
													{idx + 1}
												</th>
												<td className="p-4 text-start">{item?.name}</td>
												<td className="p-4 text-justify">
													{item?.description}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{detail?.map((item: any, idx: any) => (
									<div
										key={item?.id}
										className="md:hidden flex flex-col my-4 text-sm text-left text-gray-500 border rounded-lg"
									>
										<div className="grid grid-cols-12 p-2 gap-2">
											<div className="col-span-4 flex justify-between font-semibold">
												<span>Name</span> <span>:</span>
											</div>
											<span className="col-span-8">{item?.name}</span>
											<div className="col-span-4 flex justify-between font-semibold">
												<span>Description</span> <span>:</span>
											</div>
											<p className="col-span-8 text-justify">
												{item?.description}
											</p>
										</div>
									</div>
								))}
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
}
