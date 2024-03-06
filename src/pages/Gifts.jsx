import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ProductCards from "../components/Product/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { setGiftProduct } from "../redux/actions/GiftProduct";
import { Link, useNavigate } from "react-router-dom";

function GiftCatagory() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  const GiftCat = useSelector((state) => state.giftCat.gift);

  const [search, setSearch] = useState({
    search: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}all/gifts`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        dispatch(setGiftProduct(result.data));
      })
      .catch((error) => console.log("error", error));
  }, []);

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    handleSearch();
  };

  const handleSearch = () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_API_URL}searchGift/${search.search}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setGiftProduct(result.data));
      })
      .catch((error) => console.log("error", error));
  };

  const handleClickCategory = (categoryId) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("user"));

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${process.env.REACT_APP_API_URL}gifts/${categoryId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.gifts);
        dispatch(setGiftProduct(result.gifts));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Navigation />
      <div className="container p-xl-5 d-flex justify-content-center">
        <div className="col-md-8 p-xl-5 mt-5 text-center flex-column align-items-start">
          <h2>
            About <span style={{ color: "pink" }}>Card Club</span> and Our
            Mission Behind Everything We Do
          </h2>
          <p>
            CardClub is a factory direct supplier and manufacturer. We strive to
            give the best customer service.
          </p>
          <button className="btn btn-outline-dark btn-lg">Shop</button>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 p-5">
            <div
              className="d-flex rounded-3 flex-column flex-shrink-0  text-dark "
              style={{ width: "280px;" }}
            >
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  name="search"
                  value={search.search}
                  onChange={onChange}
                />
              </div>
              <span className="fs-3 text-dark fw-light">Categories</span>
              <hr className="text-dark" />

              <ul className="p-3">
                {GiftCat?.map((giftcat) => (
                  <li
                    className="mt-2 fs-5"
                    key={giftcat.id}
                    value={giftcat.id}
                    onClick={() => handleClickCategory(giftcat.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {giftcat.title}
                  </li>
                ))}
              </ul>
              <div>
                <h4 className="mt-5 text-dark fw-light fs-3">Help</h4>
                <hr className="text-dark" />
                <div className="d-flex justify-content-start">
                  <Link
                    to="/contactus"
                    className="btn bg-pink text-white me-1 p-2"
                  >
                    Contact
                  </Link>
                  <Link
                    to={"/profile"}
                    className="btn bg-pink text-white me-1 p-2"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <ProductCards type={"gifts"} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GiftCatagory;
