import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'PATCH' || req.method === 'PATCH') {
		try {
			const formData = req.body;
			// console.log('Form Data:', formData);
			const result = await prisma.animal.update({
				where: {
					id: formData.id,
				},
				data: formData,
			});
			res.status(200).json(result);
		} catch (err: any) {
			console.log('Error when creating Animal', err.message);
			res.status(403).json({ err: 'Error has occurred while creating Animal' });
		}
	}
}
