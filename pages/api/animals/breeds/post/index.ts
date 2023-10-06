import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const formData = req.body;

			const result = await prisma.animalBreed.create({
				data: {
					name: formData.name,
					description: formData.description,
					animalCategoryId: formData.animalCategoryId,
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Animal Breed', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Animal Breed' });
		}
	}
}
