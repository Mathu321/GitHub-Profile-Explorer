const BASE_URL = "https://api.github.com";

const handleResponse = async (response) => {
    if (response.ok) {
        return await response.json();
    }
    let errorMessage;

    switch (response.status) {
        case 404:
            errorMessage = "GitHub user not found. Please check the username and try again.";
            break;
        case 403:
            errorMessage = "GitHub API rate limit exceeded. Please wait a moment and try again.";
            break;
        case 422:
            errorMessage = "Invalid username format. Please enter a valid GitHub username.";
            break;
        default:
            errorMessage = `Unexpected error: ${response.status} ${response.statusText}`;
    }
    throw new Error(errorMessage);
};

export const fetchUserProfile = async (username) => {
    if (!username || !username.trim()) {
        throw new Error("Please provide a valid GitHub username.");
    }

    try {
        const response = await fetch(`${BASE_URL}/users/${username.trim()}`);
        return await handleResponse(response);

    } catch (error) {
        if (error.message.startsWith("GitHub") || error.message.startsWith("Unexpected") || error.message.startsWith("Please")) {
            throw error;
        }
        throw new Error("Network error: Unable to reach GitHub. Please check your internet connection.");
    }
};

export const fetchUserRepos = async (username, perPage = 30, sort = "updated") => {
    if (!username || !username.trim()) {
        throw new Error("Please provide a valid GitHub username.");
    }

    try {
        const params = new URLSearchParams({
            per_page: perPage,
            sort,
            direction: "desc",
        });

        const response = await fetch(
            `${BASE_URL}/users/${username.trim()}/repos?${params}`
        );

        return await handleResponse(response);

    } catch (error) {
        if (error.message.startsWith("GitHub") || error.message.startsWith("Unexpected") || error.message.startsWith("Please")) {
            throw error;
        }
        throw new Error("Network error: Unable to reach GitHub. Please check your internet connection.");
    }
};

export const fetchUserProfileAndRepos = async (username, perPage = 30) => {
    const [profile, repos] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username, perPage),
    ]);
    return { profile, repos };
};