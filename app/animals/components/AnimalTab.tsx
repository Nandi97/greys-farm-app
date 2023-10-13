import OptDropdown from '@/components/custom-ui/OptDropdown';
import SearchInput from '@/components/custom-ui/SearchInput';
import CreateAnimalToggle from '../create/CreateAnimal';
import { useState } from 'react';
import AnimalTable from './AnimalTable';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AnimalCard from './AnimalCard';

export default function AnimalTab() {
	const [createToggle, setCreateToggle] = useState(false);
	const [editToggle, setEditToggle] = useState(false);
	const [searchParam, setSearchParam] = useState<any>();
	const [defaultView, setDefaultView] = useState(false);

	const { data: animals } = useQuery(['animals', searchParam], () =>
		axios
			.get(`/api/animals/get`, {
				params: { searchParam },
			})
			.then((response) => response.data)
	);

	// console.log('Animals:', animals);

	const newAnimal = () => {
		// console.log('new Animal');
		setCreateToggle(true);
	};

	const handleViewChange = () => {
		if (defaultView === false) {
			setDefaultView(true);
		} else {
			setDefaultView(false);
		}
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

	const headerOptionsList = [
		{ name: 'New Animal', action: newAnimal, icon: 'heroicons:plus' },
		{
			name: 'Change View',
			action: handleViewChange,
			icon: 'material-symbols:change-circle-outline',
		},
	];

	const handleSearch = (searchInput: any) => {
		setSearchParam(searchInput);
	};

	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<div className="flex items-center space-x-2">
					<span className="text-text-primary-light font-medium">Animals</span>
				</div>
				<div className="flex items-center space-x-1 px-4">
					<SearchInput onSearch={handleSearch} />
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overflow-y-auto p-2 flex flex-col md:flex-row">
				{defaultView === false ? (
					<AnimalTable data={animals} />
				) : (
					<AnimalCard data={animals} />
				)}
			</div>

			{createToggle && <CreateAnimalToggle setToggle={setCreateToggle} />}
		</>
	);
}
