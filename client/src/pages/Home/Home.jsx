import React from "react";

import Helmet from "../../components/Helmet";
import HeroSlider from "../../components/HeroSlider";
import Section, { SectionBody, SectionTitle } from "../../components/Section";
import PolicyCard from "../../components/PolicyCard";
import Grid from "../../components/Grid";
import ProductCard from "../../components/ProductCard";
import Blog from "../../components/Blog";

import heroSilderData from "../../assets/fake-api/hero-slider";
import policyData from "../../assets/fake-api/policy";

import msi from "../../assets/images/banner/msi.jpg";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Home = () => {
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    callAllProduct();
  }, []);
  const callAllProduct = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-product?brand_id=&category_id=")
      .then((res) => {
        console.log(res.data.products);
        setAllProduct(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Helmet name="Trang chủ">
      {/* Hero slider section */}
      <HeroSlider data={heroSilderData} control={true}></HeroSlider>
      {/* END Hero slider section */}

      {/* Newest product */}
      <Section>
        <SectionTitle>sản phẩm mới nhất</SectionTitle>
        <SectionBody>
          <div className="container">
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {allProduct?.map((item, index) => {
                return <ProductCard key={index} product={item}></ProductCard>;
              })}
            </Grid>
          </div>
        </SectionBody>
      </Section>
      {/* End Newest product */}

      {/* sub Banner */}
      <Section>
        <SectionBody>
          <img src={msi} alt="" className="sub-banner" />
        </SectionBody>
      </Section>
      {/* end sub Banner */}

      {/* hotsalse product */}
      <Section>
        <SectionTitle>Bán chạy nhất</SectionTitle>
        <SectionBody>
          <div className="container">
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {allProduct?.map((item, index) => {
                if (index < 4) {
                  return <ProductCard key={index} product={item}></ProductCard>;
                }
              })}
            </Grid>
          </div>
        </SectionBody>
      </Section>
      {/* End hotsalse product */}

      {/* Blog section */}
      <Section>
        <SectionTitle>Blog</SectionTitle>
        <SectionBody>
          <div className="container">
            <Blog></Blog>
          </div>
        </SectionBody>
      </Section>
      {/* END Blog section */}

      {/* Card policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={40}>
            {policyData.map((item, index) => {
              return (
                <PolicyCard
                  key={index}
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                ></PolicyCard>
              );
            })}
          </Grid>
        </SectionBody>
      </Section>
      {/* End Card policy section */}
    </Helmet>
  );
};

export default Home;
