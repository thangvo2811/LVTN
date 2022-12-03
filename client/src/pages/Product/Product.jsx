import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import Helmet from "../../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../../components/Section";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import ProductView from "../../components/ProductView";

import axios from "axios";

const Product = () => {
  const param = useParams();

  const [allProduct, setAllProduct] = useState([]);
  const [detailProduct, setDetailProduct] = useState([]);

  const callDetailProduct = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-product/${param.category_id}`)
      .then((res) => {
        console.log(res.data.product);
        setDetailProduct(res.data.product);
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
  }, [callDetailProduct]);
  const callAllProduct = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-product?brand_id=&category_id=")
      .then((res) => {
        setAllProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Helmet name="Chi Tiết Sản Phẩm">
      <Section>
        <SectionBody>
          <div className="container">
            {detailProduct.map((item, index) => (
              <ProductView
                key={index}
                product_id={item.id ? item.id : ""}
                imgProduct={item.img ? item.img : ""}
                nameProduct={item.name ? item.name : ""}
                quantityProduct={item.IntialQuantity ? item.IntialQuantity : ""}
                priceProduct={item.unitprice ? item.unitprice : ""}
                statusProduct={item.status === 1 ? "Còn Hàng" : "Hết Hàng"}
                brandProduct={item.brand_id ? item.ProductBrand : ""}
                cateProduct={item.category_id ? item.CategoryProduct : ""}
                cateIdProduct={item.category_id ? item.category_id : ""}
                desProduct={item.Description ? item.Description : ""}
                optionAttribute={item.ProductOption?.map((item, index) => (
                  <div className="product-top__info__content__select__right__attribute">
                    <div>{item.name}</div>
                    <div className="product-top__info__content__select__right__attribute__name">
                      {item.Option_Product.name}
                    </div>
                    {/* <div className="product-top__info__content__select__right__attribute__price">
                      {item.price}
                    </div> */}
                  </div>
                ))}
              ></ProductView>
            ))}
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
