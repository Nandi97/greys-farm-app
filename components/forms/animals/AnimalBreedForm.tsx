import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AnimalBreedForm {
	categoryId: number;
	name: string;
	description: string;
}

interface AnimalBreedFormProps {
	onSubmit: SubmitHandler<AnimalBreedForm>;
	initialValues?: AnimalBreedForm;
}

const allAnimalTypes = async () => {
	const response = await axios.get('/api/animals/types/get');
	return response.data;
};

export default function AnimalBreedForm({ onSubmit, initialValues }: AnimalBreedFormProps) {
	const { register, handleSubmit, setValue } = useForm<AnimalBreedForm>({
		defaultValues: initialValues, // Set default values for editing
	});
	const [selectedAnimalType, setSelectedAnimalType] = useState<string | null>(null);

	const { data } = useQuery({
		queryFn: allAnimalTypes,
		queryKey: ['animalTypes'],
	});

	const handleSubmitForm: SubmitHandler<AnimalBreedForm> = (data) => {
		onSubmit(data);
	};
	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="grid md:grid-cols-12 grid-cols-6 gap-2">
				<div className="col-span-6">
					<label
						htmlFor="animalType"
						className="block text-sm font-medium text-text-primary-light"
					>
						Animal Type
					</label>
					<select
						id="animalType"
						onChange={(e) => setSelectedAnimalType(e.target.value)}
						className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
					>
						{/* Remove the disabled attribute */}
						<option value="">--Select Animal Type--</option>
						{data?.map((item: any) => (
							<option key={item?.id} value={item?.id}>
								{item?.name}
							</option>
						))}
					</select>
				</div>
				<div className="col-span-6">
					<label
						htmlFor="animalCategory"
						className="block text-sm font-medium text-text-primary-light"
					>
						Animal Category
					</label>
					<select
						id="animalCategory"
						{...register('categoryId')}
						className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						disabled={!selectedAnimalType}
					>
						{/* Remove the disabled attribute */}
						<option value="">--Select Animal Type--</option>
						{selectedAnimalType &&
							data
								?.find((item: any) => item?.id === parseInt(selectedAnimalType))
								?.animalCategories?.map((item: any) => (
									<option key={item?.id} value={item?.id}>
										{item?.name}
									</option>
								))}
					</select>
				</div>
				<div className="md:col-span-12 col-span-6">
					<label
						htmlFor="breedName"
						className="block text-sm font-medium text-text-primary-light"
					>
						Breed Name
					</label>
					<input
						type="text"
						id="breedName"
						{...register('name')}
						className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						required
					/>
				</div>

				<div className="md:col-span-12 col-span-6">
					<label
						htmlFor="breedName"
						className="block text-sm font-medium text-text-primary-light"
					>
						Breed Description
					</label>
					<textarea
						id="breedName"
						{...register('description')}
						className="sm:text-sm w-full h-20 bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-20 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
						required
					/>
				</div>
			</div>
			<div className="w-full flex items-center justify-center py-2">
				<button
					type="submit"
					className="rounded-md shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-2"
				>
					Submit
				</button>
			</div>
		</form>
	);
}
