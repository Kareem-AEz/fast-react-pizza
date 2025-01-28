import { useSelector } from "react-redux";

function Username() {
  const { username } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);

  // if no user is logged in, return null
  if (!username) return null;

  // otherwise, return the username in a small text element
  return (
    <div className="hidden text-sm font-bold capitalize sm:block">
      {username}
    </div>
  );
}

export default Username;
