import OptDropdown from '@/components/custom-ui/OptDropdown';
import SearchInput from '@/components/custom-ui/SearchInput';
import CreateAnimalToggle from '../create/CreateAnimal';
import { useState } from 'react';
import AnimalTable from './AnimalTable';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const allAnimals = async () => {
	const response = await axios.get('/api/animals/get');
	return response.data;
};
export default function AnimalTab() {
	const [createToggle, setCreateToggle] = useState(false);
	const [editToggle, setEditToggle] = useState(false);
	const [searchParam, setSearchParam] = useState<string | null>(null);

	const { data: animals } = useQuery({
		queryFn: allAnimals,
		queryKey: ['animals'],
	});

	const newAnimal = () => {
		// console.log('new Animal');

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

	const headerOptionsList = [{ name: 'New Animal', action: newAnimal, icon: 'heroicons:plus' }];

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span className="text-text-primary-light font-medium">Animal</span>
				<div className="flex items-center space-x-1 px-4">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overflow-y-auto p-2 flex flex-col md:flex-row">
				<AnimalTable data={animals} />
			</div>

			{createToggle && <CreateAnimalToggle setToggle={setCreateToggle} />}
		</>
	);
}
