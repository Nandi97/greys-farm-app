interface FormInputAlertProp {
	notification: string;
}

export default function FormInputAlert({ notification }: FormInputAlertProp) {
	return (
		<p role="alert" className="text-xs text-red-500">
			{notification}
		</p>
	);
}
