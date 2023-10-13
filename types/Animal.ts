export type Animal = {
	id: number;
	tag: string;
	image: string;
	status: boolean;
	genderId: number;
	breedId: number;
	isPregnant: boolean;
	pregnancyDueDate: string | null;
	lastCalvingDate: string | null;
	calvingInterval: string | null;
	healthRecord: string | null;
	birthWeight: number;
	growthRate: string | null;
	weightUnitId: number;
	sireId: number;
	damId: number;
	locationId: string | null;
	bornAt: string;
	purchasedAt: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	animalBreed: {
		id: number;
		name: string;
		description: string;
		animalCategoryId: number;
		animalCategory: {
			id: number;
			name: string;
			animalTypeId: number;
			animalType: {
				id: number;
				name: string;
				icon: string;
			};
		};
	};
	gender: { name: string };
};
export type AnimalArray = {
	id: number;
	tag: string;
	image: string;
	status: boolean;
	genderId: number;
	breedId: number;
	isPregnant: boolean;
	pregnancyDueDate: string | null;
	lastCalvingDate: string | null;
	calvingInterval: string | null;
	healthRecord: string | null;
	birthWeight: number;
	growthRate: string | null;
	weightUnitId: number;
	sireId: number;
	damId: number;
	locationId: string | null;
	bornAt: string;
	purchasedAt: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	animalBreed: {
		id: number;
		name: string;
		description: string;
		animalCategoryId: number;
		animalCategory: {
			id: number;
			name: string;
			animalTypeId: number;
			animalType: {
				id: number;
				name: string;
				icon: string;
			};
		};
	};
	gender: { name: string };
}[];
