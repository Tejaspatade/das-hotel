import supabase from "./supabase";

export const fetchCabins = async () => {
	// Fetching From Supabase API
	const { data, error } = await supabase.from("cabins").select("*");

	// Error Handling
	if (error) {
		console.error(error);
		throw new Error("Couldn't Fetch Cabin Data");
	}

	return data;
};
