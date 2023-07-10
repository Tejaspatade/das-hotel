import supabase, { supabaseUrl } from "./supabase";

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

// Insert New Cabin Data
export const createCabin = async (cabinData) => {
	// -> Creating new cabin in Supabase table
	// 1.Creating Image Path to Supabase Bucket
	const imageName = `${Math.random()}-${cabinData.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 2.Creating Cabin
	const { data } = await supabase
		.from("cabins")
		.insert([{ ...cabinData, image: imagePath }])
		.select();

	// 3.Uploading Image to Bucket
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, cabinData.image, {
			cacheControl: "3600",
			upsert: false,
		});

	// 4.Delete Cabin if image wasn't uploaded successfully
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Couldn't Create Cabin as Image didn't upload successfully"
		);
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
