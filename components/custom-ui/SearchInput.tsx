import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function SearchInput({ onSearch }: any) {
	const [searchInput, setSearchInput] = useState('');

	useEffect(() => {
		const debouncedSearch = debounce((value: any) => {
			onSearch(value);
		}, 500);

		debouncedSearch(searchInput);

		return () => {
			debouncedSearch.cancel();
		};
	}, [searchInput, onSearch]);

	const handleInputChange = (event: React.FormEvent) => {
		event.preventDefault();
		setSearchInput(event?.target?.value);
	};
	return (
		<div>
			<label className="h-8 w-full md:w-72 relative inline-flex items-center">
				<input
					type="search"
					name="search"
					id="search"
					placeholder="Search..."
					className="h-full w-full bg-box-two-light bg-opacity-70 border-1 border-text-secondary-light shadow-inner shadow-accent-300 text-xs pl-8 focus:ring-text-primary-light border text-text-primary-light rounded-lg  focus:border-text-secondary-light block p-2.5"
					value={searchInput}
					onChange={handleInputChange}
				/>
				<Icon
					icon="heroicons:magnifying-glass"
					className="absolute left-2 top-2 text-md text-zinc-500"
				/>
			</label>
		</div>
	);
}
