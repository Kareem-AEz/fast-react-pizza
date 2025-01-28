import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="rounded-b-2xl border-b border-stone-200 bg-yellow-400 px-4 py-3 will-change-contents sm:px-10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6">
        <Link
          to="/"
          className="flex-shrink-0 text-sm uppercase tracking-wide sm:text-base sm:tracking-widest"
        >
          Fast React Pizza Co.
        </Link>
        <Username />
        <SearchOrder />
      </div>
    </header>
  );
}

export default Header;
