import LinkButton from "../../ui/LinkButton";
import emptyCartImg from "../../assets/empty-cart.webp";
import Button from "../../ui/Button";

function EmptyCart() {
  return (
    <div className="flex h-full flex-grow flex-col px-4 py-3">
      <LinkButton to="/menu" className="self-start">
        &larr; Back to menu
      </LinkButton>

      <div className="mx-auto h-full content-center items-center pb-3 xs:w-2/3">
        <img
          src={emptyCartImg}
          alt="Empty Cart"
          className="mx-auto w-auto rounded-md"
        ></img>
        <p className="mb-4 mt-7 text-center text-xl font-bold">
          Your cart is empty. Start adding some pizzas :)
        </p>
        <Button to="/menu">Add Some Pizzas!</Button>
      </div>
    </div>
  );
}

export default EmptyCart;
