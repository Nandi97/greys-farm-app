import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			// console.log('Request Body:', req.body);
			const formData = req.body;

			// console.log('Form data:', formData);

			const result = await prisma.animalCategory.create({
				data: {
					name: formData.name,
					animalTypeId: formData.animalTypeId,
				},
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Animal Category', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Animal Category' });
		}
	}
}
