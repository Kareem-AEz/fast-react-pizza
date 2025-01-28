import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateUsername } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Trim the input to remove leading/trailing whitespaces
  const trimmedUsername = username.trim();

  function handleSubmit(e) {
    e.preventDefault();
    // If the username is empty after trimming, do not dispatch the action to set the username
    if (!trimmedUsername) return;
    // Dispatch the action to set the username to the trimmed value
    dispatch(updateUsername(trimmedUsername));
    setUsername(""); // Reset the input field after submission
    navigate("/menu");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
    >
      <p className="mb-3 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <label
        htmlFor="username"
        className="mb-1 h-0 w-0 text-sm text-stone-500 opacity-0"
      >
        Full Name:
      </label>
      <input
        id="username"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-7 max-w-72"
      />

      {trimmedUsername !== "" && (
        <div>
          <Button>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
