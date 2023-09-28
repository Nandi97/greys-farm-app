import { NextPage } from 'next';

interface Props {}

const SignIn: NextPage = (props): JSX.Element => {
	return (
		<div>
			<form>
				<h1>LOGIN</h1>
				<input type="email" placeholder="@email.com" />
				<input type="password" placeholder="*********" />
				<input type="submit" value="login" />
			</form>
		</div>
	);
};

export default SignIn;
