import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/cartSlice";

function Header() {
  const cartCount = useSelector(selectCartCount);
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-green-600">
        <img
          src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/13.2.4/images/header/primary-logo.svg"
          alt=""
        />
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-green-600">
          Home
        </Link>
        <Link to="/cart" className="relative hover:text-green-600">
          Cart
          <span className="ml-1 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
