import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			// console.log('Req Query', req.query);
			const categoryId = Array.isArray(req.query.categoryId)
				? parseInt(req.query.categoryId[0], 10)
				: parseInt(req.query.categoryId, 10);

			if (isNaN(categoryId) || categoryId < 0) {
				return res.status(400).json({ error: 'Invalid Animal Category ID' });
			}

			const data = await prisma.animalCategory.findUnique({
				where: { id: categoryId },
				select: {
					id: true,
					name: true,
					animalTypeId: true,
					deletedAt: true,
					animalType: {
						select: {
							id: true,
							name: true,
							icon: true,
							deletedAt: true,
						},
					},
				},
			});

			if (!data) {
				return res.status(404).json({ error: 'Animal Category not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching purchase order:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the user' });
		}
	}
}
