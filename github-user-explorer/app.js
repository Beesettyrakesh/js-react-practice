const baseUrl = "https://api.github.com";

export async function fetchUser(username) {
  try {
    const response = await fetch(`${baseUrl}/users/${username}`);

    if (response.status === 404) {
      throw new Error("User not found");
    }

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchRepos(username) {
  try {
    const response = await fetch(
      `${baseUrl}/users/${username}/repos?sort=updated&per_page=5`,
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function searchUsers(query) {
  try {
    const response = await fetch(`${baseUrl}/search/users?q=${query}`);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}
