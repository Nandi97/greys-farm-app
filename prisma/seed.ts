import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';
import { getUOMs } from './seeders/uoms';
import { getMenus } from './seeders/menus';
import { getAnimalTypes } from './seeders/animalTypes';
import { getAnimalCategories } from './seeders/animalCategories';
import { getAnimalBreeds } from './seeders/animalBreeds';
import { getBreedingMethods } from './seeders/breedingMethod';
import { getGenders } from './seeders/genders';

const prisma = new PrismaClient();

async function main() {
	const menus = getMenus();
	const roles = getRoles();
	const genders = getGenders();
	const uoms = getUOMs();
	const animalTypes = getAnimalTypes();
	const animalCategories = getAnimalCategories();
	const animalBreeds = getAnimalBreeds();
	const breedingMethods = getBreedingMethods();

	// Menus
	for (const menu of menus) {
		await prisma.menu.upsert({
			where: { id: menu.id }, // Assuming 'name' is a unique identifier for roles
			update: { name: menu.name, url: menu.url, icon: menu.icon, listOrder: menu.listOrder },
			create: {
				name: menu.name,
				url: menu.url,
				icon: menu.icon,
				listOrder: menu.listOrder,
			},
		});
	}

	// Roles
	for (const role of roles) {
		await prisma.role.upsert({
			where: { id: role.id }, // Assuming 'name' is a unique identifier for roles
			update: { name: role.name, description: role.description },
			create: {
				name: role.name,
				description: role.description,
			},
		});
	}

	// Genders
	for (const gender of genders) {
		await prisma.gender.upsert({
			where: { id: gender.id },
			update: { name: gender.name },
			create: {
				name: gender.name,
			},
		});
	}

	// Units of Measurement
	for (const uom of uoms) {
		await prisma.unitOfMeasurement.upsert({
			where: { id: uom.id },
			update: { name: uom.name, initial: uom.initial },
			create: { name: uom.name, initial: uom.initial },
		});
	}

	// Animal Types
	for (const animalType of animalTypes) {
		await prisma.animalType.upsert({
			where: { id: animalType.id },
			update: { name: animalType.name, icon: animalType.icon },
			create: { name: animalType.name, icon: animalType.icon },
		});
	}

	// Animal Categories
	for (const animalCategory of animalCategories) {
		await prisma.animalCategory.upsert({
			where: { id: animalCategory.id },
			update: { name: animalCategory.name, animalTypeId: animalCategory.animalTypeId },
			create: { name: animalCategory.name, animalTypeId: animalCategory.animalTypeId },
		});
	}

	// Animal Breeds
	for (const animalBreed of animalBreeds) {
		await prisma.animalBreed.upsert({
			where: { id: animalBreed.id },
			update: {
				name: animalBreed.name,
				description: animalBreed.description,
				animalCategoryId: animalBreed.animalCategoryId,
			},
			create: {
				name: animalBreed.name,
				description: animalBreed.description,
				animalCategoryId: animalBreed.animalCategoryId,
			},
		});
	}

	// Breeding methods
	for (const breedingMethod of breedingMethods) {
		await prisma.breedingMethod.upsert({
			where: { id: breedingMethod.id },
			update: {
				name: breedingMethod.name,
				description: breedingMethod.description,
			},
			create: {
				name: breedingMethod.name,
				description: breedingMethod.description,
			},
		});
	}

	console.log('Data seeded successfully.');
}

main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
