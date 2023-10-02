import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';
import { getUOMs } from './seeders/uoms';
import { getMenus } from './seeders/menus';
import { getAnimalTypes } from './seeders/animalTypes';
import { getAnimalCategories } from './seeders/animalCategories';
import { getAnimalBreeds } from './seeders/animalBreeds';

const prisma = new PrismaClient();

async function main() {
	const menus = getMenus();
	const roles = getRoles();
	const uoms = getUOMs();
	const animalTypes = getAnimalTypes();
	const animalCategories = getAnimalCategories();
	const animalBreeds = getAnimalBreeds();

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

	console.log('Data seeded successfully.');
}

main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
