import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [detailProduct, setDetailProduct] = useState({});

  const callDetailProduct = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-product/${param.category_id}`)
      .then((res) => {
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
        setAllProduct(res.data.products);
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
            {detailProduct.product?.map((item, index) => (
              <ProductView
                key={index}
                imgProduct={item.img ? item.img : ""}
                nameProduct={item.name ? item.name : ""}
                priceProduct={item.unitprice ? item.unitprice : ""}
                statusProduct={item.status === 1 ? "Còn Hàng" : "Hết Hàng"}
                brandProduct={item.brand_id ? item.ProductBrand.name : ""}
                cateProduct={item.category_id ? item.CategoryProduct.name : ""}
                cateIdProduct={item.category_id ? item.category_id : ""}
                desProduct={item.Description ? item.Description : ""}
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
