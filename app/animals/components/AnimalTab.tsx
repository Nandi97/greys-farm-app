import OptDropdown from '@/components/custom-ui/OptDropdown';
import SearchInput from '@/components/custom-ui/SearchInput';
import CreateAnimalToggle from '../create/CreateAnimal';
import { useState } from 'react';

export default function AnimalTab() {
	const [createToggle, setCreateToggle] = useState(false);
	const [editToggle, setEditToggle] = useState(false);
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
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span className="text-text-primary-light font-medium">Animal Breeds</span>
				<div className="flex items-center space-x-1 px-4">
					<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
				</div>
			</div>
			<div className="overflow-y-auto p-2 flex flex-col md:flex-row"></div>

			{createToggle && <CreateAnimalToggle setToggle={setCreateToggle} />}
		</>
	);
}
