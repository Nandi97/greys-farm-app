import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
	// const { data: session } = useSession();
	const session = await getServerSession(authOptions);

	if (!session) {
		return redirect('/auth/login');
	}
	return <main>DASHBOARD</main>;
}
