import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl, id } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    // Create a new item with the chosen pizza details
    const chosenPizza = {
      imageUrl,
      id: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };

    // Dispatch the action to add the chosen pizza to the cart
    dispatch(addToCart(chosenPizza));
  };

  return (
    <li
      className={`flex items-center gap-4 py-2 ${soldOut ? "opacity-65 grayscale" : ""} `}
    >
      <div className="aspect-square h-full w-full max-w-24 rounded-md bg-gray-400">
        <img
          src={imageUrl}
          alt="name"
          className="left-0 top-0 aspect-square h-full w-full rounded-md bg-cover"
          loading="lazy"
          onLoad={(e) => {
            e.target.style.opacity = 1; // Fade in the image once it's loaded
          }}
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />
      </div>
      {/* <img src={imageUrl} alt={name} className={`h-24 rounded-lg`} /> */}
      <div className="flex flex-grow flex-col">
        <p className="mb-1 font-semibold">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm font-bold uppercase text-stone-400">
          {!soldOut ? (
            <p className="self-end">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="self-end">Sold out</p>
          )}

          {!soldOut &&
            (isInCart ? (
              <DeleteItem item={pizza} />
            ) : (
              <Button
                disabled={soldOut}
                type="small"
                onClick={addToCartHandler}
              >
                ADD TO CART
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
