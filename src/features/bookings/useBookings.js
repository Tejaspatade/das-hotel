import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
	// Router-DOM Hooks
	const [searchParams] = useSearchParams();

	// Filtering
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	// Sorting
	const sortByValue = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByValue.split("-");
	const sortBy = { field, direction };

	// React Query Hook to consume query
	const {
		data: bookings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy],
		queryFn: () => getBookings({ filter, sortBy }),
	});

	return { bookings, isLoading, error };
};
