import { AnimalArray } from '@/types/Animal';
import Image from 'next/image';
import animalIllustration from '@/public/assets/images/farm-animals-illustration.png';
import { Icon } from '@iconify/react/dist/iconify.js';
import OptDropdown from '@/components/custom-ui/OptDropdown';

interface AnimalCardProps {
	data: AnimalArray;
}

export default function AnimalCard({ data }: AnimalCardProps) {
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
			<div className="grid md:grid-cols-12 gap-4 grid-cols-6 w-full">
				{data?.map((item, index) => (
					<div
						key={item?.id}
						className="relative md:col-span-3 bg-box-four-light rounded-md p-2 col-span-6 flex flex-col shadow-md hover:shadow-lg hover:bg-box-four-light/70 text-text-secondary-light  text-sm"
					>
						<div className="absolute right-0 top-0">
							<OptDropdown optBtn={headerOptBtnTxt} optionsList={headerOptionsList} />
						</div>
						<div className="rounded-md flex w-full items-center justify-center object-contain">
							<Image
								width={100}
								height={100}
								src={item?.image || animalIllustration}
								alt="image of animal"
								className="h-30 w-30 shadow-sm border-2 border-text-primary-light/30 rounded-md object-contain"
							/>
						</div>
						<div className="grid grid-cols-6 w-full justify-between">
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>Tag</span>
								<span>:</span>
							</div>
							<span className="col-span-3">{item?.tag}</span>
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>Category</span>
								<span>:</span>
							</div>
							<span className="col-span-3">
								{item?.animalBreed?.animalCategory?.name}
							</span>
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>Type</span>
								<span>:</span>
							</div>
							<span className="col-span-3">
								{item?.animalBreed?.animalCategory?.animalType?.name}
							</span>
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>Breed</span>
								<span>:</span>
							</div>
							<span className="col-span-3">{item?.animalBreed?.name}</span>
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>Gender</span>
								<span>:</span>
							</div>
							<span className="col-span-3 flex items-center">
								{item?.gender?.name}
								{item?.gender?.name === 'Male' ? (
									<Icon
										icon="material-symbols:female"
										className="text-text-primary-light"
									/>
								) : (
									<Icon
										icon="material-symbols:male"
										className="text-text-primary-light"
									/>
								)}
							</span>
							<div className="col-span-3 px-3 font-semibold flex justify-between">
								<span>is Pregnant</span>
								<span>:</span>
							</div>
							<div className="col-span-3">
								<span
									className={`inline-flex rounded-full  px-2 text-xs font-semibold leading-5 ${
										item?.isPregnant === true
											? 'text-green-800 bg-green-100'
											: 'text-red-800 bg-red-100'
									}`}
								>
									{item?.isPregnant === true ? 'Pregnant' : 'Not Pregnant'}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
