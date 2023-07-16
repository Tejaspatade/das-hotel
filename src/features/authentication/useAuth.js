import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
	//
	const queryClient = useQueryClient();

	// Router-DOM Hooks
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: (user) => {
			toast.success("Logged In Successfully");
			queryClient.setQueriesData(["user"], user);
			navigate("/dashboard");
		},
		onError: () => {
			toast.error("Email/Password is incorrect");
		},
	});

	return { login, isLoading };
};
