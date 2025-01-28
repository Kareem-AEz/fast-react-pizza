import { Link } from "react-router-dom";

function LinkButton({ children, to, className = "" }) {
  return (
    <Link
      to={to}
      className={`text-sm text-blue-500 hover:text-blue-600 hover:underline ${className} s`}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
