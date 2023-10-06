import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.animalType.findMany({
				orderBy: {
					id: 'asc',
				},
				include: {
					animalCategories: {
						select: {
							id: true,
							name: true,
							deletedAt: true,
						},
					},
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: 'Error has occured while fetching animal types' });
		}
	}
}
