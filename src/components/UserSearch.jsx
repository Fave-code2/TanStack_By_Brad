import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGithubUser } from "../api/github";
import UserCard from "./UserCard";

const UserSearch = () => {
  const [username, setUserame] = useState("");
  const [submittedUsername, SetSubmittedUserame] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", submittedUsername],
    queryFn: () => fetchGithubUser(submittedUsername),

    // This !! turns it to a boolean while enabled makes it run if it true
    enabled: !!submittedUsername,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    SetSubmittedUserame(username.trim());
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
    </>
  );
};

export default UserSearch;
