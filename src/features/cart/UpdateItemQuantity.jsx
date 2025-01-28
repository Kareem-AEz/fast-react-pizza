import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

function UpdateItemQuantity({ item }) {
  const dispatch = useDispatch();

  const pizzaQuantity = item.quantity;

  const handlePizzaIncrease = () => {
    dispatch(increaseQuantity(item));
  };
  const handlePizzaDecrease = () => {
    dispatch(decreaseQuantity(item));
  };
  return (
    <>
      <Button type="small" onClick={handlePizzaDecrease}>
        -
      </Button>
      <span className="mx-2 min-w-5 text-center">{pizzaQuantity}</span>
      <Button type="small" onClick={handlePizzaIncrease}>
        +
      </Button>
    </>
  );
}

export default UpdateItemQuantity;
