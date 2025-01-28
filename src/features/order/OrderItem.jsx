import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients, imgSrc }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex items-center justify-center gap-3">
      <div className="relative aspect-square h-full w-full max-w-16 rounded-md bg-gray-400">
        <img
          src={imgSrc}
          alt="name"
          className="absolute left-0 top-0 aspect-square h-full w-full max-w-16 rounded-md bg-cover"
          loading="lazy"
          onLoad={(e) => {
            e.target.style.opacity = 1; // Fade in the image once it's loaded
          }}
          style={{ opacity: 0, transition: "opacity 0.3s" }}
        />
      </div>
      <div className="flex-grow -space-y-2">
        <div className="flex justify-between space-y-2">
          <p>
            <span>{quantity}&times;</span> {name}
          </p>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        {isLoadingIngredients ? (
          <p className="font-semibold capitalize italic text-stone-400">
            Loading...
          </p>
        ) : (
          <p className="font-semibold capitalize italic text-stone-400">
            {ingredients.join(", ")}
          </p>
        )}
      </div>
    </li>
  );
}

export default OrderItem;
