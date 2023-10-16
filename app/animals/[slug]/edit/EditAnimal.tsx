import AnimalForm from '@/components/forms/animals/AnimalForm';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/animals/get/${slug}`);
	return response.data;
};

export default function EditAnimalToggle({
	setToggle,
	url,
}: {
	setToggle: (toggle: boolean) => void;
	url?: any;
}) {
	const queryClient = useQueryClient();
	let toastId: string;
	const [initialAnimalValues, setInitialAnimalValues] = useState<any>();

	const { data: animal } = useQuery({
		queryKey: ['detailAnimal'],
		queryFn: () => fetchDetails(url),
	});
	useEffect(() => {
		if (animal) {
			const birthDateISO = animal?.bornAt;
			const purchaseDateISO = animal?.purchasedAt;

			const formattedBirthDate = format(new Date(birthDateISO), 'yyyy-MM-dd');
			const formattedPurchaseDate = format(new Date(purchaseDateISO), 'yyyy-MM-dd');

			const initialAnimalData = {
				tag: animal?.tag,
				image: animal?.image,
				genderId: animal?.genderId,
				breedId: animal?.breedId,
				birthWeight: animal?.birthWeight,
				sireId: animal?.sireId,
				damId: animal?.damId,
				birthDate: formattedBirthDate,
				purchaseDate: formattedPurchaseDate,
				weightUnitId: animal?.weightUnitId,
			};

			setInitialAnimalValues(initialAnimalData);
		}
	}, [animal]);
	console.log('Initial Animal Values', initialAnimalValues);

	const { mutate, isLoading } = useMutation(
		async (data: any) => {
			const newData = {
				id: animal?.id,
				tag: data?.tag,
				image: data?.image,
				genderId: parseInt(data?.genderId),
				breedId: parseInt(data?.breedId),
				birthWeight: parseFloat(data?.birthWeight),
				sireId: parseInt(data?.sireId),
				damId: parseInt(data?.damId),
				bornAt: parseISO(data?.birthDate),
				purchasedAt: parseISO(data?.purchaseDate),
				weightUnitId: parseInt(data?.weightUnitId), // await new Promise((resolve) => setTimeout(resolve, 5000));
			};
			console.log('Data:', newData);
			await axios.patch('/api/animals/patch', newData);
		},
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data.message, {
						id: toastId,
					});
				}
			},
			onSuccess: (data) => {
				toast.success('Animal has been Edited', { id: toastId });
				queryClient.invalidateQueries(['animals']);
				setToggle(false);
			},
		}
	);

	const handleCreateAnimal = (data: any) => {
		mutate(data);
	};
	return (
		<div className="fixed top-0 left-0 z-20 w-full h-full bg-black/50">
			<div className="absolute flex flex-col items-center gap-6 md:p-12 p-2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg top-1/2 left-1/2">
				<div className="flex items-center justify-between">
					<h1 className="text-xs font-bold md:text-base">Edit Animal</h1>
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

				<AnimalForm
					onSubmit={handleCreateAnimal}
					isLoading={isLoading}
					initialValues={initialAnimalValues}
					animalValues={animal}
				/>
			</div>
		</div>
	);
}
