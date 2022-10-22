import React, { useRef, useState, useEffect, useCallback } from "react";
import Helmet from "../../components/Helmet";

import Checkbox from "../../components/Checkbox";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";

import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  const param = useParams();

  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const [idCategory, setIdCategory] = useState(0);

  const [idBrand, setIdBrand] = useState(0);
  const [nameBrand, setNameBrand] = useState("");
  const [nameCategory, setNameCategory] = useState("");

  const callAllProduct = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-product")
      .then((res) => {
        setAllProduct(res.data.products);
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
        console.log(res.data);
        setAllBrand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callFindBrand = async () => {
    await axios
      .get(`http://localhost:8000/api/find-by-brand/${idBrand}`)
      .then((res) => {
        setAllProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callFindCategory = async () => {
    await axios
      .get(`http://localhost:8000/api/find-by-Category/${idCategory}`)
      .then((res) => {
        setAllProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callFindCategory();
  }, [idCategory]);

  useEffect(() => {
    callFindBrand();
  }, [idBrand]);

  useEffect(() => {
    callAllProduct();
    callAllCategory();
    callAllBrand();
  }, []);

  return (
    <Helmet name="Danh mục">
      <div className="category-banner">
        <img src={asus} alt="" />
      </div>
      <div className="category-title">
        {idCategory
          ? `Danh mục ${nameCategory}`
          : idBrand
          ? `Thương hiệu ${nameBrand}`
          : "Danh sách sản phẩm"}
      </div>
      {console.log(nameBrand)}

      <div className="category">
        <div className="category__filters">
          <div className="category__filters__close">
            <i className="bx bx-chevrons-left"></i>
          </div>

          <div className="category__filters__item">
            <div className="category__filters__item__title">thương hiệu</div>
            <select
              className="category__filters__item__select"
              onChange={(e) => {
                console.log("e:", e.target.name);
                setIdBrand(e.target.value);
                setNameBrand(e.target.selectedOptions.name);
              }}
            >
              <option value="">Tất cả</option>

              {allBrand?.map((item, index) => {
                return (
                  <option value={item.id} name={item.name} key={index}>
                    {console.log("item:", item.name)}
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="category__filters__item">
            <div className="category__filters__item__title">Danh mục</div>
            <div className="category__filters__item__checkbox">
              <li className="header-bottom__dropdown__left__list__item">
                Tất cả
              </li>
              {allCategory?.map((item, index) => {
                return (
                  <li
                    className="header-bottom__dropdown__left__list__item"
                    key={index}
                    onClick={() => {
                      console.log("item.name:", item.name);
                      setNameCategory(item.name);
                      setIdCategory(item.id);
                    }}
                  >
                    {item.name}
                  </li>
                );
              })}
            </div>
          </div>
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

export default Categories;
