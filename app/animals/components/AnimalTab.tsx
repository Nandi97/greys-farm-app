import SearchInput from '@/components/custom-ui/SearchInput';

export default function AnimalTab() {
	return (
		<div className="w-full flex justify-between items-center border-b py-1">
			<span>Animals</span>
			<SearchInput />
		</div>
	);
}
