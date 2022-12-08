import React, { useCallback, useEffect, useState } from "react";
import Grid from "../../../components/Grid";
import ProductCard from "../../../components/ProductCard";
import { SectionBody, SectionTitle } from "../../../components/Section";
import axios from "axios";
import ProductCardViewed from "../../../components/ProductCardViewed";

const Viewed = () => {
  const [allList, setAllList] = useState([]);
  const idCus = localStorage.getItem("User");
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };
  const callAllViewed = useCallback(async () => {
    await axios
      .get(
        `http://localhost:8000/api/get-product-view-by-customer-id/${idCus}/`
      )
      .then((res) => {
        setAllList(res.data.findP);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [idCus]);
  useEffect(() => {
    callAllViewed();
  }, [callAllViewed, reloadPage]);
  return (
    <>
      <SectionTitle>Sản Phẩm Đã Xem</SectionTitle>
      <SectionBody>
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          {allList?.map((item, index) => (
            <ProductCardViewed
              product={item}
              key={index}
              parentCallback={callbackFunction}
            ></ProductCardViewed>
          ))}
        </Grid>
      </SectionBody>
    </>
  );
};

export default Viewed;
