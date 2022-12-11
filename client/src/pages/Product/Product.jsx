import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Helmet from "../../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../../components/Section";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import ProductView from "../../components/ProductView";

import axios from "axios";
import { Checkbox, Input, message } from "antd";

const Product = (props) => {
  const param = useParams();

  const [allProduct, setAllProduct] = useState([]);
  const [detailProduct, setDetailProduct] = useState({});

  const [selectColor, setSelectColor] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  const callDetailProduct = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-product/${param.category_id}`)
      .then((res) => {
        console.log(res.data.data);
        setDetailProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param.category_id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.category_id]);

  useEffect(() => {
    callAllProduct();
    callDetailProduct();
  }, [callDetailProduct, param.category_id]);
  const callAllProduct = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-product?brand_id=&category_id=")
      .then((res) => {
        setAllProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("ssd:", selectOption);
  console.log("colors: ", selectColor);
  // console.log("total: ", selectOption.concat(selectColor));
  // array
  console.log("total:", selectOption, selectColor);
  // selectOption.push(selectColor ?? []);

  return (
    <Helmet name="Chi Tiết Sản Phẩm">
      <Section>
        <SectionBody>
          <div className="container">
            <ProductView
              // idOptionValue={selected}
              arr={[selectOption, selectColor]}
              product_id={detailProduct?.id ? detailProduct?.id : ""}
              imgProduct={detailProduct?.img ? detailProduct?.img : ""}
              nameProduct={detailProduct?.name ? detailProduct?.name : ""}
              nameBrand={
                detailProduct?.id ? detailProduct?.ProductBrand.name : ""
              }
              nameCategory={
                detailProduct?.id ? detailProduct?.CategoryProduct.name : ""
              }
              quantityProduct={
                detailProduct?.currentQuantity
                  ? detailProduct?.currentQuantity
                  : ""
              }
              priceProduct={
                detailProduct?.unitprice ? detailProduct?.unitprice : ""
              }
              desProduct={
                detailProduct?.Description ? detailProduct?.Description : ""
              }
              // color
              color={detailProduct?.existingOptions?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="product-top__info__content__option__left__option-color"
                    >
                      {item.id === 1 ? item.name : null}
                    </div>

                    <div className="product-top__info__content__option__left__option-color__attribute">
                      {item?.values?.map((data, i) => (
                        <>
                          {data.option_id === 1 ? (
                            <div
                              key={data.id}
                              // className={
                              //   data.id === selected
                              //     ? "product-top__info__content__left__attribute__name active"
                              //     : "product-top__info__content__left__attribute__name "
                              // }
                              onClick={() => {
                                setSelectColor(data.id);
                              }}
                              className={
                                data.id === selectColor
                                  ? "product-top__info__content__option__left__option-color__attribute__name active"
                                  : "product-top__info__content__option__left__option-color__attribute__name"
                              }
                            >
                              {data.name}
                            </div>
                          ) : null}
                        </>
                      ))}
                    </div>
                  </>
                );
              })}
              // ssd
              ssd={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 2 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 2 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectOption(data.id);
                                    }}
                                    className={
                                      data.id === selectOption
                                        ? "product-top__info__content__option__right__option-ssd__attribute__name active"
                                        : "product-top__info__content__option__right__option-ssd__attribute__name"
                                    }
                                  >
                                    {data.name}
                                  </div>
                                ) : null}
                              </>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </>
                ) : null
              }
              iDOption={detailProduct?.existingOptions?.map((item, index) =>
                item?.values?.map((data, i) => <div>{data.id}</div>)
              )}
              // attributeName={detailProduct?.existingOptions?.map(
              //   (item, index) =>
              //     item?.values?.map((data, i) => (
              //       <div
              //         key={i}
              //         className="product-top__info__content__left__name__attribute__name"
              //       >
              //         {data.name}
              //       </div>
              //     ))
              // )}
            ></ProductView>
          </div>
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>sản phẩm khác</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {allProduct?.map((item, index) => {
              if (index < 4) {
                return <ProductCard product={item} key={index}></ProductCard>;
              }
            })}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
