// Test ID: IIDSAT , CQE92U
import OrderItem from "./OrderItem";
import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import UpdateOrder from "./UpdateOrder";
import { useEffect } from "react";

function Order() {
  const order = useLoaderData();
  const { id, status, priority, orderPrice, estimatedDelivery, cart } = order;
  const totalPrice = order.cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const priorityPriceActual = priority ? +(totalPrice * 0.1).toFixed(2) : 0;
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <h2 className="text-3xl font-bold">Order #{id}</h2>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <p className="text-xl font-extrabold">Status</p>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-semibold">
          {priority && (
            <span className="rounded-full bg-red-800 px-3 py-1 uppercase tracking-widest text-gray-50">
              Priority
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 uppercase tracking-widest text-gray-50 ${status === "delivered" ? "bg-green-800" : "bg-amber-600"}`}
          >
            {status} order
          </span>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-md bg-stone-200 px-6 py-4 text-center">
        <p className="text-xl font-extrabold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm font-semibold -tracking-wide">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="mb-6 flex w-4/5 flex-col items-stretch divide-y-2 divide-stone-200 border-b-2 py-4">
        {cart.map((item, i) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((pizza) => pizza.id === item.pizzaId)
                .ingredients || []
            }
            imgSrc={
              fetcher?.data?.find((pizza) => pizza.id === item.pizzaId)
                ?.imageUrl || ""
            }
          />
        ))}
      </ul>

      <div className="w-full space-y-1 rounded-md bg-stone-200 px-6 py-4">
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p>Price priority: {formatCurrency(priorityPriceActual)}</p>
        )}
        <p className="text-xl font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPriceActual)}
        </p>
      </div>
      {!priority && (
        <span className="self-end">
          <UpdateOrder />
        </span>
      )}
    </div>
  );
}

export default Order;
