import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		try {
			const formData = req.body;

			const result = await prisma.animalBreed.update({
				where: {
					id: formData.id,
				},
				data: {
					name: formData.name,
					description: formData.description,
					animalCategoryId: formData.animalCategoryId,
				},
			});
			res.status(200).json(result);
		} catch (err) {
			console.log('Error when updating category:', err.message);
			res.status(403).json({
				err: `Error has occurred while editing the animal category: ${req.body.author}`,
			});
		}
	}
}
