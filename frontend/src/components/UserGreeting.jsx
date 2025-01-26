import { useUserStore } from "../context/userStore";

const UserGreeting = () => {
  const { user, clearUser } = useUserStore((state) => ({
    user: state.user,
    clearUser: state.clearUser,
  }));

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={clearUser}>Log Out</button>
        </div>
      ) : (
        <h2>Welcome, Guest! Please log in.</h2>
      )}
    </div>
  );
};

export default UserGreeting;
