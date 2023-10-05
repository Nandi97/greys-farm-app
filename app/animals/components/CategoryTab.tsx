import OptDropdown from '@/components/custom-ui/OptDropdown';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { Tab } from '@headlessui/react';
import CreateCategoryToggle from '../animal-categories/create/CreateCategory';
import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import EditCategoryToggle from '../animal-categories/[slug]/edit/EditCategory';

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ');
}

interface AnimalType {
	id: number;
	name: string;
	icon: string;
	// ...other properties
}

interface AnimalCategories {
	id: number;
	name: string;
	animalType: AnimalType;
}
interface GroupedData {
	[categoryName: string]: AnimalCategories[];
}
const allAnimalCategories = async () => {
	const response = await axios.get('/api/animals/getCategories');
	return response.data;
};

export default function CategoryTab() {
	const [createToggle, setCreateToggle] = useState(false);
	const [editToggle, setEditToggle] = useState(false);
	const [categoryId, setCategoryId] = useState(0);
	const pathname = usePathname();
	const { data } = useQuery({
		queryFn: allAnimalCategories,
		queryKey: ['animalCategories'],
	});

	const groupedData: GroupedData = {};

	data?.forEach((category: AnimalCategories) => {
		const categoryName = category?.animalType?.name;

		if (categoryName) {
			if (!groupedData[categoryName]) {
				groupedData[categoryName] = [];
			}

			groupedData[categoryName].push(category);
		}
	});

	const newAnimalCategory = () => {
		console.log('New Animal Category');

		setCreateToggle(true);
	};
	// Header Dropdown
	const headerOptBtnTxt = {
		icon: 'heroicons:chevron-down',
		name: 'Options',
		buttonClassName:
			'inline-flex w-full items-center justify-center rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-md shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-2',
		iconClassName:
			'object-contain p-px text-xl  border-opacity-30 hover:bg-box-four-light rounded-md',
	};
	const editAnimalCategory = (animalCategoryId: number) => {
		setCategoryId(animalCategoryId);
		setEditToggle(true);
		// const selectedStaff = data?.data.find((person) => person.id === staffId);
		// setStaffDetails(selectedStaff || null);

		// console.log('edit Staff Member:', animalCategoryId);
	};

	const headerOptionsList = [
		{
			name: 'New Animal Category',
			action: newAnimalCategory,
			icon: 'heroicons:plus',
		},
	];
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span className="text-text-primary-light font-medium">Animal Categories</span>
				<div className="flex items-center space-x-1 px-4">
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overflow-y-auto p-2 flex flex-col md:flex-row">
				<Tab.Group vertical defaultIndex={0}>
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
											<th scope="col" className="p-3"></th>
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
													className="p-4 font-medium text-gray-900 whitespace-nowrap text-start bg-box-one-light border-b border-white"
												>
													{idx + 1}
												</th>
												<td className="p-4 text-start">{item?.name}</td>
												<td className="p-4 text-start flex items-center space-x-2">
													<button
														onClick={() => editAnimalCategory(item?.id)}
													>
														<Icon icon="heroicons:pencil-square" />
													</button>
													<button>
														<Icon icon="heroicons:trash" />
													</button>
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
										</div>
									</div>
								))}
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
			{createToggle && <CreateCategoryToggle setToggle={setCreateToggle} />}
			{editToggle && <EditCategoryToggle setToggle={setEditToggle} url={categoryId} />}
		</>
	);
}
