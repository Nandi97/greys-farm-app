import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface AnimalCategoryForm {
	typeId: number;
	categoryName: string;
}
interface AnimalCategoryFormProps {
	onSubmit: SubmitHandler<AnimalCategoryForm>;
	initialValues?: AnimalCategoryForm;
}

const allAnimalTypes = async () => {
	const response = await axios.get('/api/animals/getTypes');
	return response.data;
};

export default function AnimalCategoryForm({ onSubmit, initialValues }: AnimalCategoryFormProps) {
	const { register, handleSubmit, setValue } = useForm<AnimalCategoryForm>({
		defaultValues: initialValues, // Set default values for editing
	});

	const { data } = useQuery({
		queryFn: allAnimalTypes,
		queryKey: ['animalTypes'],
	});

	useEffect(() => {
		if (initialValues) {
			// Set default values for editing
			setValue('typeId', initialValues.typeId);
			setValue('categoryName', initialValues.categoryName);
		}
	}, [initialValues, setValue]);

	const handleSubmitForm: SubmitHandler<AnimalCategoryForm> = (data) => {
		onSubmit(data);

		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="flex flex-col space-y-2">
				<div>
					<label
						htmlFor="animalType"
						className="block text-sm font-medium text-text-primary-light"
					>
						Animal Type
					</label>
					<select
						id="animalType"
						{...register('typeId')}
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
				<div>
					<label
						htmlFor="categoryName"
						className="block text-sm font-medium text-text-primary-light"
					>
						Category Name
					</label>
					<input
						type="text"
						id="categoryName"
						{...register('categoryName')}
						className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-ocobrown-500 focus:ring-offset-1"
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
