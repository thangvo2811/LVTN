import React, { useRef, useState, useEffect } from "react";
import Helmet from "../../components/Helmet";

import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import PriceSlider from "../../components/PriceSlider";
import Button from "../../components/Button";

import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FindBrand = () => {
  const filterToggleRef = useRef(null);
  const navigate = useNavigate();
  const param = useParams();
  const paramBrand = useParams();
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const callAllProduct = async () => {
    await axios
      .get(`http://localhost:8000/api/find-by-brand/${paramBrand.brand_id}`)
      .then((res) => {
        setAllProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllCategory = async () => {
    await axios
      .get("http://localhost:8000/api/get-Category/")
      .then((res) => {
        setAllCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllBrand = async () => {
    await axios
      .get("http://localhost:8000/api/get-brand/")
      .then((res) => {
        setAllBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callAllProduct();
    callAllCategory();
    callAllBrand();
  }, [param.brand_id]);

  return (
    <Helmet name="Thương hiệu tìm kiếm">
      <div className="category-banner">
        <img src={asus} alt="" />
      </div>
      <div className="category-title">sản phẩm tìm kiếm</div>
      <div className="category">
        <div className="category__filters" ref={filterToggleRef}>
          <div
            className="category__filters__close"
            /* onClick={toggleFilterHandler} */
          >
            <i className="bx bx-chevrons-left"></i>
          </div>

          <div className="category__filters__item">
            <div className="category__filters__item__title">thương hiệu</div>
            <select
              className="category__filters__item__select"
              onChange={(e) =>
                setAllProduct(navigate("/findBrand/" + e.target.value))
              }
            >
              <option value="">Tất cả</option>
              {allBrand?.map((item, index) => {
                return (
                  <option
                    value={item.id}
                    key={index}
                    onClick={() => navigate("/findbrand/" + item.id)}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="category__filters__item">
            <div className="category__filters__item__title">Danh mục</div>
            <div className="category__filters__item__checkbox">
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
            </div>
          </div>
          {/* <div className="category__filters__item">
            <div className="category__filters__item__title">Bộ lọc giá</div>
            <PriceSlider
              onChange={(value) => setFilters({ ...filters, price: value })}
            ></PriceSlider>
          </div> */}
        </div>
        <div className="category__toggle">
          <Button size="sm">lọc sản phẩm</Button>
          {/* onClick={toggleFilterHandler}  */}
        </div>
        <div className="category__products">
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {allProduct?.map((item, index) => {
              return <ProductCard product={item} key={index}></ProductCard>;
            })}
          </Grid>
        </div>
      </div>
    </Helmet>
  );
};

export default FindBrand;
