export const fetchGithubUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${username}`,
  );

  if (!res.ok) throw new Error("User not found");

  const data = await res.json();
  console.log(data);
  return data;
};

export const searchGithubUser = async (query) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`,
  );

  if (!res.ok) throw new Error("User not found");

  const data = await res.json();
  console.log(data);
  return data.items;
};

// Check if following a user on Github
export const checkIfFollowingUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (res.status === 204) {
    return true; // Following
  } else if (res.status === 404) {
    return false; // Not following
  } else {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData.message || "Failed to check follow status");
  }
};

// Follow user on Github
export const followGithubUser = async (username) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/user/following/${username}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_API_TOKEN}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to follow user");
  }

  return true;
};
