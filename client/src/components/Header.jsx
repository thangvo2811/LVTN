import React, { useRef, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import dd1 from "../assets/images/dropdown-images/729_x_356.jpg";
import dd2 from "../assets/images/dropdown-images/Artboard-4-copy-8-2.png";
import dd3 from "../assets/images/dropdown-images/Artboard-7-8.png";
import dd4 from "../assets/images/dropdown-images/Artboard-7-copy-8.png";
import dd5 from "../assets/images/dropdown-images/Artboard-8-8-1.png";
import dd6 from "../assets/images/dropdown-images/Artboard-8-copy-2-8.png";

import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const headerContentRef = useRef(null);
  const headerShrink = useRef(null);
  const [totalItem, setTotalItem] = useState(0);
  const [allCategory, setAllCategory] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    callCategories();
    callSearchProduct();
  }, []);

  const callCategories = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        setAllCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callSearchProduct = async (searchK) => {
    const type = searchK;
    await axios
      .get(`http://localhost:8000/api/findbykeyword/${type}`)
      .then((res) => {
        setSearchKey(res.data.listProduct);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    // const patern = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    e.preventDefault();
    navigate("/findproduct/" + searchKey);
  };
  const cartItem = useSelector((state) => state.cartItem.value);
  useEffect(() => {
    setTotalItem(cartItem.reduce((total, item) => (total += item.quantity), 0));
  }, [cartItem]);

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
                <Link to={"/"}>
                  <li className="header-top__cart__list__item">
                    <i className="bx bx-bell"></i>
                    <span>Thông báo</span>
                  </li>
                </Link>

                <div className="dropdown">
                  <Link to={"/login"}>
                    <li className="header-top__cart__list__item">
                      <i className="bx bx-user icon"></i>
                      <span>Đăng nhập</span>
                    </li>
                  </Link>
                  <ul className="dropdown__list">
                    <Link to={"/userprofile"}>
                      <li className="dropdown__item">
                        <i class="bx bxs-user-circle drop__icon"></i>
                        <span className="dropdown__text">Your Profile</span>
                      </li>
                    </Link>
                    <li className="dropdown__item">
                      <i class="bx bxs-heart-circle drop__icon"></i>
                      <span className="dropdown__text">Wish List</span>
                    </li>
                    <li className="dropdown__item">
                      <i class="bx bxs-lock drop__icon"></i>
                      <span className="dropdown__text">Change Password</span>
                    </li>
                    <li className="dropdown__item">
                      <i class="bx bx-log-out drop__icon"></i>
                      <span className="dropdown__text">Sign out</span>
                    </li>
                  </ul>
                </div>

                <Link to={"/cart"}>
                  <li className="header-top__cart__list__item header-top__cart__list__item__main">
                    <i className="bx bx-cart"></i>
                    <span>Giỏ hàng</span>
                    <div className="notification">
                      <span>{totalItem}</span>
                    </div>
                  </li>
                </Link>
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
                        <Link to={"/"}>
                          <img src={dd1} alt="" />
                        </Link>
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <Link to={"/"}>
                          <img src={dd2} alt="" />
                        </Link>
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <Link to={"/"}>
                          <img src={dd3} alt="" />
                        </Link>
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <Link to={"/"}>
                          <img src={dd4} alt="" />
                        </Link>
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <Link to={"/"}>
                          <img src={dd5} alt="" />
                        </Link>
                      </div>
                      <div className="header-bottom__dropdown__right__grid__item">
                        <Link to={"/"}>
                          <img src={dd6} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="header-bottom__list__item">
                <Link to={"/"}>Tin Tức</Link>
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
