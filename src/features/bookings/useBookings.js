import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useBookings = () => {
	// React Query Hook to consume query
	const {
		data: bookings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["bookings"],
		queryFn: getBookings,
	});

	return { bookings, isLoading, error };
};
