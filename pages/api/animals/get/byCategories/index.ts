import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const animalCategoryId: any = req.query.category || '';

			const data = await prisma.animal.findMany({
				orderBy: {
					id: 'asc',
				},
				where: {
					OR: [
						{
							animalBreed: {
								animalCategoryId: parseInt(animalCategoryId),
							},
						},
					],
				},
				include: {
					animalBreed: {
						include: {
							animalCategory: {
								include: {
									animalType: true,
								},
							},
						},
					},
					gender: {
						select: {
							name: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occurred while fetching animals' });
		}
	}
}
