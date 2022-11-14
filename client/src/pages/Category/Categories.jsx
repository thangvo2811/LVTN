import React, { useRef, useState, useEffect, useCallback } from "react";
import Helmet from "../../components/Helmet";
import { useSelector, useDispatch } from "react-redux";

import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import asus from "../../assets/images/banner/asus.jpg";

import axios from "axios";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);

  const [brand, setBrand] = useState({
    id: "",
    name: "",
  });
  const [category, setCategory] = useState({
    idCate: "",
    nameCate: "",
  });

  useEffect(() => {
    callAllCategory();
    callAllBrand();
  }, []);

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
    const callAllProduct = async () => {
      setIsLoading(true);
      await axios
        .get(
          `http://localhost:8000/api/get-all-product?brand_id=${brand.id}&category_id=${category.idCate}`
        )
        .then((res) => {
          setAllProduct(res.data.products);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    callAllProduct();
  }, [brand, category]);

  return (
    <>
      {isLoading === true ? (
        <p>Loading</p>
      ) : (
        <Helmet name="Danh mục">
          <div className="category-banner">
            <img src={asus} alt="" />
          </div>
          <div className="category-title">
            {category.idCate
              ? `Danh mục ${category.nameCate}`
              : brand.id
              ? `Thương hiệu sản phẩm`
              : "Danh sách sản phẩm"}
          </div>

          <div className="category">
            <div className="category__filters">
              <div className="category__filters__close">
                <i className="bx bx-chevrons-left"></i>
              </div>

              <div className="category__filters__item">
                <div className="category__filters__item__title">
                  Thương hiệu
                </div>
                <select
                  className="category__filters__item__select"
                  onChange={(e) => {
                    setCategory((category) => ({
                      ...category,
                      ...{
                        idCate: "",
                      },
                    }));
                    setBrand((brand) => ({
                      ...brand,
                      ...{
                        id: e.target.value,
                        name: e.target.value,
                      },
                    }));
                  }}
                >
                  <option value="">Tất cả</option>
                  {allBrand?.map((item, index) => {
                    return (
                      <option value={item.id} name={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="category__filters__item">
                <div className="category__filters__item__title">Danh mục</div>
                <div className="category__filters__item__checkbox">
                  <li
                    className="header-bottom__dropdown__left__list__item"
                    onClick={() => {
                      setBrand((brand) => ({
                        ...brand,
                        ...{ id: "" },
                      }));
                      setCategory((category) => ({
                        ...category,
                        ...{
                          idCate: "",
                        },
                      }));
                    }}
                  >
                    Tất cả
                  </li>
                  {allCategory?.map((item, index) => {
                    return (
                      <li
                        className="header-bottom__dropdown__left__list__item"
                        key={index}
                        onClick={() => {
                          setCategory((category) => ({
                            idCate: item.id,
                            nameCate: item.name,
                          }));
                          setBrand({
                            id: "",
                            name: brand.name,
                          });
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
      )}
    </>
  );
};

export default Categories;
