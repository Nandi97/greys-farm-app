import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const breedId = Array.isArray(req.query.slug)
				? parseInt(req.query.slug[0], 10)
				: parseInt(req.query.slug, 10);
			if (isNaN(breedId) || breedId < 0) {
				return res.status(400).json({ error: 'Invalid Animal Breed' });
			}

			const data = await prisma.animalBreed.findUnique({
				where: { id: breedId },
				select: {
					id: true,
					name: true,
					description: true,
					animalCategoryId: true,
					deletedAt: true,
					animalCategory: {
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
								},
							},
						},
					},
				},
			});

			if (!data) {
				return res.status(404).json({ error: 'Animal Breed not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching purchase order:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the user' });
		}
	}
}
