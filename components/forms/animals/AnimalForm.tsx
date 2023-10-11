import Image from 'next/image';
import placeholder from '@/public/assets/images/image_placeholder.jpg';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Icon } from '@iconify/react/dist/iconify.js';
import FormInputAlert from '@/components/custom-ui/FormFieldAlert';

interface AnimalForm {
	image: File | string;
	tag: string;
	genderId: number;
	breedId: number;
	birthWeight: number;
	birthDate: string;
	sireId: number;
	damId: number;
	purchaseDate: string;
	weightUnitId: number;
}

interface AnimalFormProps {
	onSubmit: SubmitHandler<AnimalForm>;
	initialValues?: AnimalForm;
	isLoading: any;
}

const allAnimalTypes = async () => {
	const response = await axios.get('/api/animals/types/get');
	return response.data;
};

const allGenders = async () => {
	const response = await axios.get('/api/general/gender/get');
	return response.data;
};

const allUnits = async () => {
	const response = await axios.get('/api/general/unit_of_measurement/get');
	return response.data;
};

export default function AnimalForm({ onSubmit, initialValues, isLoading }: AnimalFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<AnimalForm>({
		defaultValues: initialValues, // Set default values for editing
	});
	const [selectedImage, setSelectedImage] = useState('');
	const [selectedAnimalType, setSelectedAnimalType] = useState<string | null>(null);
	const [selectedAnimalCategory, setSelectedAnimalCategory] = useState<string | null>(null);
	const placeholderRef = useRef<HTMLInputElement>(null);

	const { data: animalTypes } = useQuery({
		queryFn: allAnimalTypes,
		queryKey: ['animalTypes'],
	});
	const { data: genders } = useQuery({
		queryFn: allGenders,
		queryKey: ['genders'],
	});

	const { data: units } = useQuery({
		queryFn: allUnits,
		queryKey: ['units'],
	});

	const convertToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleImageChange = async (event: any) => {
		const file = event.target.files[0];
		if (file) {
			// const reader = new FileReader();
			// reader.onload = (e) => {
			// 	setSelectedImage(e.target.result);
			// };
			// reader.readAsDataURL(file);
			const base64Image = await convertToBase64(file);
			setSelectedImage(base64Image);
		}
	};

	const handleSubmitForm: SubmitHandler<AnimalForm> = (data) => {
		data.image = selectedImage;

		// console.log('Form Data', data);
		onSubmit(data);
	};
	return (
		<form onSubmit={handleSubmit(handleSubmitForm)}>
			<div className="grid grid-cols-12  gap-4">
				<div className="col-span-12 md:col-span-3">
					<div className="flex flex-col items-center justify-center w-full space-y-2">
						<label
							htmlFor="photo"
							className="text-sm text-text-primary-light font-medium"
						>
							Animal Image
						</label>

						<Image
							height={100}
							width={100}
							src={selectedImage || placeholder}
							alt="Staff Avatar Image"
							className="inline-flex items-center justify-center overflow-hidden rounded-md md:w-20 sm:h-10 md:h-20 sm:w-10 ring-2 ring-offset-1 ring-text-primary-light/20"
						/>

						<input
							type="file"
							id="photo"
							ref={placeholderRef}
							placeholder="Staff Avatar"
							className="hidden"
							onChange={handleImageChange}
							accept="image/*"
						/>
						<button
							onClick={() => placeholderRef.current?.click()}
							type="button"
							className="inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-1"
						>
							Add Image
						</button>
					</div>
				</div>
				<div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-2">
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="animalType"
							className="block text-sm font-medium text-text-primary-light"
						>
							Type<sup className="text-red-500 text-xs">*</sup>
						</label>
						<select
							id="animalType"
							onChange={(e) => setSelectedAnimalType(e.target.value)}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
							required
						>
							{/* Remove the disabled attribute */}
							<option value="">--Type--</option>
							{animalTypes?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="animalCategory"
							className="block text-sm font-medium text-text-primary-light"
						>
							Category<sup className="text-red-500 text-xs">*</sup>
						</label>
						<select
							id="animalCategory"
							onChange={(e) => setSelectedAnimalCategory(e.target.value)}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
							disabled={!selectedAnimalType}
							required
						>
							{/* Remove the disabled attribute */}
							<option value="">--Category--</option>
							{selectedAnimalType &&
								animalTypes
									?.find((item: any) => item?.id === parseInt(selectedAnimalType))
									?.animalCategories?.map((item: any) => (
										<option key={item?.id} value={item?.id}>
											{item?.name}
										</option>
									))}
						</select>
					</div>
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="animalBreed"
							className="block text-sm font-medium text-text-primary-light"
						>
							Breed<sup className="text-red-500 text-xs">*</sup>
						</label>
						<select
							id="animalBreed"
							{...register('breedId', { required: true })}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
							disabled={!selectedAnimalCategory}
						>
							{/* Remove the disabled attribute */}
							<option value="">--Breed--</option>
							{selectedAnimalType &&
								selectedAnimalCategory &&
								animalTypes
									?.find((item: any) => item?.id === parseInt(selectedAnimalType))
									?.animalCategories?.find(
										(item: any) => item?.id === parseInt(selectedAnimalCategory)
									)
									?.animalBreeds?.map((item: any) => (
										<option key={item?.id} value={item?.id}>
											{item?.name}
										</option>
									))}
						</select>
						{errors.breedId?.type === 'required' && (
							<FormInputAlert notification="First name is required" />
						)}
					</div>
					<div className="col-span-12 md:col-span-6">
						<label
							htmlFor="tag"
							className="block text-sm font-medium text-text-primary-light"
						>
							Animal Tag<sup className="text-red-500 text-xs">*</sup>
						</label>
						<input
							type="text"
							id="tag"
							{...register('tag', { required: true })}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light/10 focus:ring-offset-1"
						/>
						{errors.tag?.type === 'required' && (
							<FormInputAlert notification="First name is required" />
						)}
					</div>
					<div className="col-span-12 md:col-span-6">
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-text-primary-light"
						>
							Gender<sup className="text-red-500 text-xs">*</sup>
						</label>
						<select
							id="gender"
							{...register('genderId', { required: true })}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
						>
							{/* Remove the disabled attribute */}
							<option value="">--Genders--</option>
							{genders?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
						{errors.genderId?.type === 'required' && (
							<FormInputAlert notification="gender is required" />
						)}
					</div>
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="birthWeight"
							className="block text-sm font-medium text-text-primary-light"
						>
							Birth Weight
						</label>
						<div className="relative mt-1 rounded-md shadow-sm">
							<div className="absolute inset-y-0 left-0 flex items-center">
								<label htmlFor="uom" className="sr-only">
									Unit
								</label>
								<select
									id="uom"
									{...register('weightUnitId')}
									autoComplete="uom"
									className="rounded-md bg-white border-r-1 border-gray-900 h-8 bg-transparent py-0 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								>
									{units?.map((item: any) => (
										<option key={item?.id} value={item?.id}>
											{item?.initial}
										</option>
									))}
								</select>
							</div>
							<input
								type="number"
								id="birthWeight"
								{...register('birthWeight')}
								className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 h-8 focus:border-box-four-light  block pl-12 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light/10 focus:ring-offset-1"
							/>
						</div>
					</div>
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="birthDate"
							className="block text-sm font-medium text-text-primary-light"
						>
							Birth Date<sup className="text-red-500 text-xs">*</sup>
						</label>
						<input
							type="date"
							id="birthDate"
							{...register('birthDate', { required: true })}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light/10 focus:ring-offset-1"
						/>
						{errors.birthDate?.type === 'required' && (
							<FormInputAlert notification="Birth date is required" />
						)}
					</div>
					<div className="col-span-12 md:col-span-4">
						<label
							htmlFor="purchaseDate"
							className="block text-sm font-medium text-text-primary-light"
						>
							Purchase Date
						</label>
						<input
							type="date"
							id="purchaseDate"
							{...register('purchaseDate')}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light/10 focus:ring-offset-1"
						/>
					</div>
					<div className="col-span-12 md:col-span-6">
						<label
							htmlFor="dam"
							className="block text-sm font-medium text-text-primary-light"
						>
							Dam
						</label>
						<select
							id="dam"
							{...register('damId')}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
						>
							{/* Remove the disabled attribute */}
							<option value="">--Dam--</option>
							{genders?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-span-12 md:col-span-6">
						<label
							htmlFor="sire"
							className="block text-sm font-medium text-text-primary-light"
						>
							Sire
						</label>
						<select
							id="sire"
							{...register('sireId')}
							className="sm:text-sm w-full bg-box-four-light bg-opacity-70 border-1 focus:shadow-inner shadow-accent-300 focus:border-box-four-light  block p-2.5 h-8 px-3 py-1 shadow-box-four-light  rounded-md border border-box-four-light  text-sm font-medium leading-4 text-text-secondary-light  shadow-sm hover:bg-box-four-light focus:outline-none focus:ring-2 focus:ring-text-primary-light focus:ring-offset-1"
						>
							{/* Remove the disabled attribute */}
							<option value="">--Sire--</option>
							{genders?.map((item: any) => (
								<option key={item?.id} value={item?.id}>
									{item?.name}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			<div className="w-full flex items-center justify-center py-2">
				<button
					type="submit"
					className="rounded-md shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-2"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex items-center space-x-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
								>
									<animateTransform
										attributeName="transform"
										dur="0.75s"
										repeatCount="indefinite"
										type="rotate"
										values="0 12 12;360 12 12"
									/>
								</path>
							</svg>
							<span>Submitting...</span>
						</div>
					) : (
						<span>Submit</span>
					)}
				</button>
			</div>
		</form>
	);
}
