import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { removeFromCart } from "./cartSlice";

function DeleteItem({ item }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(removeFromCart(item))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
