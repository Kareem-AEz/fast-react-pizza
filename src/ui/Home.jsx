import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 flex flex-col items-center justify-center px-4 text-center sm:my-16">
      {username && (
        <div className="text-2xl font-bold text-slate-700">
          Welcome,
          <span className="font-black capitalize text-yellow-600">
            {username}
          </span>
          !
        </div>
      )}
      <h1 className="mb-8 text-xl font-semibold text-slate-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Out of the oven, straight to you.
        </span>
      </h1>

      {
        // Show the "Start ordering" button only if the user is not logged in.
        !username ? <CreateUser /> : <Button to="/menu">Start ordering</Button>
      }
    </div>
  );
}

export default Home;
