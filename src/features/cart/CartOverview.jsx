import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItemsCount, getTotalCartPrice } from "./cartSlice";

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);
  const pizzasInCart = useSelector(getCartItemsCount);

  if (!pizzasInCart) return null;
  return (
    <div className="rounded-t-2xl bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{pizzasInCart} pizzas</span>
          <span>${totalPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
