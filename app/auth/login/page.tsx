'use client';

import Image from 'next/image';
import logo from '@/public/assets/images/greys_farm_logo.png';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { Icon } from '@iconify/react';
import { redirect } from 'next/navigation';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { data: session } = useSession();

	const submitHandler = async (e: any) => {
		e.preventDefault();

		try {
			const data = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});

			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	if (session) {
		return redirect('/');
	}
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="grid grid-cols-12 w-full">
				<div className="col-span-2"></div>
				<div className="grid grid-cols-12 divide-x-2 shadow-md rounded-md col-span-8">
					<div className="col-span-6 md:mr-1 bg-gradient-to-br from-[#5D8700] via-[#A5D721] to-[#EEFFBA] flex flex-col items-center justify-center space-y-3 rounded-l-md p-4">
						<Image
							height={1000}
							width={1000}
							src={logo}
							className="h-20 object-contain"
							alt="Greys farm Logo"
						/>
						<div className="flex items-center space-x-2 text-3xl">
							<span className="font-bold">Grey&apos;s</span>
							<span>Farm</span>
						</div>
						<div className="text-md">
							<span>Grey-Becca Farmstay</span>
						</div>
					</div>
					<div className="col-span-6 flex flex-col items-center md:ml-1 p-2">
						<form onSubmit={submitHandler}>
							<div className="mb-6">
								<label
									htmlFor="email_field"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Email
									<input
										type="email"
										id="email_field"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
										placeholder="name@email.com"
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</label>
							</div>
							<div className="mb-6">
								<label
									htmlFor="password_field"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									Password
									<input
										type="password"
										id="password_field"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
										required
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</label>
							</div>
							<button
								type="submit"
								className="rounded-md shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light p-2"
							>
								Submit
							</button>
							<div className="py-8">
								<p className="text-xs py-2">Or sign in with</p>

								<button
									type="button"
									className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
									onClick={() => signIn('google')}
								>
									<Icon className="w-4 h-4 mr-2" icon="mdi:google"></Icon>
									Sign in with Google
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="col-span-2"></div>
			</div>
		</div>
	);
}
