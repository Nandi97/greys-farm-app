import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'GET') {
		try {
			const animalId = Array.isArray(req.query.slug)
				? parseInt(req.query.slug[0], 10)
				: parseInt(req.query.slug, 10);
			if (isNaN(animalId) || animalId < 0) {
				return res.status(400).json({ error: 'Invalid Animal' });
			}

			const data = await prisma.animal.findUnique({
				where: { id: animalId },
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

			if (!data) {
				return res.status(404).json({ error: 'Animal not found' });
			}

			return res.status(200).json(data);
		} catch (err) {
			console.error('Error fetching animal:', err); // Log the error for debugging
			res.status(500).json({ error: 'An error occurred while fetching the animal' });
		}
	}
}
