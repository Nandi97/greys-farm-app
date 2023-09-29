import { PrismaClient } from '@prisma/client';
import { getRoles } from './seeders/roles';

const prisma = new PrismaClient();

async function main() {
	const roles = getRoles();

	// Menus
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
	console.log('Data seeded successfully.');
}

main()
	.catch((error) => {
		console.error('Error seeding data:', error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
