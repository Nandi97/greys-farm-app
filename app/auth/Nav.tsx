import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/greys_farm_logo.png';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import Logged from './Logged';
import Login from './Login';
import NavMenu from './NavMenu';

export async function getSessionData() {
	const session = await getServerSession(authOptions);
	// console.log(session);
	return session;
}

export default async function Nav() {
	const session = await getSessionData();
	return (
		<nav className="w-full shadow-md  bg-box-four-light h-10 justify-between p-1 flex items-center px-3">
			<div className="flex items-center flex-shrink-0 divide-x divide-box-three-light justify-center">
				<Link href={`/`} className="flex items-center justify-center px-2">
					<Image
						height={64}
						width={64}
						className="object-contain w-5 h-5"
						src={logo}
						alt="OCO Logo"
					/>
					<div className="inline-flex items-center text-sm font-medium">
						<span className="text-text-primary-light">Grey&apos;s</span>
						<span className="text-text-secondary-light">Farm</span>
					</div>
				</Link>
				{session?.user && (
					<div className="pt-1">
						<NavMenu />
					</div>
				)}
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
