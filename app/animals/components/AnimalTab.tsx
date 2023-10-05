import OptDropdown from '@/components/custom-ui/OptDropdown';
import SearchInput from '@/components/custom-ui/SearchInput';

export default function AnimalTab() {
	const newAnimal = () => {
		console.log('new Animal');
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
		{ name: 'New Staff Member', action: newAnimal, icon: 'heroicons:plus' },
	];
	return (
		<div className="w-full flex justify-between items-center border-b py-1">
			<span>Animals</span>
			<div className="flex items-center space-x-1 px-4">
				{/* <SearchInput /> */}
				<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
			</div>
		</div>
	);
}
