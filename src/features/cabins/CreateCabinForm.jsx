import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import Textarea from "../../components/Textarea";
import FormRow from "../../components/FormRow";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: toEditId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(toEditId);

	// React-Hook-Form
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;

	// React Query Hook
	const queryClient = useQueryClient();
	// Create A Cabin
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			toast.success("Cabin Created Successfully!");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (err) => toast.error(err.message),
	});
	// Edit A Cabin
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			toast.success("Cabin Edited Successfully!");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	// Derived State
	const isLoading = isCreating || isEditing;

	// Handler Function
	const onSubmit = (data) => {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin({
				newCabinData: { ...data, image },
				id: toEditId,
			});
		else createCabin({ ...data, image: image });
	};

	const onError = (errors) => {
		console.log(errors);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isLoading}
					{...register("name", {
						required: "Please fill in this field.",
					})}
				/>
			</FormRow>

			<FormRow
				label="Maximum Capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isLoading}
					{...register("maxCapacity", {
						required: "Please fill in this field.",
						min: {
							value: 1,
							message: "Cabin should accomodate atleast 1 guest.",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular Price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isLoading}
					{...register("regularPrice", {
						required: "Please fill in this field.",
						min: {
							value: 1,
							message: "Cabin should have cost greater than 1.",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isLoading}
					defaultValue={0}
					{...register("discount", {
						required: "Please fill in this field.",
						validate: (value) =>
							value <= getValues().regularPrice ||
							"Discount can't be greater than cabin's regular price.",
					})}
				/>
			</FormRow>

			<FormRow label="Description" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isLoading}
					defaultValue=""
					{...register("description", {
						required: "Please fill in this field.",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin Photo">
				<FileInput
					id="image"
					accept="image/*"
					type="file"
					{...register("image", {
						required: isEditSession
							? false
							: "Please fill in this field.",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isLoading}>
					{isEditSession ? "Edit" : "Add"} cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
