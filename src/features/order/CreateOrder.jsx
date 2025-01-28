import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import { createOrder } from "../../services/apiRestaurant";
import { fetchAddress } from "../user/userSlice";
import store from "../../store";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { username, status, address } = useSelector((state) => state.user);
  const isGettingAddress = status === "loading";

  const navigate = useNavigate();
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  let cart = useSelector(getCartItems);
  cart = cart.map((item) => ({ ...item, pizzaId: item.id }));

  const totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalPrice * 0.1 : 0;
  const orderPrice = totalPrice + priorityPrice;

  async function handleGetAddress(e) {
    e.preventDefault();
    dispatch(fetchAddress());
  }

  return (
    <div className="flex flex-grow flex-col px-4 py-3">
      <LinkButton to="/menu" className="self-start">
        &larr; Back to menu
      </LinkButton>

      <div className="mx-auto w-full flex-grow content-center pb-3 xs:w-2/3">
        <h2 className="mb-7 text-lg font-extrabold">
          Ready to order? Let&apos;s go!
        </h2>

        <Form className="flex flex-col gap-3" method="POST">
          <div className="flex flex-col gap-1">
            <label htmlFor="customer" className="self-start">
              First Name
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              className="input"
              defaultValue={username}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <div className="z-10 flex flex-col gap-1">
              <label htmlFor="phone" className="self-start">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="input"
                required
              />
            </div>

            {formErrors?.phone && (
              <p className="rounded-md bg-red-100 px-2 text-red-800">
                {formErrors.phone}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="self-start">
              Address
            </label>
            <div className="flex content-center items-center gap-2">
              <input
                type="text"
                id="address"
                name="address"
                className="input"
                defaultValue={address}
                required
              />
              {address === "" && (
                <div className="flex-shrink-0">
                  <Button
                    type="small"
                    onClick={(e) => handleGetAddress(e)}
                    disabled={isGettingAddress}
                  >
                    Get Address
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-5 flex gap-4">
            <input
              type="checkbox"
              name="priority"
              id="priority"
              className="h-6 w-6 accent-yellow-400 transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-stone-100"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority">
              Want to yo give your order priority?{" "}
              {withPriority ? (
                <span className="font-semibold text-yellow-500">
                  {formatCurrency(priorityPrice)}
                </span>
              ) : (
                ""
              )}
            </label>
          </div>

          {cart.length !== 0 && (
            <div>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <Button disabled={isSubmitting || isGettingAddress}>
                {isSubmitting
                  ? "Placing order..."
                  : `Order Now - ${formatCurrency(orderPrice)}`}
              </Button>
            </div>
          )}
        </Form>
        {cart.length === 0 && (
          <Button onClick={() => navigate("/menu")}>Check the Menu</Button>
        )}
      </div>
    </div>
  );
}

export async function action({ request }) {
  // getting the data from the form submission
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // restructuring the data into a suitable format for the API
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // validating the phone number
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Invalid phone number!";

  // if there are any errors, return them as a response
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  console.log(order);

  // if no errors, create the order on the server and return the new order
  const newOrder = await createOrder(order);

  // updating in the store
  store.dispatch({ type: "cart/clearCart" });

  // redirecting the user to the order confirmation page with the new order ID
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
