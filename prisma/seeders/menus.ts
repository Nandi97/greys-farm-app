export function getMenus() {
	return [
		{
			id: 1,
			name: 'Dashboard',
			url: '/',
			icon: 'heroicons:home',
			listOrder: 1,
		},
		{
			id: 2,
			name: 'User Management',
			url: '/users',
			icon: 'heroicons:user-group',
			listOrder: 2,
		},
		{
			id: 3,
			name: 'Animal Management',
			url: '/animals',
			icon: 'healthicons:animal-cow-outline',
			listOrder: 3,
		},

		{
			id: 4,
			name: 'Product Management',
			url: '/products',
			icon: 'streamline:food-cheese-1-cook-cheese-animal-products-cooking-nutrition-dairy-food',
			listOrder: 4,
		},
		{
			id: 5,
			name: 'Animal Treatment',
			url: '/treatments',
			icon: 'akar-icons:health',
			listOrder: 5,
		},
	];
}
