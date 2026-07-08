import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";
import RecentSearches from "./RecentSearches";

const UserSearch = () => {
  const [username, setUserame] = useState("");
  const [submittedUsername, setSubmittedUserame] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),

    // This !! turns it to a boolean while enabled makes it run if it true
    enabled: !!submittedUsername,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimed = username.trim();
    if (!trimed) return;
    setSubmittedUserame(username.trim());

    setRecentUsers((prev) => {
      const updated = [trimed, ...prev.filter((u) => u !== trimed)];
      return updated.slice(0, 5);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter Github Username..."
          value={username}
          onChange={(e) => setUserame(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {isLoading && <p className="status">Loading...</p>}
      {isError && <p className="status error">{error.message}</p>}

      {data && <UserCard user={data} />}

      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(username) => {
            setSubmittedUserame(username);
            setUserame(username);
          }}
        />
      )}
    </>
  );
};

export default UserSearch;
