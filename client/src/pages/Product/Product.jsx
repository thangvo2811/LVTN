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
  const [selected, setSelected] = useState([]);
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
  const handleChange = (id) => {
    // setSelected((pre) => {
    //   return pre.map((item) => {
    //     if (item.id === id) {
    //       return { ...item, check: !item.check };
    //     } else {
    //       return { ...item };
    //     }
    //   });
    // });
    // pre => setArr(...pre,valueNew)
    setSelected(id);
  };
  console.log("ID OPTION", selected);

  return (
    <Helmet name="Chi Tiết Sản Phẩm">
      <Section>
        <SectionBody>
          <div className="container">
            <ProductView
              idOptionValue={selected}
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
              optionName={detailProduct?.existingOptions?.map((item, index) => {
                return (
                  <>
                    <div
                      key={index}
                      className="product-top__info__content__left__option"
                    >
                      <div className="product-top__info__content__left__option__name">
                        {item.name}
                      </div>
                    </div>
                    <div className="product-top__info__content__left__attribute">
                      {item?.values?.map((data, i) => (
                        <div
                          key={data.id}
                          className={
                            data.id === selected
                              ? "product-top__info__content__left__attribute__name active"
                              : "product-top__info__content__left__attribute__name "
                          }
                          onClick={() => handleChange(data.id)}
                        >
                          {data.name}
                        </div>
                      ))}
                    </div>
                  </>
                );
              })}
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
