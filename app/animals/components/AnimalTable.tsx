interface AnimalTableProps {
	data: any;
}

export default function AnimalTable({ data }: AnimalTableProps) {
	return (
		<>
			<table className="table-auto w-full rounded-md">
				<thead className="sticky z-10 divide-y divide-box-four-light/100 top-12 bg-box-four-light text-text-secondary-light">
					<tr>
						<th
							scope="col"
							className="sticky top-0 py-3.5 pl-4 pr-3 text-center text-sm font-semibold"
						>
							#
						</th>
						<th
							scope="col"
							className="sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-6"
						>
							Type
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Category
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Tag
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-center text-sm font-semibold "
						>
							Breed
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Gender
						</th>
						<th
							scope="col"
							className="sticky top-0 px-3 py-3.5 text-left text-sm font-semibold "
						>
							Is Pregnant
						</th>
						<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data?.map(({ item, i }: any) => (
						<tr key={item?.id}>
							<td className="px-3 py-2 text-sm text-center whitespace-nowrap text-text-secondary-light">
								{i + 1}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
