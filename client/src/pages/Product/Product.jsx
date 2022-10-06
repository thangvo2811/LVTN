import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Helmet from "../../components/Helmet";
import Section, { SectionTitle, SectionBody } from "../../components/Section";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import ProductView from "../../components/ProductView";

import axios from "axios";

const Product = () => {
  const location = useLocation();
  const param = useParams();
  const [allProduct, setAllProduct] = useState([]);
  const [cateProduct, setCateProduct] = useState([]);
  // const productId = location.pathname.split("/")[2];
  // const product = productData.getProductById(productId);
  // console.log(productData.getProductById(productId));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [param.category_id]);

  useEffect(() => {
    callAllProduct();
    callAllCategoryProduct();
  }, []);
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

  const callAllCategoryProduct = async () => {
    await axios
      .get(`http://localhost:8000/api/find-by-Category/${param.category_id}`)
      .then((res) => {
        setCateProduct(res.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Helmet name="Chi Tiết Sản Phẩm">
      <Section>
        <SectionBody>
          {cateProduct?.map((item, index) => (
            <div key={index} className="container">
              <ProductView product={item}></ProductView>
            </div>
          ))}
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>sản phẩm khác</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {allProduct?.map((item, index) => {
              return <ProductCard product={item} key={index}></ProductCard>;
            })}
          </Grid>
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default Product;
