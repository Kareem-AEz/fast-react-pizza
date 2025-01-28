import { memo } from "react";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { name, quantity, totalPrice, imageUrl } = item;

  return (
    <li className="flex items-center justify-center gap-3 py-3">
      <div className="relative aspect-square h-full w-full max-w-16 rounded-md bg-gray-400">
        <img
          src={imageUrl}
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
        <p>
          {quantity}&times; {name}
        </p>
        <div className="flex items-center justify-between">
          <p className="mr-auto text-sm font-extrabold">
            {formatCurrency(totalPrice)}
          </p>
          <UpdateItemQuantity item={item} />
          {/* <DeleteItem item={item} /> */}
        </div>
      </div>
    </li>
  );
}

export default memo(CartItem);
