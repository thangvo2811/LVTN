import React, { useRef, useEffect, useState, useCallback } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import dd1 from "../assets/images/dropdown-images/729_x_356.jpg";
import dd2 from "../assets/images/dropdown-images/Artboard-4-copy-8-2.png";
import dd3 from "../assets/images/dropdown-images/Artboard-7-8.png";
import dd4 from "../assets/images/dropdown-images/Artboard-7-copy-8.png";
import dd5 from "../assets/images/dropdown-images/Artboard-8-8-1.png";
import dd6 from "../assets/images/dropdown-images/Artboard-8-copy-2-8.png";

import axios from "axios";

import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNumberCartSuccess } from "../redux/cartRedux";
import WishList from "../pages/UserProfile/WishList";

const Header = () => {
  const newItem = useSelector((state) => state.cart.numberCart);

  const navigate = useNavigate();
  const headerContentRef = useRef(null);
  const headerShrink = useRef(null);
  const [totalItem, setTotalItem] = useState({});
  const [allCategory, setAllCategory] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  // const newUser = useSelector((state) => state.user.currentUser);
  const newCustomer = localStorage.getItem("User");
  const nameCustomer = localStorage.getItem("nameUser");
  const dispatch = useDispatch();

  const callCategories = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        setAllCategory(res.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callSearchProduct = async (searchK) => {
    await axios
      .get(`http://localhost:8000/api/findbykeyword/${searchK}`)
      .then((res) => {
        setSearchKey(res.data.listProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callTotalItems = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-cart-by-customer-id/${newCustomer}`)
      .then((res) => {
        console.log(res.data.Sum);
        setTotalItem(res.data.Sum);
        localStorage.setItem("cartItem", res.data.Sum);
        dispatch(addNumberCartSuccess(res.data.Sum));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);
  useEffect(() => {
    callCategories();
    callSearchProduct();
    callTotalItems();
  }, [callTotalItems]);

  const handleSearch = (e) => {
    let pattern = /^[a-zA-Z0-9_ ]*$/g;
    e.preventDefault();
    if (searchKey && pattern.test(searchKey) && searchKey !== "") {
      navigate(`/findproduct/${searchKey}`);
    } else {
      navigate("/");
      message.error("SẢN PHẨM KHÔNG TỒN TẠI");
    }
  };

  const openMenuHandler = () => {
    headerContentRef.current.classList.toggle("active");
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerShrink.current.classList.add("shrink");
      } else {
        headerShrink.current.classList.remove("shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <div className="header" ref={headerShrink}>
      <div className="container">
        <div className="header__toggle">
          <div className="header__toggle__logo">
            <Link to="/">
              <h1>PT</h1>
            </Link>
          </div>
          <div className="header__toggle__button" onClick={openMenuHandler}>
            <i className="bx bx-menu"></i>
          </div>
        </div>
        <div className="header-content" ref={headerContentRef}>
          <span className="header-content__close" onClick={openMenuHandler}>
            <i className="bx bx-x-circle"></i>
          </span>
          <div className="header-top">
            <div className="header-top__logo">
              <Link to="/">
                <h1>PT</h1>
              </Link>
            </div>
            <div className="header-top__search">
              <form onSubmit={handleSearch}>
                <div className="header-top__search__input">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <i className="bx bx-search-alt"></i>
                </div>
              </form>
            </div>
            <div className="header-top__cart">
              <ul className="header-top__cart__list">
                <div className="dropdown">
                  {newCustomer ? (
                    <>
                      <li className="header-top__cart__list__item">
                        <i className="bx bx-user icon"></i>
                        <span>
                          Xin Chào <span> {nameCustomer}</span>
                        </span>
                      </li>
                      <ul className="dropdown__list">
                        <Link to={"/userprofile"}>
                          <li className="dropdown__item">
                            <i class="bx bxs-user-circle drop__icon"></i>
                            <span className="dropdown__text">
                              Thông Tin Cá Nhân
                            </span>
                          </li>
                        </Link>
                        <li className="dropdown__item">
                          <i class="bx bxs-heart-circle drop__icon"></i>
                          <span className="dropdown__text">
                            Danh Sách Yêu Thích
                          </span>
                        </li>
                        <li className="dropdown__item">
                          <i class="bx bx-hide drop__icon"></i>
                          <span className="dropdown__text">
                            Sản Phẩm Đã Xem
                          </span>
                        </li>
                        <li
                          className="dropdown__item"
                          onClick={() => {
                            localStorage.setItem("User", "");
                            navigate("/");
                          }}
                        >
                          <i class="bx bx-log-out drop__icon"></i>
                          <span className="dropdown__text">Đăng Xuất</span>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <Link to={"/login"}>
                        <li className="header-top__cart__list__item">
                          <i className="bx bx-user icon"></i>
                          <span>Đăng nhập</span>
                        </li>
                      </Link>
                    </>
                  )}
                </div>
                {newCustomer ? (
                  <>
                    <Link to={"/cart"}>
                      <li className="header-top__cart__list__item header-top__cart__list__item__main">
                        <i className="bx bx-cart"></i>
                        <span>Giỏ hàng</span>
                        <div className="notification">
                          <span>{newItem || 0}</span>
                        </div>
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <li className="header-top__cart__list__item">
                        <i className="bx bx-user icon"></i>
                        <span>Giỏ hàng</span>
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="header-bottom">
            <ul className="header-bottom__list">
              <li className="header-bottom__list__item">
                <Link to={"/"}>Trang chủ</Link>
              </li>
              <li className="header-bottom__list__item header-bottom__list__item__main">
                <Link to={"/product"}>
                  Sản phẩm
                  <i className="bx bx-chevron-down"></i>
                </Link>
                <div className="header-bottom__dropdown">
                  <div className="header-bottom__dropdown__left">
                    <div className="header-bottom__dropdown__left__list__title">
                      Danh mục sản phẩm
                    </div>
                    <ul className="header-bottom__dropdown__left__list">
                      {allCategory?.map((item, index) => {
                        return (
                          <li
                            className="header-bottom__dropdown__left__list__item"
                            key={index}
                            onClick={() => navigate("/findcategory/" + item.id)}
                          >
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="header-bottom__dropdown__right">
                    <div className="header-bottom__dropdown__right__grid">
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd1} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd2} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd3} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd4} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd5} alt="" />
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <img src={dd6} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="header-bottom__list__item">
                <Link to={"/blog"}>Tin Tức</Link>
              </li>
              <li className="header-bottom__list__item">
                <Link to={"/"}>Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
