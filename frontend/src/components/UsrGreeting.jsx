import { useUserStore } from "../context/userStore";

const UserGreeting = () => {
  const user = useUserStore((state) => state.user); // Obtener usuario del estado global

  return (
    <div>
      {user ? (
        <h2>Welcome, {user.name}!</h2>
      ) : (
        <h2>Welcome, Guest! Please log in.</h2>
      )}
    </div>
  );
};

export default UserGreeting;
