'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Tab } from '@headlessui/react';

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

	// console.log('Grouped Data:', groupedData);

	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span>Animal Breeds</span>
			</div>
			<div className="overflow-y-auto p-2 flex">
				<Tab.Group vertical defaultIndex={1}>
					<Tab.List className="flex w-2/12 flex-col space-x-1 rounded-l-xl bg-box-four-light p-1">
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
					<Tab.Panels className="mt-2 flex w-10/12">
						{Object.values(groupedData).map((detail: any, idx: any) => (
							<Tab.Panel
								key={idx}
								className={classNames(
									'rounded-xl bg-white p-3',
									'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
								)}
							>
								<table className="table-auto text-sm text-left text-gray-500 border rounded-lg">
									<thead className="text-xs text-gray-700 uppercase bg-box-one-light">
										<tr>
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
													className="p-4 font-medium text-gray-900 whitespace-nowrap"
												>
													{idx + 1}
												</th>
												<td className="p-4">{item?.name}</td>
												<td className="p-4">{item?.description}</td>
											</tr>
										))}
									</tbody>
								</table>
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</>
	);
}
