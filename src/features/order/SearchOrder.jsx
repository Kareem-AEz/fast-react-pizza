import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputFieldRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    // navigate to the order page with the query parameter in the URL
    navigate(`/order/${query}`);
    setQuery(""); // Reset the input field after submission
    inputFieldRef.current.blur();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-48 transition-all duration-300 focus-within:max-w-56"
    >
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputFieldRef}
        className="w-full max-w-48 rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-950 transition-all duration-300 placeholder:text-stone-400 focus:max-w-56 focus:outline-none focus:ring-2 focus:ring-yellow-900 focus:ring-offset-4 focus:ring-offset-yellow-400"
      ></input>
    </form>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default SearchOrder;
