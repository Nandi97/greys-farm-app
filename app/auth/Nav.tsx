import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/greys_farm_logo.png';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Logged from './Logged';
import Login from './Login';

export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function Nav() {
	const session = await getSessionData();
	return (
		<nav className="w-full shadow-md shadow-slate-400 bg-primary-400/30 h-10 justify-between p-1 flex items-center px-3">
			<div className="flex items-center flex-shrink-0 divide-x divide-secondary-300">
				<Link href={`/`} className="flex items-center px-2">
					<Image
						height={64}
						width={64}
						className="object-contain w-5 h-5"
						src={logo}
						alt="OCO Logo"
					/>
					<div className="inline-flex items-center text-sm font-medium">
						<span className="text-primary-600">Grey&apos;s</span>
						<span className="text-secondary-600">Farm</span>
					</div>
				</Link>
			</div>
			<div className="flex space-x-2 items-center justify-center h-full">
				{!session?.user && <Login />}
				{session?.user && (
					<>
						{/* <Menu /> */}
						<Logged
							image={session?.user?.image || ''}
							name={session?.user?.name}
							designation=""
						/>
					</>
				)}
			</div>
		</nav>
	);
}
