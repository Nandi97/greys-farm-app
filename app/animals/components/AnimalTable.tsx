import OptDropdown from '@/components/custom-ui/OptDropdown';
import { AnimalArray } from '@/types/Animal';
import { useState } from 'react';

interface AnimalTableProps {
	data: AnimalArray;
}

export default function AnimalTable({ data }: AnimalTableProps) {
	const editAnimal = () => {
		console.log('Edit Animal');
	};

	const headerOptBtnTxt = {
		icon: 'heroicons:ellipsis-vertical',
		// name: 'Options',
		buttonClassName:
			'inline-flex w-full items-center justify-center rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-m text-box-four-light hover:bg-box-four-light p-2 text-text-secondary-light',
		iconClassName:
			'object-contain p-px text-xl  border-opacity-30 hover:bg-box-four-light rounded-md',
	};

	const headerOptionsList = [
		{ name: 'Edit', action: editAnimal, icon: 'heroicons:pencil-square' },
	];
	return (
		<>
			<table className="table-auto w-full rounded-md">
				<thead className="sticky z-10 top-0 divide-y divide-box-four-light/100  bg-box-four-light text-text-secondary-light">
					<tr>
						<th
							scope="col"
							className="sticky  top-0 py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
						>
							#
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Tag
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Category
						</th>
						<th
							scope="col"
							className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
						>
							Type
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-center text-sm font-semibold "
						>
							Breed
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Gender
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Is Pregnant
						</th>
						<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data?.map((item, index) => (
						<tr
							key={item?.id}
							className={`hover:bg-slate-200/95 ${
								index % 2 && index !== 0 ? 'bg-slate-200' : ''
							}`}
						>
							<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-text-secondary-light">
								{index + 1}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								{item?.tag}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								{item?.animalBreed?.animalCategory?.name}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								{item?.animalBreed?.animalCategory?.animalType?.name}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								{item?.animalBreed?.name}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								{item?.gender?.name}
							</td>
							<td className="py-2 text-left  sm:pl-6 text-sm text-text-secondary-light">
								<span
									className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
										item?.isPregnant === true
											? 'text-green-800 bg-green-100'
											: 'text-red-800 bg-red-100'
									}`}
								>
									{item?.isPregnant === true ? 'Pregnant' : 'Not Pregnant'}
								</span>
							</td>
							<td className="relative py-2 pl-3 pr-4 text-sm font-medium text-right whitespace-nowrap sm:pr-6">
								<OptDropdown
									optBtn={headerOptBtnTxt}
									optionsList={headerOptionsList}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
