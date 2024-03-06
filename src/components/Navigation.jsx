import React from "react";
import { Link } from "react-router-dom";
import { UilShoppingBag } from "@iconscout/react-unicons";
import { useSelector } from "react-redux";

function Navigation() {
  const cartItems = useSelector((state) => state.cartlist.cart);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid bg-white black">
        <Link className="navbar-brand d-block d-lg-none" to="/">
          <img width="80x" src="/assets/images/logo.png" alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link mx-lg-2"
                aria-current="page"
                to="/reminder"
              >
                REMINDER
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-2" to="/cards">
                CARDS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-lg-2" to="/gifts">
                GIFTS
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link mx-lg-2" to="/address">
                ADDRESS
              </Link>
            </li>
          </ul>
          <Link to="/" className="navbar-brand d-none d-lg-block me-auto">
            <img width="80x" src="/assets/images/logo.png" alt="Logo" />
          </Link>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link mx-lg-2"
                  aria-current="page"
                  to="/profile"
                >
                  PROFILE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/wishlist">
                  WISHLIST
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2" to="/recipients">
                  RECIPIENTS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-lg-2 d-block d-lg-none" to="/cart">
                  CART ({cartItems?.length})
                </Link>
              </li>
              <li className="nav-item">
                <li className="nav-item position-relative">
                  <Link
                    className="nav-link mx-lg-2 d-none d-lg-block"
                    to="/cart"
                  >
                    <UilShoppingBag
                      className="d-block"
                      size="20"
                      color="rgba(0, 0, 0, 0.65)"
                    />
                    <span className="position-absolute start-99 translate-middle badge rounded-pill bg-pink">
                      <small style={{ fontSize: "10px" }}>
                        {cartItems?.length}
                      </small>
                    </span>
                  </Link>
                </li>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
