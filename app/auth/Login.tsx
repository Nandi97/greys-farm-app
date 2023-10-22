'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
	return (
		<>
			<div className="inline-flex items-center w-full px-2 space-x-4 rounded-md justify-center bg-primary-400 shadow text-box-four-light bg-text-primary-light hover:bg-text-secondary-light">
				<button onClick={() => signIn()}>Sign In</button>
			</div>
		</>
	);
}
