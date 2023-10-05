import AnimalCategoryForm from '@/components/forms/animals/AnimalCategoryForm';
import { Icon } from '@iconify/react/dist/iconify.js';

import { URL } from '@/types/URL';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/animals/categories/${slug}`);
	return response.data;
};

export default function EditCategoryToggle({
	setToggle,
	url,
}: {
	setToggle: (toggle: boolean) => void;
	url?: any;
}) {
	const { data } = useQuery({
		queryKey: ['detailCategory'],
		queryFn: () => fetchDetails(url),
	});
	// console.log(data);
	const initialCategoryData = {
		typeId: data?.animalType?.id,
		categoryName: data?.name,
	};

	const handleEditCategory = (data: any) => {
		console.log('Editing category:', data);
	};
	return (
		<div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
			<div className="absolute flex flex-col items-center gap-6 md:p-12 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<div className="flex items-center justify-between">
					<h1 className="text-xs font-bold md:text-base">Create Animal Category</h1>
					<button
						className="absolute top-4 right-4 hover:rotate-45 transition-all duration-300"
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							setToggle(false);
						}}
					>
						<Icon icon="mdi:close" />
					</button>
				</div>
				<AnimalCategoryForm
					onSubmit={handleEditCategory}
					initialValues={initialCategoryData}
				/>
			</div>
		</div>
	);
}
