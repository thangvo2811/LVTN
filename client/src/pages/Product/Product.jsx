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
  // const [selectOption, setSelectOption] = useState([]);

  const [selectColor, setSelectColor] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [selectScreen, setSelectScreen] = useState("");
  const [selectMain, setSelectMain] = useState("");
  const [selectSwitch, setSelectSwitch] = useState("");
  const [selectHDD, setSelectHDD] = useState("");
  const [selectOption7, setSelectOption7] = useState("");
  const [selectOption8, setSelectOption8] = useState("");
  const [selectOption9, setSelectOption9] = useState("");
  const [selectOption10, setSelectOption10] = useState("");

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

  useEffect(() => {
    callAllProduct();
    callDetailProduct();
  }, [callDetailProduct, param.category_id]);

  // console.log("colors: ", selectColor);
  // console.log("ssd:", selectOption);
  // console.log("screen:", selectScreen);
  // console.log("main:", selectMain);
  // console.log("switch:", selectSwitch);
  // console.log("hdd:", selectHDD);
  // console.log("total: ", selectOption.concat(selectColor));
  // array
  // console.log(
  //   "total:",
  //   selectColor,
  //   selectOption,
  //   selectScreen,
  //   selectMain,
  //   selectSwitch,
  //   selectHDD
  // );
  // selectOption.push(selectColor ?? []);

  return (
    <Helmet name="Chi Tiết Sản Phẩm">
      <Section>
        <SectionBody>
          <div className="container">
            <ProductView
              // idOptionValue={selected}
              arr={[
                selectColor,
                selectOption,
                selectScreen,
                selectMain,
                selectSwitch,
                selectHDD,
                selectOption7,
                selectOption8,
                selectOption9,
                selectOption10,
              ]}
              product_id={detailProduct?.id ? detailProduct?.id : ""}
              statusProduct={
                detailProduct?.status ? detailProduct?.status : "Null"
              }
              current={
                detailProduct?.currentQuantity
                  ? detailProduct?.currentQuantity
                  : ""
              }
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
              // attriubteProduct={detailProduct?.existingOptions?.map(
              //   (item, index) => {
              //     return (
              //       <>
              //         <div
              //           key={index}
              //           className="product-top__info__content__option__left__option-color"
              //         >
              //           {item.id ? item.name : ""}
              //         </div>
              //         <div className="product-top__info__content__option__left__option-color__attribute">
              //           {item?.values?.map((data, i) => (
              //             <>
              //               {data.option_id ? (
              //                 <div
              //                   className="product-top__info__content__option__left__option-color__attribute__name "
              //                   onClick={(e) => {
              //                     selectOption.push(data.id);
              //                     console.log("newOption", selectOption);
              //                     setSelectOption(selectOption);
              //                   }}
              //                 >
              //                   {data.name}
              //                 </div>
              //               ) : null}
              //             </>
              //           ))}
              //         </div>
              //       </>
              //     );
              //   }
              // )}

              color={detailProduct?.existingOptions?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="product-top__info__content__option__left__option-color"
                    >
                      {item.id === 1 ? item.name : ""}
                    </div>

                    <div className="product-top__info__content__option__left__option-color__attribute">
                      {item?.values?.map((data, i) => (
                        <>
                          {data.option_id === 1 ? (
                            <div
                              key={data.id}
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
              main={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 3 ? item.name : null}
                          </div>
                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 3 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectMain(data.id);
                                    }}
                                    className={
                                      data.id === selectMain
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
              screen={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 3 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 3 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectScreen(data.id);
                                    }}
                                    className={
                                      data.id === selectScreen
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
              switch={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 5 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 5 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectSwitch(data.id);
                                    }}
                                    className={
                                      data.id === selectSwitch
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
              hdd={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 6 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 6 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectHDD(data.id);
                                    }}
                                    className={
                                      data.id === selectHDD
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
              option7={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 7 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 7 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectOption7(data.id);
                                    }}
                                    className={
                                      data.id === selectOption7
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
              option8={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 8 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 8 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectOption8(data.id);
                                    }}
                                    className={
                                      data.id === selectOption8
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
              option9={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 9 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 9 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectOption9(data.id);
                                    }}
                                    className={
                                      data.id === selectOption9
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
              option10={
                detailProduct.existingOptions ? (
                  <>
                    {detailProduct?.existingOptions?.map((item, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="product-top__info__content__option__right__option-ssd"
                          >
                            {item.id === 10 ? item.name : null}
                          </div>

                          <div className="product-top__info__content__option__right__option-ssd__attribute">
                            {item?.values?.map((data, i) => (
                              <>
                                {data.option_id === 10 ? (
                                  <div
                                    key={data.id}
                                    onClick={() => {
                                      setSelectOption10(data.id);
                                    }}
                                    className={
                                      data.id === selectOption10
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
