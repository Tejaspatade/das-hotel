import { useForm } from "react-hook-form";

import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
	// React Hook Forms
	const { formState, register, getValues, handleSubmit } = useForm();
	const { errors } = formState;

	// Handler Functions
	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					{...register("fullName", {
						required: "Please Fill this field",
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					{...register("email", {
						required: "Please Fill this field",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid Email Format",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					{...register("password", {
						required: "Please Fill this field",
						minLength: {
							value: 8,
							message: "Password should be minimum 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					{...register("passwordConfirm", {
						required: "Please Fill this field",
						validate: (value) =>
							value === getValues().password ||
							"Password need to be same",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
