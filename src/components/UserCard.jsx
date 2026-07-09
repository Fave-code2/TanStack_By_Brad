import {
  checkIfFollowingUser,
  followGithubUser,
  unFollowGithubUser,
} from "../api/github";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaGithubAlt, FaUserMinus, FaUserPlus } from "react-icons/fa";

const UserCard = ({ user }) => {
  // Query to check if user is following.
  const { data: isFollowing, refetch } = useQuery({
    queryKey: ["follow-status", user.login],
    queryFn: () => checkIfFollowingUser(user.login),
    enabled: !!user.login,
  });

  // Mutation to follow the user
  const followUser = useMutation({
    mutationFn: () => followGithubUser(user.login),
    onSuccess: () => {
      console.log(`You are now following ${user.login}`);
      refetch();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  // Mutation to unfollow the user
  const unFollowUser = useMutation({
    mutationFn: () => unFollowGithubUser(user.login),
    onSuccess: () => {
      console.log(`You have now unfollowed ${user.login}`);
      refetch();
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleFollow = () => {
    if (isFollowing) {
      unFollowUser.mutate();
    } else {
      followUser.mutate();
    }
  };

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.name} className="avatar" />
      <h2>{user.name || user.login}</h2>
      <p className="bio">{user.bio}</p>

      <div className="user-card-buttons">
        <button
          disabled={followUser.isPending || unFollowUser.isPending}
          onClick={handleFollow}
          className={`follow-btn ${isFollowing ? "following" : ""}`}
        >
          {isFollowing ? (
            <>
              <FaUserMinus className="follow-icon" /> Following
            </>
          ) : (
            <>
              <FaUserPlus className="follow-icon" /> Follow User
            </>
          )}
        </button>

        <a
          href={user.html_url}
          className="profile-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubAlt /> View Github Profile
        </a>
      </div>
    </div>
  );
};

export default UserCard;
