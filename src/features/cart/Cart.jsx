import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCartItems } from "./cartSlice";

function Cart() {
  const cart = useSelector(getCartItems);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="flex flex-grow flex-col px-4 py-3">
      <LinkButton to="/menu" className="self-start">
        &larr; Back to menu
      </LinkButton>

      <div className="mx-auto w-full flex-grow content-center pb-3 xs:w-2/3">
        <h2 className="mb-4 mt-7 text-xl font-bold">Your cart, {username}</h2>

        <ul className="mb-6 divide-y-2 divide-stone-200 border-b-2">
          {cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
        </ul>

        <div className="flex flex-wrap justify-center gap-3">
          <Button to="/order/new">Order pizzas</Button>
          <Button type="secondary" onClick={() => dispatch(clearCart())}>
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
