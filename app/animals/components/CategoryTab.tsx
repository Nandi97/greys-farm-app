import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface AnimalCategories {
	id: number;
	name: string;
	animalType: {
		name: string;
	};
}

const allAnimalCategories = async () => {
	const response = await axios.get('/api/animals/getCategories');
	return response.data;
};

export default function CategoryTab() {
	const { data } = useQuery({
		queryFn: allAnimalCategories,
		queryKey: ['animalCategories'],
	});
	return (
		<>
			<div className="w-full flex justify-between items-center border-b py-1">
				<span>Animal Categories</span>
			</div>
			<div className="overflow-x-auto p-2">
				<table className="text-sm text-left text-gray-500 border rounded-lg">
					<thead className="text-xs text-gray-700 uppercase bg-box-one-light">
						<tr>
							<th scope="col" className="p-3">
								#
							</th>
							<th scope="col" className="p-3">
								Name
							</th>
							<th scope="col" className="p-3">
								Animal Type
							</th>
						</tr>
					</thead>
					<tbody>
						{data?.map((item: AnimalCategories) => (
							<tr key={item?.id} className="bg-white border-b ">
								<th
									scope="row"
									className="p-4 font-medium text-gray-900 whitespace-nowrap"
								>
									{item?.id}
								</th>
								<td className="p-4">{item?.name}</td>
								<td className="p-4">{item?.animalType?.name}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
