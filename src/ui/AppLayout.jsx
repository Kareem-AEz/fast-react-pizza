import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";

function AppLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  // console.log(state);

  //   min-h-[30rem]
  return (
    <div className="mx-auto grid h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="scrollbar mx-auto w-dvw max-w-3xl content-center overflow-y-auto p-2">
        {isLoading ? <Loader /> : <Outlet />}
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
