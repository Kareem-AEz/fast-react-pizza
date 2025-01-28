import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  const isSubmitting =
    fetcher.state === "submitting" || fetcher.state === "loading";

  return (
    <fetcher.Form method="PATCH">
      <Button disabled={isSubmitting}>Prioritize Order</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // Update the order with the given data
  const data = { priority: true };
  console.log("submitted");

  await updateOrder(params.orderId, data);

  return null;
}
