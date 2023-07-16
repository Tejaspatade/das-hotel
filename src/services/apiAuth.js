import supabase from "./supabase";

export const login = async ({ email, password }) => {
	// Logging in user with form credentials
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	// Error Handling
	if (error) throw new Error(error.message);

	// Returning user session & token
	return data;
};

export const getCurrentUser = async () => {
	// Get currently logged in user's session & info from localstorage
	const { data: session } = await supabase.auth.getSession();

	// No user currently logged in
	if (!session.session) return null;

	// Re-fetch user info when session exists
	const { data, error } = await supabase.auth.getUser();

	// Error Handling
	if (error) throw new Error(error.message);

	return data?.user;
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();

	// Error Handling
	if (error) throw new Error(error.message);
};
