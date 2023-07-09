import supabase from "./supabase";

// Fetch All Cabin Data from API
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

// Delete Cabin Data
export const deleteCabinById = async (id) => {
	// Fetching From Supabase API
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	// Error Handling
	if (error) {
		console.error(error);
		throw new Error("Couldn't Delete Cabin");
	}

	return data;
};
