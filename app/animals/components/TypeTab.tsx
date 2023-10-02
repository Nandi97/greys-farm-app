import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AnimalTypes {
	id: number;
	name: string;
	icon: string;
}

const allAnimalTypes = async () => {
	const response = await axios.get('/api/animals/getTypes');
	return response.data;
};

export default function TypeTab() {
	const { data } = useQuery({
		queryFn: allAnimalTypes,
		queryKey: ['animalTypes'],
	});
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span>Animal Types</span>
			</div>
			<div className="overflow-x-auto p-2">
				<table className="text-sm text-left text-gray-500 border rounded-lg">
					<thead className="text-xs text-gray-700 uppercase bg-box-one-light">
						<tr>
							<th scope="col" className="p-3">
								#
							</th>
							<th scope="col" className="p-3">
								Icon
							</th>
							<th scope="col" className="p-3">
								Name
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((item: AnimalTypes) => (
							<tr key={item?.id} className="bg-white border-b ">
								<th
									scope="row"
									className="p-4 font-medium text-gray-900 whitespace-nowrap"
								>
									{item?.id}
								</th>
								<td className="p-4">
									<Icon icon={item?.icon} className="text-brand-light text-xl" />
								</td>
								<td className="p-4">{item?.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
