import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  type = "primary",
  onClick = () => {},
}) {
  const base =
    "inline-block rounded-full font-semibold uppercase text-stone-800 transition-all duration-20 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-500 flex items-center justify-center";

  const styles = {
    primary:
      base +
      "  px-4 py-3 sm:px-4 sm:py-3 sm:text-base bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500",

    small:
      base +
      " px-2.5 py-1.5 sm:px-3 sm:py-2 sm:text-sm text-xs bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500",
    secondary:
      base +
      " px-4 py-3 sm:px-4 sm:py-3 sm:text-base text-stone-500 border-stone-500 border-2 hover:bg-transparent focus:bg-transparent",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
